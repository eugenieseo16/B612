import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, PresentationControls } from '@react-three/drei';

function Model(props: any) {
  const { scene } = useGLTF('#');
  return <primitive object={scene} {...props} />;
}

function PlanetTest() {
  return (
    // <Canvas dpr={[1, 2]} camera={{ fov: 45 }} style={{ position: 'absolute' }}>
    <Canvas dpr={[1, 2]} camera={{ fov: 45 }} style={{ position: 'fixed' }}>
      <PresentationControls
        speed={1.5}
        global
        zoom={1}
        polar={[-0.1, Math.PI / 4]}
      >
        <Stage environment="studio">
          <Model scale={0.01} />
        </Stage>
      </PresentationControls>
    </Canvas>
  );
}

export default PlanetTest;
