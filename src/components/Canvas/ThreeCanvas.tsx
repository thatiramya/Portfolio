import React, { useRef, Suspense, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import * as THREE from "three";

// Scene effects component
const SceneEffects = () => {
  const { gl, scene } = useThree();
  
  useEffect(() => {
    // Configure renderer
    gl.setPixelRatio(window.devicePixelRatio);
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.8; // Further increased exposure for better visibility
    
    // Add subtle fog to create depth
    scene.fog = new THREE.FogExp2(0x000020, 0.01); // Reduced fog density more
    
    // Set background
    scene.background = new THREE.Color(0x000020);
    
    return () => {
      scene.fog = null;
      scene.background = null;
    };
  }, [gl, scene]);
  
  return null;
};

// Cool abstract wave animation
const WavyAnimation = () => {
  const mesh = useRef<THREE.Mesh>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  
  // Create geometry for the waves
  const geometry = new THREE.PlaneGeometry(40, 40, 128, 128); // Increased size
  
  // Custom shader material for waves
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color(0x8800ff) }, // Even brighter purple
      uColorB: { value: new THREE.Color(0x00ffff) }, // Brighter teal/cyan
      uMouse: { value: new THREE.Vector2(0, 0) },
    },
    vertexShader: `
      uniform float uTime;
      uniform vec2 uMouse;
      varying vec2 vUv;
      varying float vElevation;
      
      // Classic perlin 3D noise 
      vec4 permute(vec4 x) {
        return mod(((x*34.0)+1.0)*x, 289.0);
      }
      
      vec4 taylorInvSqrt(vec4 r) {
        return 1.79284291400159 - 0.85373472095314 * r;
      }
      
      vec3 fade(vec3 t) {
        return t*t*t*(t*(t*6.0-15.0)+10.0);
      }
      
      float noise(vec3 P) {
        vec3 Pi0 = floor(P);
        vec3 Pi1 = Pi0 + vec3(1.0);
        Pi0 = mod(Pi0, 289.0);
        Pi1 = mod(Pi1, 289.0);
        vec3 Pf0 = fract(P);
        vec3 Pf1 = Pf0 - vec3(1.0);
        vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
        vec4 iy = vec4(Pi0.yy, Pi1.yy);
        vec4 iz0 = Pi0.zzzz;
        vec4 iz1 = Pi1.zzzz;
        
        vec4 ixy = permute(permute(ix) + iy);
        vec4 ixy0 = permute(ixy + iz0);
        vec4 ixy1 = permute(ixy + iz1);
        
        vec4 gx0 = ixy0 / 7.0;
        vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
        gx0 = fract(gx0);
        vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
        vec4 sz0 = step(gz0, vec4(0.0));
        gx0 -= sz0 * (step(0.0, gx0) - 0.5);
        gy0 -= sz0 * (step(0.0, gy0) - 0.5);
        
        vec4 gx1 = ixy1 / 7.0;
        vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
        gx1 = fract(gx1);
        vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
        vec4 sz1 = step(gz1, vec4(0.0));
        gx1 -= sz1 * (step(0.0, gx1) - 0.5);
        gy1 -= sz1 * (step(0.0, gy1) - 0.5);
        
        vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
        vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
        vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
        vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
        vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
        vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
        vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
        vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
        
        vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
        g000 *= norm0.x;
        g010 *= norm0.y;
        g100 *= norm0.z;
        g110 *= norm0.w;
        vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
        g001 *= norm1.x;
        g011 *= norm1.y;
        g101 *= norm1.z;
        g111 *= norm1.w;
        
        float n000 = dot(g000, Pf0);
        float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
        float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
        float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
        float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
        float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
        float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
        float n111 = dot(g111, Pf1);
        
        vec3 fade_xyz = fade(Pf0);
        vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
        vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
        float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
        return 2.2 * n_xyz;
      }
      
      void main() {
        vUv = uv;
        
        // Create multiple layers of noise
        float elevation1 = noise(vec3(position.xy * 0.5, uTime * 0.3)) * 1.2; // Increased amplitude
        float elevation2 = noise(vec3(position.xy * 0.3, uTime * 0.1 + 100.0)) * 0.7; // Increased amplitude
        float elevation3 = noise(vec3(position.xy * 0.8, uTime * 0.2 + 300.0)) * 0.5; // Increased amplitude
        
        // Mouse interaction - create ripple effect
        float distanceToMouse = distance(position.xy, uMouse * 10.0);
        float mouseEffect = sin(distanceToMouse * 3.0 - uTime * 5.0) * 0.25 / (0.1 + distanceToMouse); // Increased effect
        
        // Combine all effects
        vElevation = elevation1 + elevation2 + elevation3 + mouseEffect;
        
        // Apply to vertex position
        vec3 newPosition = position;
        newPosition.z += vElevation;
        
        // Project the position
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      varying vec2 vUv;
      varying float vElevation;
      
      // Simple noise function for fragment shader
      float rand(vec2 co) {
        return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
      }
      
      void main() {
        // Dynamic color calculation based on elevation and time
        float mixFactor = vElevation * 2.5 + 0.5; // Increased color contrast
        vec3 color = mix(uColorA, uColorB, mixFactor);
        
        // Add subtle pulse
        float pulse = sin(uTime) * 0.2 + 0.9; // Increased pulse effect
        
        // Add some bright spots as "stars"
        float bright = smoothstep(0.8, 0.95, rand(vUv * 20.0 + uTime * 0.1)); // Increased number and brightness
        color = mix(color, vec3(1.5), bright * 0.9); // Increased star brightness
        
        // Apply some glow based on elevation
        color += pow(vElevation + 0.5, 3.0) * vec3(0.3, 0.6, 0.9) * 0.5; // Increased glow brightness
        
        // Final color output with some alpha transparency for a nebula effect
        gl_FragColor = vec4(color * pulse, 0.95); // Increased opacity
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
  });
  
  // Frame loop
  useFrame((state) => {
    if (!mesh.current) return;
    
    // Update time uniform
    (mesh.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.elapsedTime;
    
    // Update mouse position uniform
    mousePosition.current.x = state.mouse.x * 0.5;
    mousePosition.current.y = state.mouse.y * 0.5;
    (mesh.current.material as THREE.ShaderMaterial).uniforms.uMouse.value.set(
      mousePosition.current.x, 
      mousePosition.current.y
    );
    
    // Add subtle rotation
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1 - 0.2;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 4, 0, 0]} position={[0, 0, 0]} material={material} geometry={geometry} />
  );
};

// Floating particles effect
const FloatingParticles = ({ count = 600 }) => { 
  const mesh = useRef<THREE.Points>(null);
  
  // Create particles
  const particlesPosition = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    // Distribute particles in a sphere
    const radius = 10 + Math.random() * 15; // Increased radius
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    
    particlesPosition[i3] = radius * Math.sin(phi) * Math.cos(theta);
    particlesPosition[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    particlesPosition[i3 + 2] = radius * Math.cos(phi);
    
    // Random colors from purple to teal spectrum
    const colorChoice = Math.random();
    if (colorChoice > 0.8) {
      // Bright teal
      colors[i3] = 0.0;
      colors[i3 + 1] = 0.98 + Math.random() * 0.05; // Brighter
      colors[i3 + 2] = 0.95 + Math.random() * 0.1; // Brighter
    } else if (colorChoice > 0.5) {
      // Purple
      colors[i3] = 0.9 + Math.random() * 0.2; // Brighter
      colors[i3 + 1] = 0.4 * Math.random();
      colors[i3 + 2] = 1.0;
    } else {
      // White/blue stars
      const brightness = 0.85 + Math.random() * 0.3; // Brighter
      colors[i3] = brightness;
      colors[i3 + 1] = brightness;
      colors[i3 + 2] = brightness + Math.random() * 0.5;
    }
  }
  
  // Animation
  useFrame((state) => {
    if (!mesh.current) return;
    
    // Type assertion to inform TypeScript that positions is a Float32Array we can modify
    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Get current position
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];
      
      // Calculate distance from origin
      const dist = Math.sqrt(x * x + y * y + z * z);
      
      // Move particles in different patterns based on position
      const offset1 = (Math.sin(time * 0.2 + dist * 0.05) * 0.35) * (i % 2 ? 1 : -1); // Increased magnitude
      const offset2 = (Math.cos(time * 0.3 + i * 0.01) * 0.25) * (i % 3 ? 1 : -1); // Increased magnitude
      
      // Apply the offsets
      positions[i3] = particlesPosition[i3] + offset1;
      positions[i3 + 1] = particlesPosition[i3 + 1] + offset2;
      positions[i3 + 2] = particlesPosition[i3 + 2] + (Math.sin(time * 0.15 + i * 0.02) * 0.25); // Increased magnitude
    }
    
    mesh.current.geometry.attributes.position.needsUpdate = true;
    
    // Rotate slowly
    mesh.current.rotation.y = time * 0.03;
    mesh.current.rotation.x = Math.sin(time * 0.01) * 0.2;
  });
  
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={particlesPosition.length / 3} 
          array={particlesPosition} 
          itemSize={3} 
        />
        <bufferAttribute 
          attach="attributes-color" 
          count={colors.length / 3} 
          array={colors} 
          itemSize={3} 
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.18} // Increased size
        vertexColors 
        transparent 
        opacity={0.95} // Increased opacity
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Simple background stars component for a minimal backup
const BackgroundStars = () => {
  const count = 2000; // Increased star count for better visibility
  const starPositions = new Float32Array(count * 3);
  const starSizes = new Float32Array(count);
  
  for (let i = 0; i < count; i++) {
    starPositions[i * 3] = (Math.random() - 0.5) * 50; // Wider spread
    starPositions[i * 3 + 1] = (Math.random() - 0.5) * 50; // Wider spread
    starPositions[i * 3 + 2] = (Math.random() - 0.5) * 50 - 10;
    starSizes[i] = Math.random() * 0.15 + 0.05; // Increased size significantly
  }
  
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={starPositions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={starSizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.15} // Increased size significantly
        sizeAttenuation={true}
        transparent={true}
        opacity={0.95} // Increased opacity
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export const ThreeCanvas = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={canvasRef} className="canvas-container">
      <Canvas
        camera={{ position: [0, 3, 15], fov: 60, near: 0.1, far: 1000 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance" 
        }}
        dpr={[1, 2]} // Better performance on high-DPI displays
        performance={{ min: 0.5 }}
        onCreated={({ camera }) => {
          // Fix: Create a proper Vector3 instance for lookAt
          const target = new THREE.Vector3(0, 0, 0);
          camera.lookAt(target);
        }}
      >
        <Suspense fallback={<BackgroundStars />}>
          <SceneEffects />
          <ambientLight intensity={0.3} />
          <WavyAnimation />
          <FloatingParticles count={600} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={false}
            autoRotate={false}
          />
          <Preload all />
        </Suspense>
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
};

export default ThreeCanvas;
