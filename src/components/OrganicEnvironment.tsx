"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment } from "@react-three/drei";

function AtmosphericCore() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      {/* Geometri Torus Knot: Merepresentasikan konektivitas kompleks dan kontinuitas */}
      <mesh scale={2.5}>
        <torusKnotGeometry args={[1, 0.3, 256, 64]} />
        {/* Material Kaca Optik Premium (Awwwards-tier) */}
        <MeshTransmissionMaterial
          backside
          backsideThickness={1}
          thickness={0.5}
          chromaticAberration={1} // Distorsi warna prisma
          anisotropy={0.3}
          distortion={0.5}
          distortionScale={0.3}
          temporalDistortion={0.1}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          color="#0e7490" // Dasar Cyan gelap
        />
      </mesh>
    </Float>
  );
}

export default function OrganicEnvironment() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#02040A]">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        {/* Pencahayaan Lingkungan untuk memantul di kaca */}
        <Environment preset="city" />
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#22d3ee" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#818cf8" />
        
        {/* Kabut Atmosfer (Fog) untuk menciptakan Depth of Field */}
        <fog attach="fog" args={["#02040A", 8, 20]} />
        
        <AtmosphericCore />
      </Canvas>
      
      {/* Ambient Glow & Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#02040A_85%)] opacity-80 mix-blend-multiply" />
      <div className="absolute top-[10%] right-[10%] w-[40%] h-[40%] bg-cyan-600/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-[10%] left-[10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[150px] rounded-full" />
    </div>
  );
}

