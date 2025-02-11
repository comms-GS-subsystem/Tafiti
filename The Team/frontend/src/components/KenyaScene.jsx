import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Stars, Text } from '@react-three/drei'
import * as THREE from 'three'

function Satellite({ position = [2, 4, 2], orbitRadius = 3, orbitSpeed = 0.5, startAngle = 0, name }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    // Create elliptical orbit by using different multipliers for x and z
    meshRef.current.position.x = position[0] + Math.sin(time * orbitSpeed + startAngle) * (orbitRadius * 1.8)
    meshRef.current.position.y = position[1] + Math.cos(time * orbitSpeed + startAngle) * (orbitRadius * 0.4)
    meshRef.current.position.z = position[2] + Math.sin(time * orbitSpeed + startAngle) * orbitRadius
    
    // Rotate satellite to face direction of travel
    const angle = Math.atan2(
      Math.cos(time * orbitSpeed + startAngle) * (orbitRadius * 1.8),
      -Math.sin(time * orbitSpeed + startAngle) * orbitRadius
    )
    meshRef.current.rotation.y = angle + Math.PI / 2
  })

  return (
    <group ref={meshRef} position={position}>
      {/* Main body */}
      <mesh castShadow>
        <boxGeometry args={[1, 0.3, 0.3]} />
        <meshStandardMaterial color="#1e88e5" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Solar panels */}
      <mesh castShadow position={[-0.8, 0, 0]}>
        <boxGeometry args={[0.5, 0.8, 0.05]} />
        <meshStandardMaterial color="#4fc3f7" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh castShadow position={[0.8, 0, 0]}>
        <boxGeometry args={[0.5, 0.8, 0.05]} />
        <meshStandardMaterial color="#4fc3f7" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* University name */}
      <Text
        position={[0, 0.5, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff"
      >
        {name}
      </Text>
    </group>
  )
}

function MainText() {
  const textRef = useRef()
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    textRef.current.rotation.y = Math.sin(time * 0.3) * 0.2
  })

  return (
    <group ref={textRef}>
      <Text
        position={[-4, 0, 0]}
        fontSize={1.5}
        color="#1e88e5"
        anchorX="left"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/raleway/v19/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvao7CIPrcVIT9d0c8.woff"
        material-metalness={0.8}
        material-roughness={0.2}
      >
        
      </Text>
    </group>
  )
}

export default function KenyaScene() {
  return (
    <Canvas
      shadows
      style={{
        height: '100%',
        width: '100%',
        background: 'transparent',
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <ambientLight intensity={0.5} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <group position={[0, 0, 0]}>
        <MainText />
        <Satellite position={[0, 3, 2]} orbitRadius={6} orbitSpeed={0.3} startAngle={0} name="JKUAT" />
        <Satellite position={[0, 3, 2]} orbitRadius={6} orbitSpeed={0.3} startAngle={Math.PI / 2} name="KU" />
        <Satellite position={[0, 3, 2]} orbitRadius={6} orbitSpeed={0.3} startAngle={Math.PI} name="TUK" />
        <Satellite position={[0, 3, 2]} orbitRadius={6} orbitSpeed={0.3} startAngle={3 * Math.PI / 2} name="UoN" />
      </group>
      
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        minDistance={5}
        maxDistance={20}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  )
}
