import React, { useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';

import {
  OrbitControls,
  // PerspectiveCamera,
  // Stars,
  Stats,
  // useTexture,
  // useGLTF,
  // useAnimations,
} from '@react-three/drei';
import Lights from '@components/square/Lights';
import Ground from '@components/square/Ground';
import { TetrisModel } from '@components/square/Tetris';
import { AppleTreeModel } from '@components/square/Appletree';
import { DaisyModel } from '@components/square/Daisy';
import AvatarFinn from '@components/square/AvatarFinn';
import Trees from '@components/square/Trees';

// const TextureSpheres = () => {
//   const map = useTexture('../textures/aerial_rocks_04_diff_1k.png');
//   const normalMap = useTexture('../textures/aerial_rocks_04_nor_gl_1k.png');
//   const roughnessMap = useTexture('../textures/aerial_rocks_04_rough_1k.png');

//   return (
//     <>
//       <mesh scale={[0.5, 0.5, 0.5]} position={[0, 1, 0]} castShadow>
//         <sphereGeometry />
//         <meshStandardMaterial
//           map={map}
//           normalMap={normalMap}
//           roughnessMap={roughnessMap}
//         />
//       </mesh>
//     </>
//   );
// };

function Square() {
  const styles = {
    container: {
      width: '100%',
      height: '100vh',
    },
  } as const;

  // 개발중일때 , true 상태관리와 helper를 키고,끌수 있도록 함
  const testing = true;

  return (
    <div style={styles.container}>
      <Canvas
        shadows
        camera={{
          position: [0, 3, 3],
        }}
      >
        {/*testing = true : 왼쪽상단에 상태를 보여준다, helper 킨다 */}
        {testing ? <Stats /> : null}
        {testing ? <axesHelper args={[2]} /> : null}
        {testing ? <gridHelper args={[30, 30]} /> : null}

        <OrbitControls />
        {/* <Stars /> */}

        <Ground />
        <TetrisModel />
        <AppleTreeModel position={[-3, 0, 2]} />
        <DaisyModel />
        {/* <TextureSpheres /> */}
        <Lights />
        <AvatarFinn />
        <Trees />
      </Canvas>
    </div>
  );
}

export default Square;
