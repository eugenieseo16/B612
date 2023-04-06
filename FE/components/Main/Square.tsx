import { Center, Html, useGLTF } from '@react-three/drei';
import { useRouter } from 'next/router';
import React from 'react';
import { colors } from 'styles/colors';
import { Box3, Vector3 } from 'three';
import { InnerHtml } from './PlanetById';
import { useMobile } from '@hooks/useMobile';

function Square() {
  const isMobile = useMobile();
  const router = useRouter();
  const { scene } = useGLTF(
    'https://res.cloudinary.com/dohkkln9r/image/upload/v1680596386/square.glb'
  );
  const bbox = new Box3().setFromObject(scene);
  const center = bbox.getCenter(new Vector3());
  const size = bbox.getSize(new Vector3());

  const maxAxis = Math.max(size.x, size.y, size.z);
  scene.scale.multiplyScalar(12 / maxAxis);
  bbox.setFromObject(scene);
  bbox.getCenter(center);
  bbox.getSize(size);
  scene.position.copy(center).multiplyScalar(-1);
  const pos = !isMobile ? new Vector3(0, -1, 0) : new Vector3(0, -5, 0);
  const htmlPos = !isMobile ? new Vector3(3, -1, 0) : new Vector3(-3, -7, 0);

  return (
    <>
      <Center position={pos}>
        <group>
          <primitive object={scene} />
        </group>
      </Center>
      <Html position={htmlPos}>
        <InnerHtml onClick={() => router.push('/square')}>
          <p style={{ color: '#fff' }}>광장에 놀러가기🍹</p>
        </InnerHtml>
      </Html>
    </>
  );
}

export default Square;
