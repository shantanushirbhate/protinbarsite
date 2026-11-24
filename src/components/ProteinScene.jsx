
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

import {
  ContactShadows,
  Environment,
  Float,
  RoundedBox,
  Sparkles,
  Text,
} from "@react-three/drei";

/* =========================
   ROTATING 3D PROTEIN BAR
========================= */

function Bar({
  color = "#ff681f",
  scale = 1,
  rotation = 0,
}) {
  const ref = useRef();

  useFrame((state, delta) => {
    if (!ref.current) return;

    ref.current.rotation.y += delta * 0.32;

    ref.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.7) * 0.08;
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.18}
      floatIntensity={0.35}
    >
      <group
        ref={ref}
        scale={scale}
        rotation={[0.12, rotation, -0.1]}
      >
        {/* MAIN PROTEIN BAR */}
        <RoundedBox
          args={[3.35, 1.12, 0.34]}
          radius={0.16}
          smoothness={10}
          castShadow
          receiveShadow
        >
          <meshPhysicalMaterial
            color={color}
            roughness={0.28}
            metalness={0.08}
            clearcoat={0.9}
            transparent={false}
          />
        </RoundedBox>

        {/* FRONT LABEL */}
        <mesh position={[0, 0, 0.176]}>
          <planeGeometry args={[3.05, 0.82]} />

          <meshStandardMaterial
            color="#fff2dc"
            roughness={0.5}
            side={2}
          />
        </mesh>

        {/* BRAND NAME */}
        <Text
          position={[0, 0.12, 0.19]}
          fontSize={0.42}
          color="#48251d"
          anchorX="center"
          anchorY="middle"
        >
          ONE
        </Text>

        {/* PRODUCT NAME */}
        <Text
          position={[0, -0.2, 0.19]}
          fontSize={0.12}
          color="#ff681f"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.08}
        >
          PROTEIN BAR
        </Text>

        {/* PROTEIN BADGE */}
        <mesh position={[1.08, 0.26, 0.2]}>
          <circleGeometry args={[0.19, 48]} />

          <meshStandardMaterial
            color="#ffe52e"
            roughness={0.45}
          />
        </mesh>

        <Text
          position={[1.08, 0.26, 0.215]}
          fontSize={0.105}
          color="#48251d"
          anchorX="center"
          anchorY="middle"
        >
          20g
        </Text>
      </group>
    </Float>
  );
}

/* =========================
   3D SCENE CONTENT
========================= */

function SceneContent() {
  return (
    <>
      {/* LIGHTING */}
      <ambientLight intensity={1.5} />

      <spotLight
        position={[4, 7, 6]}
        angle={0.45}
        penumbra={0.8}
        intensity={2.8}
        castShadow
      />

      <pointLight
        position={[-4, -2, 3]}
        color="#ff9a48"
        intensity={14}
      />

      {/* MAIN PROTEIN BAR */}
      <Bar
        color="#ff681f"
        scale={1.08}
        rotation={-0.2}
      />

      {/* SMALL LEFT PROTEIN BAR */}
      <group
        position={[-1.45, -1.1, -0.8]}
        rotation={[0.1, 0.4, 0.15]}
      >
        <Bar
          color="#f4b84a"
          scale={0.48}
          rotation={0.35}
        />
      </group>

      {/* SMALL RIGHT PROTEIN BAR */}
      <group
        position={[1.45, 1.05, -1.1]}
        rotation={[-0.12, -0.5, -0.12]}
      >
        <Bar
          color="#a8c94b"
          scale={0.44}
          rotation={-0.3}
        />
      </group>

      {/* FLOATING PARTICLES */}
      <Sparkles
        count={55}
        scale={6}
        size={2.2}
        speed={0.25}
        color="#ffe52e"
      />

      {/* SHADOW */}
      <ContactShadows
        position={[0, -2.1, 0]}
        opacity={0.42}
        scale={7}
        blur={2.6}
        far={4}
      />

      {/* ENVIRONMENT LIGHTING */}
      <Environment preset="studio" />
    </>
  );
}

/* =========================
   MAIN PROTEIN SCENE
========================= */

export default function ProteinScene({
  compact = false,
}) {
  return (
    <div
      className={
        compact
          ? "protein-scene protein-scene-compact"
          : "protein-scene"
      }
    >
      <Canvas
        shadows
        camera={{
          position: [0, 0, 7],
          fov: 38,
        }}
        dpr={[1, 1.6]}
        gl={{
          antialias: true,
          alpha: true,
          premultipliedAlpha: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
