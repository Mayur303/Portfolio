import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'

/**
 * IntroVideo — Refined 3D WebGL Preloader & Background component.
 * Features a morphing glass torus-knot, gentle background dust motes,
 * and a letter-by-letter typography slide-reveal sequence.
 *
 * @param {function} onComplete - Callback triggered when preloader animation finishes
 */
export default function IntroVideo({ onComplete }) {
  const canvasRef = useRef(null)
  const overlayRef = useRef(null)
  const wipeRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [isIntroFinished, setIsIntroFinished] = useState(false)

  const headlineText = "Innovating the Digital Landscape"
  const subheadlineText = "Full-Stack Engineering Meets Intelligent Design"

  // Render text strings as individual staggered character spans
  const renderHeadlineChars = () => {
    return headlineText.split('').map((char, index) => (
      <span
        key={index}
        className="headline-char inline-block"
        style={{ transform: 'translateY(16px)', opacity: 0 }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  const renderSubheadlineChars = () => {
    return subheadlineText.split('').map((char, index) => (
      <span
        key={index}
        className="subheadline-char inline-block"
        style={{ transform: 'translateY(12px)', opacity: 0 }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  useEffect(() => {
    if (!canvasRef.current) return

    // -------------------------------------------------------------
    // THREE.JS SCENE SETUP
    // -------------------------------------------------------------
    const container = canvasRef.current.parentElement
    const width = container.clientWidth
    const height = container.clientHeight

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.3

    const scene = new THREE.Scene()

    // Cinematic camera setup (zooms out from z=4 to z=7.5)
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0, 4)

    // -------------------------------------------------------------
    // LIGHTING SETUP
    // -------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambientLight)

    // Cyber Cyan Key Light
    const dirLight1 = new THREE.DirectionalLight(0x00f0ff, 2.0)
    dirLight1.position.set(5, 5, 4)
    scene.add(dirLight1)

    // Neural Violet Fill Light
    const dirLight2 = new THREE.DirectionalLight(0x8b5cf6, 2.0)
    dirLight2.position.set(-5, -5, 4)
    scene.add(dirLight2)

    // Direct specular point highlight
    const pointLight = new THREE.PointLight(0xffffff, 1.5, 15)
    pointLight.position.set(0, 3, 5)
    scene.add(pointLight)

    // -------------------------------------------------------------
    // GENTLE BACKGROUND DUST MOTES
    // -------------------------------------------------------------
    const bgCount = 350
    const bgGeom = new THREE.BufferGeometry()
    const bgPositions = new Float32Array(bgCount * 3)

    for (let i = 0; i < bgCount; i++) {
      bgPositions[i * 3] = (Math.random() - 0.5) * 26 // X
      bgPositions[i * 3 + 1] = (Math.random() - 0.5) * 16 // Y
      bgPositions[i * 3 + 2] = (Math.random() - 0.5) * 16 // Z
    }
    bgGeom.setAttribute('position', new THREE.BufferAttribute(bgPositions, 3))

    // Rounded soft point texture
    const pCanvas = document.createElement('canvas')
    pCanvas.width = 16
    pCanvas.height = 16
    const ctx = pCanvas.getContext('2d')
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8)
    grad.addColorStop(0, 'rgba(255,255,255,1)')
    grad.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 16, 16)
    const pTexture = new THREE.CanvasTexture(pCanvas)

    const bgMat = new THREE.PointsMaterial({
      size: 0.05,
      map: pTexture,
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const bgPoints = new THREE.Points(bgGeom, bgMat)
    scene.add(bgPoints)

    // -------------------------------------------------------------
    // CORE ABSTRACT GLASS OBJECTS
    // -------------------------------------------------------------
    const coreGroup = new THREE.Group()
    scene.add(coreGroup)

    // Torus Knot geometry for complex refractive light caustics
    const torusGeom = new THREE.TorusKnotGeometry(0.85, 0.32, 160, 18)
    const initPositions = new Float32Array(torusGeom.attributes.position.array)
    torusGeom.userData = { initPositions }

    // 1. Vector Wireframe (Phase 1 Emergence)
    const wireframeGeom = new THREE.TorusKnotGeometry(0.86, 0.33, 80, 12)
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0,
    })
    const wireframeMesh = new THREE.Mesh(wireframeGeom, wireframeMat)
    wireframeMesh.scale.set(0.001, 0.001, 0.001)
    coreGroup.add(wireframeMesh)

    // 2. High-Refraction Physical Glass Core (Phase 2 Snap)
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      transmission: 0.97, // Exceptional transparency
      opacity: 0.0,
      roughness: 0.08,
      metalness: 0.1,
      ior: 1.62, // index of refraction similar to flint glass/sapphire
      thickness: 1.8,
      specularIntensity: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      side: THREE.DoubleSide,
    })
    const glassMesh = new THREE.Mesh(torusGeom, glassMat)
    glassMesh.scale.set(0.001, 0.001, 0.001)
    coreGroup.add(glassMesh)

    // -------------------------------------------------------------
    // ANIMATION SEQUENCE & TIMELINE
    // -------------------------------------------------------------
    const tl = gsap.timeline()
    const progressVal = { percent: 0 }

    // Phase 1: The Emergence (0.0s - 1.5s)
    tl.to(progressVal, {
      percent: 100,
      duration: 1.5,
      ease: 'power2.inOut',
      onUpdate: () => setProgress(Math.floor(progressVal.percent)),
    })

    // Cinematic zoom back and wireframe spring scale
    tl.to(camera.position, { z: 7.2, duration: 1.5, ease: 'power2.out' }, 0)
    tl.to(wireframeMesh.scale, { x: 1, y: 1, z: 1, duration: 1.5, ease: 'elastic.out(1, 0.4)' }, 0)
    tl.to(wireframeMat, { opacity: 0.35, duration: 1.0 }, 0)

    // Phase 2: The Core Snap & Text Reveal (1.5s - 3.0s)
    tl.add(() => {
      // Solidify wireframe into liquid refractive glass
      gsap.to(wireframeMat, { opacity: 0, duration: 0.3 })
      gsap.to(glassMat, { opacity: 1.0, duration: 0.6 })
      
      gsap.to(glassMesh.scale, {
        x: 1.0,
        y: 1.0,
        z: 1.0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.45)',
      })
    }, 1.5)

    // Stagger character entry slide/reveal for main headline & sub-headline
    tl.to('.headline-char', {
      opacity: 1,
      y: 0,
      stagger: 0.02,
      duration: 0.8,
      ease: 'power3.out',
    }, 1.5)

    tl.to('.subheadline-char', {
      opacity: 1,
      y: 0,
      stagger: 0.008,
      duration: 0.6,
      ease: 'power3.out',
    }, 1.8)

    // Phase 3: The Settling & UI Transition (3.0s+)
    // Core shifts from center to permanent top-right background
    tl.to(coreGroup.position, {
      x: 2.2,
      y: 1.0,
      z: -2.3,
      duration: 1.4,
      ease: 'power3.inOut',
    }, 3.0)

    tl.to(coreGroup.scale, {
      x: 0.6,
      y: 0.6,
      z: 0.6,
      duration: 1.4,
      ease: 'power3.inOut',
    }, 3.0)

    tl.to(coreGroup.rotation, {
      x: Math.PI * 1.5,
      y: Math.PI * 2,
      duration: 1.4,
      ease: 'power3.inOut',
    }, 3.0)

    // Sweep clean glassmorphism wipe overlay panel across screen
    tl.to(wipeRef.current, {
      x: '100%',
      duration: 1.3,
      ease: 'power3.inOut',
    }, 3.0)

    // Fade out load screens to reveal background layouts
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 1.0,
      onComplete: () => {
        setIsIntroFinished(true)
        if (onComplete) onComplete()
      },
    }, 3.2)

    // -------------------------------------------------------------
    // LISTENERS & MOUSE COORD DAMPENERS
    // -------------------------------------------------------------
    let mouseX = 0
    let mouseY = 0
    let targetMouseX = 0
    let targetMouseY = 0

    const onMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 0.6
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 0.6
    }
    window.addEventListener('mousemove', onMouseMove)

    // Track scroll ratio to slightly shift background motes
    let targetScroll = 0
    let currentScroll = 0
    const onScroll = () => {
      const scrollMax = document.documentElement.scrollHeight - window.innerHeight
      targetScroll = scrollMax > 0 ? window.scrollY / scrollMax : 0
    }
    window.addEventListener('scroll', onScroll)

    const onResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // -------------------------------------------------------------
    // RENDER LOOP
    // -------------------------------------------------------------
    const clock = new THREE.Clock()
    let frameId

    const animate = () => {
      const time = clock.getElapsedTime()

      // Damped mouse inputs
      mouseX += (targetMouseX - mouseX) * 0.05
      mouseY += (targetMouseY - mouseY) * 0.05
      currentScroll += (targetScroll - currentScroll) * 0.05

      // Upward floating background dust particles reacting to mouseCoordinates
      const bgPos = bgGeom.attributes.position.array
      for (let i = 0; i < bgCount; i++) {
        // Slow float up
        bgPos[i * 3 + 1] += 0.003 + (i % 3) * 0.0005
        // React/sway to cursor
        bgPos[i * 3] += mouseX * 0.008

        // Recycle particles
        if (bgPos[i * 3 + 1] > 8) {
          bgPos[i * 3 + 1] = -8
          bgPos[i * 3] = (Math.random() - 0.5) * 26
        }
      }
      bgGeom.attributes.position.needsUpdate = true

      // Hyper-smooth liquid glass morph vertex distortion
      const posAttr = torusGeom.attributes.position
      const initPositions = torusGeom.userData.initPositions
      const len = posAttr.count
      
      for (let i = 0; i < len; i++) {
        const idx = i * 3
        const x = initPositions[idx]
        const y = initPositions[idx + 1]
        const z = initPositions[idx + 2]
        
        // Complex liquid morph equation
        const wave = Math.sin(x * 1.8 + time * 1.2) * Math.cos(y * 1.8 + time * 1.2) * 0.075
        posAttr.array[idx] = x + wave
        posAttr.array[idx + 1] = y + wave
        posAttr.array[idx + 2] = z + wave
      }
      posAttr.needsUpdate = true

      // Sine wave displacement floating loop on Y-axis
      const floatY = Math.sin(time * 1.4) * 0.14

      if (tl.progress() >= 0.95) {
        // Glided background state: gentle rotation + mouse tilt parallax
        coreGroup.position.y = 1.0 + floatY - currentScroll * 0.4
        coreGroup.rotation.y = time * 0.06 + mouseX * 0.5
        coreGroup.rotation.x = time * 0.04 + mouseY * 0.5
      } else {
        // Centered intro state: slow mesmerize spin
        coreGroup.position.y = floatY
        coreGroup.rotation.y = time * 0.12
        coreGroup.rotation.x = time * 0.08
        coreGroup.rotation.z = time * 0.05
      }

      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }

    animate()

    // -------------------------------------------------------------
    // MEMORY CLEANUPS
    // -------------------------------------------------------------
    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      wireframeGeom.dispose()
      wireframeMat.dispose()
      torusGeom.dispose()
      glassMat.dispose()
      bgGeom.dispose()
      bgMat.dispose()
      pTexture.dispose()
    }
  }, [onComplete])

  return (
    <>
      {/* 3D Render Canvas Container */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-10">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Premium Loader Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 w-full h-full bg-[#0A0A0C] z-50 flex flex-col justify-between p-8 sm:p-12"
        style={{
          pointerEvents: isIntroFinished ? 'none' : 'auto',
        }}
      >
        {/* Top details */}
        <div className="flex justify-between items-start select-none">
          <div className="text-[10px] font-mono tracking-widest text-violet-500/80 uppercase">
            SYS_BOOT // STABLE
          </div>
          <div className="text-[10px] font-mono text-gray-600 tracking-wider">
            PORTFOLIO // OS v1.2
          </div>
        </div>

        {/* Center Typography Stagger Frame */}
        <div className="text-center flex flex-col items-center justify-center max-w-4xl mx-auto px-4 select-none">
          {/* Progress Percent */}
          <div className="text-sm font-mono tracking-widest text-[#00f0ff] uppercase mb-8">
            Initializing neural environment... [{progress.toString().padStart(3, '0')}%]
          </div>

          {/* Stagger Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            {renderHeadlineChars()}
          </h1>

          {/* Stagger Subheadline */}
          <p className="text-xs sm:text-sm tracking-widest text-gray-400 uppercase font-medium">
            {renderSubheadlineChars()}
          </p>
        </div>

        {/* Bottom micro details */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-[9px] font-mono text-gray-700 select-none">
          <div>GEOMETRY // TORUS_KNOT // COMPILED</div>
          <div>CREATIVE TECH ENGINE © 2026</div>
        </div>
      </div>

      {/* Glassmorphic Wipe transition sweeping panel */}
      <div
        ref={wipeRef}
        className="fixed inset-0 w-full h-full bg-white/5 backdrop-blur-md z-[55] pointer-events-none"
        style={{
          transform: 'translateX(-100%)',
          borderLeft: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '-20px 0 120px rgba(0, 240, 255, 0.05)',
        }}
      />
    </>
  )
}
