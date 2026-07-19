import { useEffect, useRef, useState } from 'react'
import { withBasePath } from '../lib/publicPath.js'

const HERO_IMAGE = withBasePath('/museum-assets/fishing-museum-hero-parallax.webp')

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uImage;
  uniform vec2 uPointer;
  uniform vec2 uFocus;
  uniform float uTime;
  uniform float uMotion;
  uniform float uZoom;
  uniform float uBlur;
  uniform float uRoom;
  varying vec2 vUv;

  vec2 coverUv(vec2 uv, vec2 screenSize, vec2 imageSize) {
    float screenRatio = screenSize.x / screenSize.y;
    float imageRatio = imageSize.x / imageSize.y;
    vec2 scale = screenRatio < imageRatio
      ? vec2(screenRatio / imageRatio, 1.0)
      : vec2(1.0, imageRatio / screenRatio);
    return (uv - 0.5) * scale + 0.5;
  }

  vec4 sampleScene(vec2 uv, vec2 blurStep) {
    vec4 color = texture2D(uTexture, uv) * 0.4;
    color += texture2D(uTexture, clamp(uv + vec2(blurStep.x, 0.0), 0.002, 0.998)) * 0.15;
    color += texture2D(uTexture, clamp(uv - vec2(blurStep.x, 0.0), 0.002, 0.998)) * 0.15;
    color += texture2D(uTexture, clamp(uv + vec2(0.0, blurStep.y), 0.002, 0.998)) * 0.15;
    color += texture2D(uTexture, clamp(uv - vec2(0.0, blurStep.y), 0.002, 0.998)) * 0.15;
    return color;
  }

  void main() {
    vec2 cameraUv = (vUv - uFocus) / uZoom + uFocus;
    vec2 uv = coverUv(cameraUv, uResolution, uImage);
    vec2 pointerUv = uPointer * 0.5 + 0.5;
    pointerUv.y = 1.0 - pointerUv.y;

    float leftWater = (1.0 - smoothstep(0.28, 0.63, uv.x)) * smoothstep(0.08, 0.48, uv.y);
    float lowerWater = smoothstep(0.34, 0.72, uv.y) * (1.0 - smoothstep(0.86, 1.0, uv.x));
    float waterMask = clamp(leftWater + lowerWater * 0.48, 0.0, 1.0);
    float distanceToPointer = distance(uv, pointerUv);
    float ring = sin(distanceToPointer * 76.0 - uTime * 2.7) * exp(-distanceToPointer * 11.0);
    float current = sin((uv.x * 9.0 + uv.y * 5.0) - uTime * 0.42) * 0.00085;
    vec2 displacement = vec2(ring * 0.0018, ring * 0.0011 + current) * waterMask * uMotion;
    vec2 parallax = uPointer * vec2(0.012, -0.008) * uMotion * uRoom;
    vec2 finalUv = clamp(uv + displacement + parallax, 0.002, 0.998);
    vec2 blurStep = vec2(1.0) / uResolution * (2.0 + uBlur * 8.0) * uBlur;

    gl_FragColor = sampleScene(finalUv, blurStep);
  }
`

export default function MuseumHeroScene({
  pointerRef,
  sceneStateRef,
  reducedMotion = false,
  departing = false,
  focusId = null,
}) {
  const [status, setStatus] = useState('fallback')
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || typeof window.WebGLRenderingContext === 'undefined') return undefined

    let disposed = false
    let animationFrame = 0
    let renderer
    let geometry
    let material
    let texture
    let resizeObserver

    const start = async () => {
      try {
        const THREE = await import('three')
        if (disposed) return

        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
        renderer.outputColorSpace = THREE.SRGBColorSpace

        const scene = new THREE.Scene()
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
        camera.position.z = 1
        geometry = new THREE.PlaneGeometry(2.08, 2.08, 1, 1)
        texture = await new THREE.TextureLoader().loadAsync(HERO_IMAGE)
        texture.colorSpace = THREE.SRGBColorSpace
        texture.minFilter = THREE.LinearFilter

        material = new THREE.ShaderMaterial({
          uniforms: {
            uTexture: { value: texture },
            uResolution: { value: new THREE.Vector2(1, 1) },
            uImage: { value: new THREE.Vector2(texture.image.width || 1672, texture.image.height || 941) },
            uPointer: { value: new THREE.Vector2(0, 0) },
            uFocus: { value: new THREE.Vector2(0.5, 0.5) },
            uTime: { value: 0 },
            uMotion: { value: reducedMotion ? 0 : 1 },
            uZoom: { value: 1.08 },
            uBlur: { value: 0 },
            uRoom: { value: 0 },
          },
          vertexShader,
          fragmentShader,
        })
        scene.add(new THREE.Mesh(geometry, material))

        const resize = () => {
          const rect = canvas.getBoundingClientRect()
          renderer.setSize(Math.max(1, rect.width), Math.max(1, rect.height), false)
          material.uniforms.uResolution.value.set(Math.max(1, rect.width), Math.max(1, rect.height))
        }
        resizeObserver = new ResizeObserver(resize)
        resizeObserver.observe(canvas)
        resize()

        const currentPointer = new THREE.Vector2(0, 0)
        const currentFocus = new THREE.Vector2(0.5, 0.5)
        let currentZoom = 1.08
        let currentBlur = 0
        let currentRoom = 0
        let firstFrame = true

        const render = (time = 0) => {
          if (disposed) return
          const pointer = pointerRef.current
          const state = sceneStateRef.current
          const targetFocus = state.focus
            ? { x: state.focus.focus[0], y: 1 - state.focus.focus[1] }
            : { x: 0.5, y: 0.5 }
          const targetZoom = state.departing ? 1.24 : state.focus ? state.focus.zoom : state.phase === 'room' ? 1 : 1.08
          const targetRoom = state.phase === 'room' && !state.focus ? 1 : 0
          const damping = reducedMotion ? 1 : 0.055
          const focusDistance = Math.abs(currentFocus.x - targetFocus.x) + Math.abs(currentFocus.y - targetFocus.y)
          const cameraDistance = Math.abs(currentZoom - targetZoom)
          const targetBlur = state.focus
            ? Math.min(0.62, 0.015 + focusDistance * 2.2 + cameraDistance * 1.6)
            : Math.min(0.5, focusDistance * 2 + cameraDistance * 1.4)

          currentPointer.x += (pointer.x - currentPointer.x) * (reducedMotion ? 1 : 0.035)
          currentPointer.y += (pointer.y - currentPointer.y) * (reducedMotion ? 1 : 0.035)
          currentFocus.x += (targetFocus.x - currentFocus.x) * damping
          currentFocus.y += (targetFocus.y - currentFocus.y) * damping
          currentZoom += (targetZoom - currentZoom) * damping
          currentBlur += (targetBlur - currentBlur) * (reducedMotion ? 1 : 0.14)
          currentRoom += (targetRoom - currentRoom) * damping

          material.uniforms.uPointer.value.copy(currentPointer)
          material.uniforms.uFocus.value.copy(currentFocus)
          material.uniforms.uZoom.value = currentZoom
          material.uniforms.uBlur.value = currentBlur
          material.uniforms.uRoom.value = currentRoom
          material.uniforms.uTime.value = reducedMotion ? 0 : time * 0.001
          material.uniforms.uMotion.value = reducedMotion ? 0 : 1
          renderer.render(scene, camera)

          if (firstFrame) {
            firstFrame = false
            setStatus('ready')
          }
          animationFrame = window.requestAnimationFrame(render)
        }
        render()
      } catch {
        if (!disposed) setStatus('fallback')
      }
    }

    const contextLost = () => setStatus('fallback')
    canvas.addEventListener('webglcontextlost', contextLost)
    start()

    return () => {
      disposed = true
      window.cancelAnimationFrame(animationFrame)
      canvas.removeEventListener('webglcontextlost', contextLost)
      resizeObserver?.disconnect()
      geometry?.dispose()
      material?.dispose()
      texture?.dispose()
      renderer?.dispose()
    }
  }, [pointerRef, reducedMotion, sceneStateRef])

  return (
    <div
      className={`museum-hero-scene is-${status}${departing ? ' is-departing' : ''}`}
      data-testid="museum-hero-scene"
      data-renderer="three"
      data-pointer-ready={pointerRef.current.active ? 'true' : 'false'}
      data-focus={focusId || 'room'}
    >
      <img src={HERO_IMAGE} alt="水边与展厅相连的钓鱼佬博物馆" />
      <canvas ref={canvasRef} data-museum-hero-canvas aria-hidden="true" />
    </div>
  )
}
