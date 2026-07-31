"use client";

import { Float, Sparkles, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

type GalaxySceneProps = {
  progress: number;
  reducedMotion: boolean;
};

function Planet({ position, radius, color, ring = false }: {
  position: [number, number, number];
  radius: number;
  color: string;
  ring?: boolean;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.07;
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.13) * 0.08;
  });

  return (
    <Float speed={0.7} rotationIntensity={0.18} floatIntensity={0.35}>
      <group position={position}>
        <mesh ref={mesh}>
          <icosahedronGeometry args={[radius, 5]} />
          <meshStandardMaterial color={color} roughness={0.72} metalness={0.12} emissive={color} emissiveIntensity={0.16} />
        </mesh>
        <mesh scale={1.045}>
          <icosahedronGeometry args={[radius, 2]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.12} />
        </mesh>
        {ring && (
          <mesh rotation={[Math.PI / 2.8, 0.18, 0]}>
            <torusGeometry args={[radius * 1.55, 0.012, 10, 96]} />
            <meshBasicMaterial color="#d9d3ff" transparent opacity={0.52} />
          </mesh>
        )}
      </group>
    </Float>
  );
}

function OrbitLine({ radius, color, rotation }: { radius: number; color: string; rotation: number }) {
  return (
    <mesh rotation={[Math.PI / 2.15, rotation, 0]}>
      <torusGeometry args={[radius, 0.008, 8, 160]} />
      <meshBasicMaterial color={color} transparent opacity={0.17} />
    </mesh>
  );
}

function Scene({ progress, reducedMotion }: GalaxySceneProps) {
  const root = useRef<THREE.Group>(null);
  const points = useMemo(() => Array.from({ length: 42 }, (_, index) => {
    const angle = index * 2.39996;
    const radius = 4.8 + (index % 8) * 0.85;
    return [Math.cos(angle) * radius, (index % 7) - 3, Math.sin(angle) * radius - 5] as [number, number, number];
  }), []);

  useFrame((state, delta) => {
    const camera = state.camera;
    const p = reducedMotion ? 0 : progress;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, Math.sin(p * Math.PI * 2) * 1.55, 2.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 0.4 - p * 1.1, 2.5, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, 9.5 - p * 4.3, 2.5, delta);
    camera.lookAt(0, -p * 0.5, -2.4 - p * 3.2);
    if (root.current && !reducedMotion) {
      root.current.rotation.y = state.pointer.x * 0.045 + p * 0.18;
      root.current.rotation.x = -state.pointer.y * 0.025;
    }
  });

  return (
    <group ref={root}>
      <ambientLight intensity={0.24} />
      <pointLight color="#8b7cff" intensity={34} distance={28} position={[-6, 4, 6]} />
      <pointLight color="#30d5c8" intensity={25} distance={24} position={[6, -2, 1]} />
      <Stars radius={85} depth={42} count={1700} factor={2.7} saturation={0.4} fade speed={0.3} />
      <Sparkles count={110} scale={[17, 12, 18]} size={1.5} speed={0.18} color="#bdb5ff" opacity={0.45} />
      <group position={[0, 0, -2]}>
        <OrbitLine radius={3.4} color="#8b7cff" rotation={0.2} />
        <OrbitLine radius={5.4} color="#30d5c8" rotation={-0.35} />
        <OrbitLine radius={7.4} color="#ff7fd1" rotation={0.58} />
        <mesh>
          <sphereGeometry args={[1.05, 64, 64]} />
          <meshStandardMaterial color="#211654" emissive="#684cff" emissiveIntensity={0.52} roughness={0.58} />
        </mesh>
        <mesh scale={1.42}>
          <sphereGeometry args={[1.05, 48, 48]} />
          <meshBasicMaterial color="#7c69ff" transparent opacity={0.045} />
        </mesh>
        <Planet position={[-4.5, 1.3, -1]} radius={0.72} color="#30d5c8" ring />
        <Planet position={[4.1, -1.5, -3.4]} radius={0.92} color="#8b7cff" ring />
        <Planet position={[0.8, 4.4, -6]} radius={0.64} color="#ffb45f" />
        <Planet position={[-2.8, -4.7, -7]} radius={0.52} color="#ff7fd1" />
        {points.map((position, index) => (
          <mesh key={index} position={position}>
            <sphereGeometry args={[0.025 + (index % 3) * 0.012, 8, 8]} />
            <meshBasicMaterial color={index % 2 ? "#b9fff6" : "#c7bfff"} transparent opacity={0.55} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default function GalaxyScene(props: GalaxySceneProps) {
  return (
    <div className="galaxy-canvas" aria-hidden="true">
      <Canvas dpr={[1, 1.65]} camera={{ position: [0, 0.4, 9.5], fov: 52 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} frameloop={props.reducedMotion ? "demand" : "always"}>
        <Suspense fallback={null}><Scene {...props} /></Suspense>
      </Canvas>
    </div>
  );
}
