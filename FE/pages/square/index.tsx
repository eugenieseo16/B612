import { Canvas } from '@react-three/fiber';
import { Stats } from '@react-three/drei';

import {
  Lights,
  Ground,
  Tetris,
  AppleTreeModel,
  AvatarFinn,
  Tetris2,
} from '@components/square/index';

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
        {/* position={[35, 0, -45]} */}
        {/* <Tetris2 />  */}
        {/* position={[-20, 0, 18]} */}
        <AppleTreeModel position={[14, 0, -45]} />
        <Lights />
        <AvatarFinn />
      </Canvas>
    </div>
  );
}

export default Square;
