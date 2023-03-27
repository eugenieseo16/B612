import { Center, useGLTF } from '@react-three/drei';
import { useRecoilState } from 'recoil';
import roomIndexAtom from 'store/profile/roomIndexAtom';
import { degToRad } from 'three/src/math/MathUtils';

function Garden() {
  const [roomIndex, setRoomIndex] = useRecoilState(roomIndexAtom);
  const garden = useGLTF(
    'https://res.cloudinary.com/dohkkln9r/image/upload/v1679556580/qbtr4fdvy4pufqtrqgwm.glb'
  );
  return (
    <>
      <Center
        onClick={() => setRoomIndex(3)}
        rotation={[degToRad(25), 0, 0]}
        scale={0.05}
        position={[15, 5, 0]}
      >
        <primitive object={garden.scene} />
      </Center>
    </>
  );
}

export default Garden;
