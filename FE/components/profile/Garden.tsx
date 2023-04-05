import { Center, useGLTF, useAnimations } from '@react-three/drei';
import { useRecoilState } from 'recoil';
import roomIndexAtom from 'store/profile/roomIndexAtom';
import { Box3, Vector3 } from 'three';
import { degToRad } from 'three/src/math/MathUtils';
import { useRef, useEffect } from 'react';

function Garden() {
  const ref = useRef<any>();
  const [roomIndex, setRoomIndex] = useRecoilState(roomIndexAtom);
  const { scene, animations } = useGLTF(
    'https://res.cloudinary.com/dohkkln9r/image/upload/v1680591020/bouquet.glb'
  );
  const bbox = new Box3().setFromObject(scene);
  const center = bbox.getCenter(new Vector3());
  const size = bbox.getSize(new Vector3());

  const maxAxis = Math.max(size.x, size.y, size.z);
  scene.scale.multiplyScalar(15 / maxAxis);
  bbox.setFromObject(scene);
  bbox.getCenter(center);
  bbox.getSize(size);
  scene.position.copy(center).multiplyScalar(-1);
  const { actions, names } = useAnimations(animations, ref);

  useEffect(() => {
    actions[names[0]]?.play();
  }, [actions]);

  return (
    <>
      <Center
        onClick={() => setRoomIndex(3)}
        rotation={[degToRad(25), 0, 0]}
        position={[15, 5, -5]}
        ref={ref}
      >
        <primitive object={scene} />
      </Center>
    </>
  );
}

export default Garden;
