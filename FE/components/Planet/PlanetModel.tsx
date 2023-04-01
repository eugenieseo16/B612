import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, PresentationControls } from '@react-three/drei';
import { useRouter } from 'next/router';

import { useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';

import { PLANETS_LIST } from 'utils/utils';
import { usePlanetContract } from '@components/contracts/planetToken';
import { SkeletonUtils } from 'three-stdlib';
import { Box3, Vector3 } from 'three';

function Model(props: any) {
  const user = useRecoilValue(userAtom);
  const router = useRouter();
  const planetId = router.query?.planetId;

  // planet type
  const planetContract = usePlanetContract();
  const [planetDetail, setPlanetDetail] = useState(null);

  useEffect(() => {
    if (!planetId) return;
    planetContract?.methods
      .b612AddressMap(planetId)
      .call()
      .then((data: any) => {
        setPlanetDetail(data?.planetType);
      });
  }, [planetContract, planetId]);

  const { scene } = useGLTF(PLANETS_LIST[planetDetail || 1]);
  const clone = SkeletonUtils.clone(scene);

  //3D 모델링 리사이즈
  const bbox = new Box3().setFromObject(clone);
  const center = bbox.getCenter(new Vector3());
  const size = bbox.getSize(new Vector3());

  const maxAxis = Math.max(size.x, size.y, size.z);
  clone.scale.multiplyScalar(1 / maxAxis);
  bbox.setFromObject(clone);
  bbox.getCenter(center);
  bbox.getSize(size);
  clone.position.copy(center).multiplyScalar(-1);
  clone.position.y -= size.y * 0.5;

  return <primitive object={clone} {...props} />;
}

function PlanetTest() {
  return (
    <Canvas dpr={[1, 2]} camera={{ fov: 45 }} style={{ position: 'fixed' }}>
      <PresentationControls>
        <Stage environment="studio">
          <Model />
        </Stage>
      </PresentationControls>
    </Canvas>
  );
}

export default PlanetTest;
