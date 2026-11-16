'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

export type SceneStep = 0 | 1 | 2

interface Props {
  step: SceneStep
  running: boolean
  onReady: () => void
  onFailure: () => void
}

interface Controller {
  setStep: (step: SceneStep) => void
  setRunning: (running: boolean) => void
}

const CAMERA: Record<
  SceneStep,
  { pos: [number, number, number]; look: [number, number, number] }
> = {
  0: { pos: [0.4, 4.8, 7.6], look: [0, 0.3, 0] },
  1: { pos: [6.6, 3.9, 6.4], look: [0, 1.0, 0] },
  2: { pos: [0.2, 8.8, 3.4], look: [0, 0, 0.1] },
}

const PUNCH_OPEN = 3.2
const PUNCH_CLOSED = 0.95
const PUNCH_STATIC_MID = 1.7
const BLUE = 0x1f58c4

function plateShape(scale = 1) {
  const s = new THREE.Shape()
  const p = (x: number, y: number): [number, number] => [x * scale, y * scale]
  s.moveTo(...p(-2.6, -1.0))
  s.lineTo(...p(2.6, -1.0))
  s.lineTo(...p(2.6, -0.55))
  s.lineTo(...p(3.1, -0.55))
  s.lineTo(...p(3.1, 0))
  s.lineTo(...p(2.6, 0))
  s.lineTo(...p(2.6, 0.55))
  s.quadraticCurveTo(...p(0, 1.55), ...p(-2.6, 0.55))
  s.lineTo(...p(-2.6, 0))
  s.lineTo(...p(-3.1, 0))
  s.lineTo(...p(-3.1, -0.55))
  s.lineTo(...p(-2.6, -0.55))
  s.closePath()
  return s
}

function plateGeometry(scale: number, depth: number, holes: boolean) {
  const shape = plateShape(scale)
  if (holes) {
    for (const x of [-1.0, 1.0]) {
      const hole = new THREE.Path()
      hole.absarc(x, 0, 0.32, 0, Math.PI * 2, true)
      shape.holes.push(hole)
    }
  }
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.03,
    bevelSegments: 2,
    curveSegments: 40,
  })
  geometry.rotateX(-Math.PI / 2)
  return geometry
}

function segments(
  pairs: [number, number, number][],
  color: number,
  opacity = 1,
) {
  const geometry = new THREE.BufferGeometry().setFromPoints(
    pairs.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
  )
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
  })
  const lines = new THREE.LineSegments(geometry, material)
  lines.userData.baseOpacity = opacity
  return lines
}

function shadowTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 128
  const ctx = canvas.getContext('2d')!
  const gradient = ctx.createRadialGradient(64, 64, 6, 64, 64, 64)
  gradient.addColorStop(0, 'rgba(32,37,43,0.32)')
  gradient.addColorStop(1, 'rgba(32,37,43,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 128, 128)
  return new THREE.CanvasTexture(canvas)
}

export default function PrecisionSceneCanvas({
  step,
  running,
  onReady,
  onFailure,
}: Props) {
  const mountRef = useRef<HTMLDivElement>(null)
  const controllerRef = useRef<Controller | null>(null)
  const initial = useRef({ step, running })
  const callbacks = useRef({ onReady, onFailure })

  useEffect(() => {
    callbacks.current = { onReady, onFailure }
  })

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'low-power',
      })
    } catch {
      callbacks.current.onFailure()
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    renderer.domElement.style.display = 'block'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const pmrem = new THREE.PMREMGenerator(renderer)
    const envScene = new RoomEnvironment()
    const envTarget = pmrem.fromScene(envScene, 0.04)
    scene.environment = envTarget.texture

    const key = new THREE.DirectionalLight(0xffffff, 1.2)
    key.position.set(4, 8, 5)
    scene.add(key)
    scene.add(new THREE.AmbientLight(0xffffff, 0.35))

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 60)

    const plateMaterial = new THREE.MeshStandardMaterial({
      color: 0xd0d5db,
      metalness: 0.85,
      roughness: 0.36,
    })
    const dieMaterial = new THREE.MeshStandardMaterial({
      color: 0x9ea7b1,
      metalness: 0.7,
      roughness: 0.5,
    })
    const punchMaterial = new THREE.MeshStandardMaterial({
      color: 0xb9c1ca,
      metalness: 0.78,
      roughness: 0.42,
    })
    const pillarMaterial = new THREE.MeshStandardMaterial({
      color: 0xe0e4e8,
      metalness: 0.9,
      roughness: 0.25,
    })

    const plate = new THREE.Mesh(plateGeometry(1, 0.28, true), plateMaterial)
    scene.add(plate)

    const die = new THREE.Mesh(new THREE.BoxGeometry(7.8, 0.55, 3.5), dieMaterial)
    die.position.y = -0.275
    scene.add(die)

    const pillarGeometry = new THREE.CylinderGeometry(0.13, 0.13, 3.9, 24)
    const pillarXs = [-3.45, 3.45]
    for (const x of pillarXs) {
      for (const z of [-1.4, 1.4]) {
        const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial)
        pillar.position.set(x, 1.95, z)
        scene.add(pillar)
      }
    }

    const punch = new THREE.Group()
    const block = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.9, 2.7), punchMaterial)
    const cap = new THREE.Mesh(new THREE.BoxGeometry(7.4, 0.35, 3.3), dieMaterial)
    cap.position.y = 0.62
    const nose = new THREE.Mesh(plateGeometry(0.94, 0.18, false), punchMaterial)
    nose.position.y = -0.63
    punch.add(block, cap, nose)
    const bushingGeometry = new THREE.CylinderGeometry(0.26, 0.26, 1.0, 24)
    for (const x of pillarXs) {
      for (const z of [-1.4, 1.4]) {
        const bushing = new THREE.Mesh(bushingGeometry, pillarMaterial)
        bushing.position.set(x, 0.1, z)
        punch.add(bushing)
      }
    }
    punch.position.y = PUNCH_OPEN
    scene.add(punch)

    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(11, 7),
      new THREE.MeshBasicMaterial({
        map: shadowTexture(),
        transparent: true,
        depthWrite: false,
      }),
    )
    shadow.rotation.x = -Math.PI / 2
    shadow.position.y = -0.57
    scene.add(shadow)

    const outlinePoints = plateShape(1.07)
      .getPoints(48)
      .map((p) => new THREE.Vector3(p.x, 0.012, -p.y))
    const outline = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(outlinePoints),
      new THREE.LineBasicMaterial({ color: BLUE, transparent: true, opacity: 0.85 }),
    )
    scene.add(outline)

    const y = 0.02
    const dimGuides = new THREE.Group()
    dimGuides.add(
      segments(
        [
          [-3.1, y, 1.9], [3.1, y, 1.9],
          [-3.1, y, 1.7], [-3.1, y, 2.1],
          [3.1, y, 1.7], [3.1, y, 2.1],
          [-3.1, y, 0.55], [-3.1, y, 1.7],
          [3.1, y, 0.55], [3.1, y, 1.7],
          [-3.75, y, -1.05], [-3.75, y, 1.0],
          [-3.95, y, -1.05], [-3.55, y, -1.05],
          [-3.95, y, 1.0], [-3.55, y, 1.0],
          [-3.55, y, -1.05], [-0.3, y, -1.05],
          [-3.55, y, 1.0], [-2.6, y, 1.0],
        ],
        BLUE,
      ),
    )
    const alignGuides = new THREE.Group()
    const ringPoints: [number, number, number][] = []
    for (const x of [-1.0, 1.0]) {
      for (let i = 0; i < 40; i++) {
        const a0 = (i / 40) * Math.PI * 2
        const a1 = ((i + 1) / 40) * Math.PI * 2
        ringPoints.push(
          [x + Math.cos(a0) * 0.47, 0.32, Math.sin(a0) * 0.47],
          [x + Math.cos(a1) * 0.47, 0.32, Math.sin(a1) * 0.47],
        )
      }
    }
    alignGuides.add(
      segments(
        [
          [-1.0, 0.32, -1.7], [-1.0, 0.32, 1.7],
          [1.0, 0.32, -1.7], [1.0, 0.32, 1.7],
          [-3.7, 0.32, 0], [3.7, 0.32, 0],
          [-1.0, 0.32, 0], [-1.0, 2.4, 0],
          [1.0, 0.32, 0], [1.0, 2.4, 0],
          ...ringPoints,
        ],
        BLUE,
      ),
    )
    scene.add(dimGuides, alignGuides)

    const lineMaterials = (group: THREE.Group) =>
      group.children.map((c) => (c as THREE.LineSegments).material as THREE.LineBasicMaterial)

    const camPos = new THREE.Vector3(...CAMERA[initial.current.step].pos)
    const camLook = new THREE.Vector3(...CAMERA[initial.current.step].look)
    const tmp = new THREE.Vector3()
    const clock = new THREE.Clock()

    let step = initial.current.step
    let running = initial.current.running
    let raf = 0
    let time = 0

    const apply = (dt: number, instant: boolean) => {
      const k = instant ? 1 : 1 - Math.exp(-dt * 5)
      camPos.lerp(tmp.set(...CAMERA[step].pos), k)
      camLook.lerp(tmp.set(...CAMERA[step].look), k)
      camera.position.copy(camPos)
      camera.lookAt(camLook)

      let punchTarget = PUNCH_OPEN
      if (step === 1) {
        if (instant) {
          punchTarget = PUNCH_STATIC_MID
        } else {
          time += dt
          const e = (Math.sin(time * 0.8 - Math.PI / 2) + 1) / 2
          punchTarget = PUNCH_OPEN + (PUNCH_CLOSED - PUNCH_OPEN) * e * e * (3 - 2 * e)
        }
      }
      punch.position.y += (punchTarget - punch.position.y) * (instant ? 1 : Math.min(1, k * 1.4))

      const targets: [THREE.Group, number][] = [
        [dimGuides, step === 0 ? 1 : 0],
        [alignGuides, step === 2 ? 1 : 0],
      ]
      for (const [group, target] of targets) {
        for (const material of lineMaterials(group)) {
          material.opacity += (target - material.opacity) * k
        }
      }
      renderer.render(scene, camera)
    }

    const loop = () => {
      raf = requestAnimationFrame(loop)
      apply(Math.min(clock.getDelta(), 0.05), false)
    }

    const resize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      if (!w || !h) return
      renderer.setSize(w, h, false)
      const aspect = w / h
      camera.aspect = aspect
      camera.fov = Math.min(54, 32 * Math.max(1, 1.5 / aspect))
      camera.updateProjectionMatrix()
      if (!running) apply(0, true)
    }

    for (const group of [dimGuides, alignGuides]) {
      for (const material of lineMaterials(group)) {
        material.opacity = group === dimGuides && step === 0 ? 1 : group === alignGuides && step === 2 ? 1 : 0
      }
    }
    punch.position.y = step === 1 && !running ? PUNCH_STATIC_MID : PUNCH_OPEN

    const observer = new ResizeObserver(resize)
    observer.observe(mount)
    resize()
    apply(0, true)
    callbacks.current.onReady()
    if (running) {
      clock.getDelta()
      raf = requestAnimationFrame(loop)
    }

    const onContextLost = (event: Event) => {
      event.preventDefault()
      cancelAnimationFrame(raf)
      callbacks.current.onFailure()
    }
    renderer.domElement.addEventListener('webglcontextlost', onContextLost)

    controllerRef.current = {
      setStep(next) {
        step = next
        if (!running) apply(0, true)
      },
      setRunning(next) {
        if (next === running) return
        running = next
        cancelAnimationFrame(raf)
        if (next) {
          clock.getDelta()
          raf = requestAnimationFrame(loop)
        } else {
          apply(0, true)
        }
      },
    }

    return () => {
      controllerRef.current = null
      cancelAnimationFrame(raf)
      observer.disconnect()
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost)
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh
        mesh.geometry?.dispose()
        const material = mesh.material as THREE.Material | THREE.Material[] | undefined
        if (Array.isArray(material)) material.forEach((m) => m.dispose())
        else if (material) {
          ;(material as THREE.MeshBasicMaterial).map?.dispose()
          material.dispose()
        }
      })
      envTarget.dispose()
      pmrem.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  useEffect(() => {
    controllerRef.current?.setStep(step)
  }, [step])

  useEffect(() => {
    controllerRef.current?.setRunning(running)
  }, [running])

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />
}
