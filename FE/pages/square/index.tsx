import { Canvas } from '@react-three/fiber';
import { Stats } from '@react-three/drei';

import Lights from '@components/square/Lights';
import Ground from '@components/square/Ground';
import Tetris from '@components/square/Tetris';
import { AppleTreeModel } from '@components/square/Appletree';
import AvatarFinn from '@components/square/AvatarFinn';
import Tetris2 from '@components/square/Tetris2';

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
        style={{ backgroundImage: `url("/sky.png")`, backgroundSize: 'cover' }}
        shadows
        camera={{
          position: [0, 6, 14],
        }}
      >
        {/*testing = true : 왼쪽상단에 상태를 보여준다, helper 킨다 */}
        {testing ? <Stats /> : null}
        {testing ? <axesHelper args={[2]} /> : null}
        {testing ? <gridHelper args={[300, 300]} /> : null}

        <Ground />
        <Tetris />
        <Tetris2 />
        <AppleTreeModel position={[14, 0, -45]} />
        <Lights />
        <AvatarFinn />
      </Canvas>
    </div>
  );
}

export default Square;
