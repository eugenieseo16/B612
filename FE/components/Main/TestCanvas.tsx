import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import Planet from './Planet';
import Rocket from './Rocket';
import Square from './Square';

export default function App() {
  return (
    <Canvas style={{ position: 'fixed' }}>
      <OrbitControls />
      <ambientLight />
      <Square />
      <Rocket />
      <Planet />
    </Canvas>
  );
}
