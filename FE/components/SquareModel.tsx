import React from 'react';
import { Canvas, PrimitiveProps } from '@react-three/fiber';
import { useGLTF, Stage, PresentationControls } from '@react-three/drei';

type Props = Omit<PrimitiveProps, 'object'>;
function Model(props: Props) {
  const { scene } = useGLTF('/planet/square_preview.glb');
  return <primitive object={scene} {...props} />;
}

function PlanetTest() {
  return (
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
