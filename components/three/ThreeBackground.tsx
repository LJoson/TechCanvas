'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface ThreeBackgroundProps {
  className?: string
}

export function ThreeBackground({ className = "" }: ThreeBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const animationRef = useRef<number>()

  useEffect(() => {
    if (!mountRef.current) return

    // 创建场景
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // 创建相机
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    rendererRef.current = renderer

    mountRef.current.appendChild(renderer.domElement)

    // 创建几何体
    const geometries = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.SphereGeometry(0.5, 16, 16), // 减少细分
      new THREE.ConeGeometry(0.5, 1, 16), // 减少细分
      new THREE.TorusGeometry(0.5, 0.2, 8, 50) // 减少细分
    ]

    const materials = [
      new THREE.MeshBasicMaterial({
        color: 0xff6b6b,
        transparent: true,
        opacity: 0.2, // 降低透明度
        wireframe: true
      }),
      new THREE.MeshBasicMaterial({
        color: 0x42a5f5,
        transparent: true,
        opacity: 0.2,
        wireframe: true
      }),
      new THREE.MeshBasicMaterial({
        color: 0x66bb6a,
        transparent: true,
        opacity: 0.2,
        wireframe: true
      }),
      new THREE.MeshBasicMaterial({
        color: 0xab47bc,
        transparent: true,
        opacity: 0.2,
        wireframe: true
      })
    ]

    const meshes: THREE.Mesh[] = []

    // 创建多个几何体实例 - 减少数量
    for (let i = 0; i < 6; i++) { // 减少到6个
      const geometry = geometries[i % geometries.length]
      const material = materials[i % materials.length]
      const mesh = new THREE.Mesh(geometry, material)

      // 随机位置
      mesh.position.x = (Math.random() - 0.5) * 8
      mesh.position.y = (Math.random() - 0.5) * 8
      mesh.position.z = (Math.random() - 0.5) * 8

      // 随机旋转
      mesh.rotation.x = Math.random() * Math.PI
      mesh.rotation.y = Math.random() * Math.PI

      scene.add(mesh)
      meshes.push(mesh)
    }

    // 创建粒子系统 - 减少粒子数量
    const particleCount = 60 // 减少粒子数量
    const particleGeometry = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)
    const particleColors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 15
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 15
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 15

      const colors = [0xff6b6b, 0x42a5f5, 0x66bb6a, 0xab47bc, 0xffa726]
      const color = colors[Math.floor(Math.random() * colors.length)]

      particleColors[i * 3] = ((color >> 16) & 255) / 255
      particleColors[i * 3 + 1] = ((color >> 8) & 255) / 255
      particleColors[i * 3 + 2] = (color & 255) / 255
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3))

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.03, // 减小粒子大小
      vertexColors: true,
      transparent: true,
      opacity: 0.4 // 降低透明度
    })

    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    // 动画循环 - 降低动画速度
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate)

      // 旋转几何体 - 降低旋转速度
      meshes.forEach((mesh, index) => {
        mesh.rotation.x += 0.005 * (index + 1) // 降低旋转速度
        mesh.rotation.y += 0.005 * (index + 1)

        // 轻微的浮动动画 - 降低浮动幅度
        mesh.position.y += Math.sin(Date.now() * 0.0005 + index) * 0.0005
      })

      // 旋转粒子系统 - 降低旋转速度
      particles.rotation.y += 0.001

      renderer.render(scene, camera)
    }

    animate()

    // 窗口大小调整
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{
        background: 'transparent',
        filter: 'blur(0.1px)' // 减少模糊
      }}
    />
  )
}
