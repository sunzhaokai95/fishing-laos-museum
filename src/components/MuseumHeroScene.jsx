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
  uniform float uTime;
  uniform float uMotion;
  varying vec2 vUv;

  vec2 coverUv(vec2 uv, vec2 screenSize, vec2 imageSize) {
    float screenRatio = screenSize.x / screenSize.y;
    float imageRatio = imageSize.x / imageSize.y;
    vec2 scale = screenRatio < imageRatio
      ? vec2(screenRatio / imageRatio, 1.0)
      : vec2(1.0, imageRatio / screenRatio);
    return (uv - 0.5) * scale + 0.5;
  }

  void main() {
    vec2 uv = coverUv(vUv, uResolution, uImage);
    vec2 pointerUv = uPointer * 0.5 + 0.5;
    pointerUv.y = 1.0 - pointerUv.y;

    float leftWater = (1.0 - smoothstep(0.28, 0.63, uv.x)) * smoothstep(0.08, 0.48, uv.y);
    float lowerWater = smoothstep(0.34, 0.72, uv.y) * (1.0 - smoothstep(0.86, 1.0, uv.x));
    float waterMask = clamp(leftWater + lowerWater * 0.48, 0.0, 1.0);
    float distanceToPointer = distance(uv, pointerUv);
    float ring = sin(distanceToPointer * 76.0 - uTime * 2.7) * exp(-distanceToPointer * 11.0);
    float current = sin((uv.x * 9.0 + uv.y * 5.0) - uTime * 0.42) * 0.00085;
    vec2 displacement = vec2(ring * 0.0018, ring * 0.0011 + current) * waterMask * uMotion;
    vec2 parallax = uPointer * vec2(0.006, -0.004) * uMotion;

    vec4 color = texture2D(uTexture, clamp(uv + displacement + parallax, 0.002, 0.998));
    gl_FragColor = color;
  }
`

export default function MuseumHeroScene({ pointerRef, reducedMotion = false, departing = false }) {
  const [status, setStatus] = useState('fallback')
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || typeof window.WebGLRenderingContext === 'undefined') return undefined

    let disposed = false
    let frame = 0
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
            uTime: { value: 0 },
            uMotion: { value: reducedMotion ? 0 : 1 },
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

        const current = new THREE.Vector2(0, 0)
        const render = (time = 0) => {
          if (disposed) return
          const target = pointerRef.current
          current.x += (target.x - current.x) * 0.035
          current.y += (target.y - current.y) * 0.035
          material.uniforms.uPointer.value.copy(current)
          material.uniforms.uTime.value = time * 0.001
          material.uniforms.uMotion.value += ((reducedMotion ? 0 : 1) - material.uniforms.uMotion.value) * 0.045
          renderer.render(scene, camera)
          if (frame === 0) setStatus('ready')
          frame += 1
          if (!reducedMotion) frame = window.requestAnimationFrame(render)
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
      window.cancelAnimationFrame(frame)
      canvas.removeEventListener('webglcontextlost', contextLost)
      resizeObserver?.disconnect()
      geometry?.dispose()
      material?.dispose()
      texture?.dispose()
      renderer?.dispose()
    }
  }, [pointerRef, reducedMotion])

  return (
    <div
      className={`museum-hero-scene is-${status}${departing ? ' is-departing' : ''}`}
      data-testid="museum-hero-scene"
      data-renderer="three"
      data-pointer-ready={pointerRef.current.active ? 'true' : 'false'}
    >
      <img src={HERO_IMAGE} alt="水边与展厅相连的钓鱼佬博物馆" />
      <canvas ref={canvasRef} data-museum-hero-canvas aria-hidden="true" />
    </div>
  )
}
