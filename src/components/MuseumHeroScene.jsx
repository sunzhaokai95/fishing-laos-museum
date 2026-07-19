import { useEffect, useRef, useState } from 'react'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform vec2 uPointer;
  uniform vec2 uResolution;
  uniform float uTime;
  uniform float uMotion;
  varying vec2 vUv;

  void main() {
    vec2 pointerUv = uPointer * 0.5 + 0.5;
    pointerUv.y = 1.0 - pointerUv.y;
    float waveA = sin(vUv.x * 22.0 + vUv.y * 7.0 - uTime * 0.65);
    float waveB = sin(vUv.x * 9.0 - vUv.y * 18.0 + uTime * 0.42);
    float ring = sin(distance(vUv, pointerUv) * 58.0 - uTime * 2.2) * exp(-distance(vUv, pointerUv) * 7.0);
    float light = (waveA + waveB) * 0.5 + ring * uMotion;
    float edge = smoothstep(0.0, 0.7, vUv.y);
    float alpha = (0.018 + abs(light) * 0.035) * edge;
    gl_FragColor = vec4(vec3(1.0), alpha);
  }
`

export default function MuseumHeroScene({ pointerRef, reducedMotion = false }) {
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
    let resizeObserver

    const start = async () => {
      try {
        const THREE = await import('three')
        if (disposed) return
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6))
        renderer.setClearColor(0x000000, 0)
        const scene = new THREE.Scene()
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
        camera.position.z = 1
        geometry = new THREE.PlaneGeometry(2, 2)
        material = new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          uniforms: {
            uPointer: { value: new THREE.Vector2(0, 0) },
            uResolution: { value: new THREE.Vector2(1, 1) },
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
          current.x += (target.x - current.x) * (reducedMotion ? 1 : 0.04)
          current.y += (target.y - current.y) * (reducedMotion ? 1 : 0.04)
          material.uniforms.uPointer.value.copy(current)
          material.uniforms.uTime.value = reducedMotion ? 0 : time * 0.001
          renderer.render(scene, camera)
          setStatus((value) => value === 'ready' ? value : 'ready')
          animationFrame = window.requestAnimationFrame(render)
        }
        render()
      } catch {
        if (!disposed) setStatus('fallback')
      }
    }

    start()
    return () => {
      disposed = true
      window.cancelAnimationFrame(animationFrame)
      resizeObserver?.disconnect()
      geometry?.dispose()
      material?.dispose()
      renderer?.dispose()
    }
  }, [pointerRef, reducedMotion])

  return (
    <div
      className={`museum-hero-scene is-${status}`}
      data-testid="museum-hero-scene"
      data-renderer="three"
      data-pointer-ready={pointerRef.current.active ? 'true' : 'false'}
    >
      <canvas ref={canvasRef} data-museum-hero-canvas aria-hidden="true" />
    </div>
  )
}
