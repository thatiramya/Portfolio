
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { PointMaterial } from "@react-three/drei";
import * as THREE from "three";

interface ParticleProps {
  count: number;
}

export const ParticleSystem = ({ count = 2500 }: ParticleProps) => {
  // Use a more specific type for the mesh ref
  const mesh = useRef<THREE.Points>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  
  // Galaxy parameters
  const params = useMemo(() => ({
    branches: 5,
    spin: 1,
    randomness: 0.5,
    randomnessPower: 3,
    insideColor: new THREE.Color('#ff6030'),
    outsideColor: new THREE.Color('#1b3984'),
  }), []);
  
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Determine distribution pattern
      const radius = Math.random() * 4 + 0.5;
      // Spiral pattern
      const branchAngle = (i % params.branches) / params.branches * Math.PI * 2;
      const spinAngle = radius * params.spin;
      
      // Apply randomness
      const randomX = Math.pow(Math.random(), params.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * params.randomness * radius;
      const randomY = Math.pow(Math.random(), params.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * params.randomness * radius;
      const randomZ = Math.pow(Math.random(), params.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * params.randomness * radius;
      
      // Calculate position
      temp[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      temp[i3 + 1] = randomY * 0.6;
      temp[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;
    }
    return temp;
  }, [count, params]);
  
  // Create a color array for particles
  const colors = useMemo(() => {
    const colorArray = new Float32Array(count * 3);
    const colorPalette = [
      new THREE.Color("#bd4bfc"), // Purple
      new THREE.Color("#00ffcc"), // Teal
      new THREE.Color("#6a5acd"), // Slate blue
      new THREE.Color("#9370db"), // Medium purple
      new THREE.Color("#8a2be2"), // Blue violet
    ];
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Mix colors based on distance from center
      const radius = Math.sqrt(
        particles[i3] * particles[i3] + 
        particles[i3 + 1] * particles[i3 + 1] + 
        particles[i3 + 2] * particles[i3 + 2]
      );
      
      // Blend between inside and outside colors based on radius
      const mixValue = radius / 4;
      let color;
      
      if (i % 15 === 0) {
        // Special bright particles scattered throughout
        color = new THREE.Color("#ffffff");
        color.multiplyScalar(1.5); // Brighter than white
      } else {
        // Gradient based on position in galaxy
        const colorIndex = Math.floor((radius * 5) % colorPalette.length);
        color = colorPalette[colorIndex].clone();
      }
      
      colorArray[i3] = color.r;
      colorArray[i3 + 1] = color.g;
      colorArray[i3 + 2] = color.b;
    }
    return colorArray;
  }, [count, particles]);
  
  useFrame((state) => {
    if (!mesh.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Slower gentle rotation of the whole system
    mesh.current.rotation.y = time * 0.05;
    mesh.current.rotation.z = time * 0.03;
    
    // Get mouse position from pointer
    mousePosition.current.x = state.mouse.x * 0.1;
    mousePosition.current.y = state.mouse.y * 0.1;
    
    // Tilt the galaxy in response to mouse movement
    mesh.current.rotation.x = mousePosition.current.y * 0.5;
    mesh.current.rotation.y += mousePosition.current.x * 0.01;
    
    // Update individual particle positions for more dynamic movement
    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Get the current position
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];
      
      // Calculate distance from center
      const distance = Math.sqrt(x * x + y * y + z * z);
      
      // Wave-like movements with varying frequencies based on distance
      const frequency = 0.5 + distance * 0.2;
      const amplitude = 0.002 / (1 + distance * 0.5);
      
      // Create pulsing/breathing effect
      positions[i3] += Math.sin(time * frequency + i * 0.01) * amplitude;
      positions[i3 + 1] += Math.cos(time * frequency + i * 0.02) * amplitude;
      positions[i3 + 2] += Math.sin(time * frequency + i * 0.03) * amplitude;
      
      // Add subtle orbit motion for particles far from center
      if (distance > 2) {
        const orbitSpeed = 0.001 / distance;
        const orbit = time * orbitSpeed;
        positions[i3] += Math.cos(orbit) * amplitude * 2;
        positions[i3 + 2] += Math.sin(orbit) * amplitude * 2;
      }
    }
    
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });
  
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={particles.length / 3} 
          array={particles} 
          itemSize={3} 
        />
        <bufferAttribute 
          attach="attributes-color" 
          count={colors.length / 3} 
          array={colors} 
          itemSize={3} 
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        vertexColors
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
