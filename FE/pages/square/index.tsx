import React, { useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import Link from 'next/link';

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
// import Ground from '@components/square/Ground';
import Tetris from '@components/square/Tetris';
import { AppleTreeModel } from '@components/square/Appletree';
import AvatarFinn from '@components/square/AvatarFinn';
// import Trees from '@components/square/Trees';
// import Rocks from '@components/square/Rocks';
import Tetris2 from '@components/square/Tetris2';
import Ground2 from '@components/square/Ground2';

function Square() {
  const styles = {
    container: {
      width: '100%',
      height: '100vh',
    },
  } as const;

  // 개발중일때 , true 상태관리와 helper를 키고,끌수 있도록 함
  const testing = true;
  const controlsRef = useRef();

  return (
    <div style={styles.container}>
      <Canvas
        style={{ backgroundImage: `url("/sky.png")`, backgroundSize: 'cover' }}
        shadows
        camera={{
          position: [0, 8, 14],
        }}
      >
        {/*testing = true : 왼쪽상단에 상태를 보여준다, helper 킨다 */}
        {testing ? <Stats /> : null}
        {testing ? <axesHelper args={[2]} /> : null}
        {testing ? <gridHelper args={[30, 30]} /> : null}

        <OrbitControls ref={controlsRef} minDistance={2} maxDistance={100} />
        {/* <Stars /> */}

        {/* <Ground /> */}
        <Ground2 />
        <Tetris />
        <Tetris2 />
        <AppleTreeModel position={[-3, 0, 2]} />
        {/* <TextureSpheres /> */}
        <Lights />
        <AvatarFinn />
        {/* <Trees />
        <Rocks /> */}
      </Canvas>
    </div>
  );
}

export default Square;
