import { Center, Html, useGLTF } from '@react-three/drei';
import { useRouter } from 'next/router';
import React from 'react';
import { colors } from 'styles/colors';
import { Box3, Vector3 } from 'three';

function Square() {
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

  return (
    <>
      <Center position={[0, -1, 0]}>
        <group>
          <primitive object={scene} />
        </group>
      </Center>
      <Html position={[4, -1, 0]}>
        <div
          onClick={() => router.push('/square')}
          style={{
            cursor: 'pointer',
            width: '12rem',
            backgroundColor: colors.purple,
            padding: '1rem',
            borderRadius: '1rem',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <p style={{ color: '#fff' }}>광장에 놀러가기🍹</p>
        </div>
      </Html>
    </>
  );
}

export default Square;
