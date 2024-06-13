// src/components/SoccerBall.js
import React from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const SoccerBall = () => {
  const texture = useLoader(THREE.TextureLoader, '/soccer_ball_texture1.png');

  return (
    <Canvas style={{ height: '400px' }} shadows>
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={[10, 10, 5]}
        intensity={1}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <OrbitControls enableZoom={false} />
      <Sphere args={[1, 32, 32]} scale={2.5} position={[0, 1, 0]} castShadow>
        <meshStandardMaterial attach="material" map={texture} />
      </Sphere>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry attach="geometry" args={[100, 100]} />
        <shadowMaterial attach="material" opacity={0.3} />
      </mesh>
    </Canvas>
  );
};

export default SoccerBall;

