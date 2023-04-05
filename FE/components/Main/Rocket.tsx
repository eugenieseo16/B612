import { useGLTF } from '@react-three/drei';
import { useRandomUserAPI } from 'API/planetAPIs';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';
import { Box3, Vector3 } from 'three';

function Rocket() {
  const router = useRouter();
  const user = useRecoilValue(userAtom);
  const { scene } = useGLTF(
    'https://res.cloudinary.com/dohkkln9r/image/upload/v1680596386/rocket.glb'
  );

  const bbox = new Box3().setFromObject(scene);
  const center = bbox.getCenter(new Vector3());
  const size = bbox.getSize(new Vector3());

  const maxAxis = Math.max(size.x, size.y, size.z);
  scene.scale.multiplyScalar(4.5 / maxAxis);
  bbox.setFromObject(scene);
  bbox.getCenter(center);
  bbox.getSize(size);
  scene.position.copy(center).multiplyScalar(-1);
  scene.position.y -= size.y * 0.5;

  // 랜덤 프로필 id
  const randomUserId = useRandomUserAPI(
    user?.memberId === undefined ? -1 : user?.memberId
  );

  return (
    <group>
      <primitive object={scene} />
    </group>
  );
}

export default Rocket;
