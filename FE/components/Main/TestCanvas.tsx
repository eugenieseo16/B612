import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import Planet from './Planet';
import Rocket from './Rocket';
import Square from './Square';
import { useMobile } from '@hooks/useMobile';

export default function App() {
  const isMobile = useMobile();
  useThree(({ camera }) => {
    if (!isMobile) camera.position.set(0, 4, 10);
    if (isMobile) camera.position.set(0, 8, 20);
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
