import React from 'react';

// import { useHelper } from '@react-three/drei';

const Lights: React.FC = () => {
  // const lightRef = useRef<THREE.DirectionalLight>();

  // useHelper(lightRef, DirectionalLightHelper, 2);
  return (
    <>
      <ambientLight intensity={0.05} />
      <directionalLight position={[0, 50, 50]} castShadow intensity={0.1} />
      <directionalLight position={[0, 0, -1]} intensity={1} />
      <directionalLight
        // ref={lightRef}
        position={[0, 0, 1]}
        intensity={1}
      />
      <hemisphereLight args={['##8DDDFD', '#5e9c49', 0.5]} />
    </>
  );
};

export default Lights;
