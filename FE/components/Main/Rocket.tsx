import { Center, useGLTF, useAnimations, Html } from '@react-three/drei';
import { useRandomUserAPI } from 'API/planetAPIs';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';
import { Box3, LoopOnce, Vector3 } from 'three';
import { degToRad } from 'three/src/math/MathUtils';
import { useRef, useEffect, useState } from 'react';
import { colors } from 'styles/colors';

function Rocket() {
  const ref = useRef<any>();
  const router = useRouter();
  const user = useRecoilValue(userAtom);
  const { scene, animations } = useGLTF(
    'https://res.cloudinary.com/dohkkln9r/image/upload/v1680596386/rocket.glb'
  );
  const [animate, setAnimate] = useState(false);

  const bbox = new Box3().setFromObject(scene);
  const center = bbox.getCenter(new Vector3());
  const size = bbox.getSize(new Vector3());

  const maxAxis = Math.max(size.x, size.y, size.z);
  scene.scale.multiplyScalar(5.5 / maxAxis);
  bbox.setFromObject(scene);
  bbox.getCenter(center);
  bbox.getSize(size);
  scene.position.copy(center).multiplyScalar(-1);

  // 랜덤 프로필 id
  const randomUserId = useRandomUserAPI(
    user?.memberId === undefined ? -1 : user?.memberId
  );
  const { actions, names } = useAnimations(animations, ref);
  useEffect(() => {
    actions[names[0]]?.setDuration(1.5);
    actions[names[0]]?.setLoop(LoopOnce, 1);
  }, []);

  useEffect(() => {
    if (animate) {
      actions[names[0]]?.play();
      setTimeout(() => {
        actions[names[0]]?.startAt(800);
      }, 1200);
      setTimeout(() => {
        router.push(`/profile/${randomUserId}`);
      }, 800);
    }
  }, [animate]);

  return (
    <>
      <Center position={[-8, 3, -5]} rotation={[0, 0, degToRad(-45)]} ref={ref}>
        <group>
          <primitive object={scene} />
        </group>
      </Center>
      <Html position={[-8, 3, -5]}>
        <div
          onClick={() => {
            router.push(`/profile/${randomUserId}`);
            setAnimate(true);
          }}
          style={{
            cursor: 'pointer',
            width: '10rem',
            backgroundColor: colors.purple,
            padding: '1rem',
            borderRadius: '1rem',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <p style={{ color: '#fff' }}>우주여행🚀</p>
          <span></span>
        </div>
      </Html>
    </>
  );
}

export default Rocket;
