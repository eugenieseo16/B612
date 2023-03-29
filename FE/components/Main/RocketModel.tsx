import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, PresentationControls } from '@react-three/drei';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import { OrbitControls } from '@react-three/drei';
import { Box3, Vector3 } from 'three';

import { Center } from '@react-three/drei';

function Rocket(props: any) {
  const { scene } = useGLTF('/rocket/rocket.glb');

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

function Square(props: any) {
  const { scene } = useGLTF('/planet/square_preview.glb');
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

function Planet(props: any) {
  const { scene } = useGLTF('/planet/blue_diamond.glb');
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
function RocketModel() {
  const router = useRouter();

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ fov: 45, position: [-0.05, 0, 3] }}
      style={{ position: 'fixed' }}
    >
      <Stage></Stage>

      {/* 랜덤행성으로 가는 로켓 3D */}
      <PresentationControls>
        <Rocket
          position={[-1.2, 0.35, 0.2]}
          onClick={() => router.push(`/planet/1`)}
        />
      </PresentationControls>

      {/* 광장 3D */}
      <PresentationControls>
        <Center
          position={[0, -0.2, 1.3]}
          onClick={() => router.push(`/square`)}
        >
          <Square />
        </Center>
      </PresentationControls>

      {/* 랜덤 내 행성 3D */}
      <PresentationControls>
        <Center
          position={[1, 0.5, 0.3]}
          onClick={() => router.push(`/planet/1`)}
        >
          <Planet />
        </Center>
      </PresentationControls>
    </Canvas>
  );
}

export default RocketModel;
