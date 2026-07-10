"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment } from "@react-three/drei";

function AtmosphericCore() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh scale={2.5}>
        {/* PERFORMANCE FIX 1: Polygon Reduction (Graceful Degradation) 
          Turunkan dari [256, 64] menjadi [128, 32]. 
          Secara visual hampir tidak terlihat bedanya, tapi memotong 75% beban vertex CPU/GPU.
        */}
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        
        <MeshTransmissionMaterial
          backside
          backsideThickness={1}
          thickness={0.5}
          chromaticAberration={1}
          anisotropy={0.3}
          distortion={0.5}
          distortionScale={0.3}
          temporalDistortion={0.1}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          color="#0e7490"
          /* PERFORMANCE FIX 2: FBO Resolution & Samples Capping
            MeshTransmissionMaterial secara default me-render seukuran layar. 
            Kita batasi resolusinya ke 256px dan matikan multisampling (samples={0}) di mobile.
          */
          resolution={256}
          samples={0}
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
      {/* PERFORMANCE FIX 3: DPR (Device Pixel Ratio) Capping.
        Dibatasi maksimal 1.5. Mencegah ponsel retina me-render 3x resolusi.
        gl={{ antialias: false }} mematikan antialiasing bawaan yang berat di mobile.
      */}
      <Canvas dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: "high-performance" }} camera={{ position: [0, 0, 10], fov: 45 }}>
        <Environment preset="city" />
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#22d3ee" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#818cf8" />
        <fog attach="fog" args={["#02040A", 8, 20]} />
        <AtmosphericCore />
      </Canvas>

      {/* PERFORMANCE FIX 4: Pemusnahan CSS `blur-[150px]`.
        Diganti dengan gradien statis murni yang biaya GPU-nya 0.
      */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#02040A_85%)] opacity-80 mix-blend-multiply" />
      <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle,_rgba(8,145,178,0.15)_0%,_transparent_60%)]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle,_rgba(79,70,229,0.15)_0%,_transparent_60%)]" />
    </div>
  );
}

