"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useTheme } from "next-themes";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Blob() {
  const { theme } = useTheme();
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} scale={0.9}>
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      <meshPhongMaterial
        color={theme === "dark" ? "#e2e8f0" : "#e2e8f0"}
        wireframe
        wireframeLinewidth={1}
      />
    </mesh>
  );
}

export default function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        className="opacity-50 transition-opacity duration-500 hover:opacity-75"
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Blob />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
