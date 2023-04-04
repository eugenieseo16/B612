import { Canvas } from '@react-three/fiber';

import Rocket from '@components/Main/Rocket';
import Square from '@components/Main/Square';
import Planet from '@components/Main/Planet';

function RocketModel() {
  return (
    <Canvas style={{ position: 'fixed' }}>
      <Rocket />
      <Square />
      <Planet />
    </Canvas>
  );
}

export default RocketModel;
