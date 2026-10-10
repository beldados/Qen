'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import * as THREE from 'three';

// 1. Background: Dense microscopic distant star points
function BackgroundStars() {
  const ref = useRef<THREE.Points>(null!);
  const sphere = useMemo(() => {
    return random.inSphere(new Float32Array(5000 * 3), { radius: 25 });
  }, []);

  return (
    <group position={[0, 0, -15]}>
      <Points ref={ref} positions={sphere as Float32Array} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#E8E6E1" size={0.015} sizeAttenuation={true} depthWrite={false} opacity={0.3} />
      </Points>
    </group>
  );
}

// 2. Foreground: Large, out-of-focus bokeh dust particles
function ForegroundBokeh() {
  const ref = useRef<THREE.Points>(null!);
  const sphere = useMemo(() => {
    const pos = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = Math.random() * 2 + 8; // z between 8 and 10 (close to camera)
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.05;
      ref.current.rotation.y -= delta * 0.03;
    }
  });

  return (
    <Points ref={ref} positions={sphere as Float32Array} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#C88A58" size={0.3} sizeAttenuation={true} depthWrite={false} opacity={0.12} />
    </Points>
  );
}

// 3. Midground: The interactive dust field
function DustParticles() {
  const ref = useRef<THREE.Points>(null!);
  const sphere = useMemo(() => {
    return random.inSphere(new Float32Array(3000 * 3), { radius: 10 });
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 30;
      ref.current.rotation.y -= delta / 40;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere as Float32Array} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#E8E6E1" size={0.03} sizeAttenuation={true} depthWrite={false} opacity={0.5} />
      </Points>
    </group>
  );
}

// 4. Ethereal Sand Stream (Continuous Hourglass Gravity)
function SandStream() {
  const count = 600;
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const [positions, velocities, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    const cAmber = new THREE.Color("#C88A58");
    const cBone = new THREE.Color("#E8E6E1");

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 0.1;
      pos[i * 3 + 1] = Math.random() * 4.0 - 2.0;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.1;

      vel[i * 3 + 0] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = Math.random() * 0.02 + 0.01;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;

      const isAmber = Math.random() > 0.5;
      col[i * 3 + 0] = isAmber ? cAmber.r : cBone.r;
      col[i * 3 + 1] = isAmber ? cAmber.g : cBone.g;
      col[i * 3 + 2] = isAmber ? cAmber.b : cBone.b;
    }
    return [pos, vel, col];
  }, []);

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.instanceColor = new THREE.InstancedBufferAttribute(colors, 3);
    }
  }, [colors]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      velocities[i * 3 + 1] += delta * 0.15; // Gravity

      positions[i * 3 + 0] += velocities[i * 3 + 0] * delta;
      positions[i * 3 + 1] -= velocities[i * 3 + 1] * delta;
      positions[i * 3 + 2] += velocities[i * 3 + 2] * delta;

      if (positions[i * 3 + 1] < -2.5) {
        positions[i * 3 + 1] = 2.5;
        positions[i * 3 + 0] = (Math.random() - 0.5) * 0.1;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
        velocities[i * 3 + 1] = Math.random() * 0.5 + 0.1;
      }

      dummy.position.set(positions[i * 3 + 0], positions[i * 3 + 1], positions[i * 3 + 2]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} position={[0, 0, 0]}>
      <sphereGeometry args={[0.015, 8, 8]} />
      <meshBasicMaterial transparent opacity={0.8} />
    </instancedMesh>
  );
}

// 5. True Camera Parallax Rig
function CameraRig() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    // Smooth camera inertia lerp
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouse.x * 2.0, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, mouse.y * 2.0, 0.05);
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function VoidScene() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      {/* 0.06 is highly tuned for Z=10 camera setup, smoothly fading out distance */}
      <fogExp2 attach="fog" args={['#08090C', 0.06]} />
      <CameraRig />
      
      {/* Depth Layers */}
      <BackgroundStars />
      <DustParticles />
      <ForegroundBokeh />
      <SandStream />
    </Canvas>
  );
}
