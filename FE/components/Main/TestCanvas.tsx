import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import Planet from './Planet';
import Rocket from './Rocket';
import Square from './Square';

export default function App() {
  useThree(({ camera }) => {
    camera.position.set(0, 4, 10);
  });
  return (
    <>
      <OrbitControls />
      <ambientLight />
      <Square />
      <Rocket />
      <Planet />
    </>
  );
}
