import { useLoader } from '@react-three/fiber';
import { count } from 'console';
import React, { useEffect, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Rocks = () => {
  const model = useLoader(GLTFLoader, './rocks/rocks.glb');

  return (
    <group>
      <object3D scale={[8, 8, 8]} position={[-118, 0, 67]}>
        <primitive object={model.scene.clone()} />
      </object3D>
      <object3D scale={[8, 8, 8]} position={[34, 0, -126]}>
        <primitive object={model.scene.clone()} />
      </object3D>
      <object3D scale={[8, 8, 8]} position={[81, 0, 136]}>
        <primitive object={model.scene.clone()} />
      </object3D>
      <object3D scale={[8, 8, 8]} position={[53, 0, 31]}>
        <primitive object={model.scene.clone()} />
      </object3D>
      <object3D scale={[8, 8, 8]} position={[59, 0, -36]}>
        <primitive object={model.scene.clone()} />
      </object3D>
      <object3D scale={[8, 8, 8]} position={[57, 0, -23]}>
        <primitive object={model.scene.clone()} />
      </object3D>
      <object3D scale={[8, 8, 8]} position={[118, 0, 22]}>
        <primitive object={model.scene.clone()} />
      </object3D>
      <object3D scale={[8, 8, 8]} position={[-123, 0, 91]}>
        <primitive object={model.scene.clone()} />
      </object3D>
      <object3D scale={[8, 8, 8]} position={[96, 0, -9]}>
        <primitive object={model.scene.clone()} />
      </object3D>
      <object3D scale={[8, 8, 8]} position={[-136, 0, -96]}>
        <primitive object={model.scene.clone()} />
      </object3D>
      <object3D scale={[8, 8, 8]} position={[33, 0, -44]}>
        <primitive object={model.scene.clone()} />
      </object3D>
      <object3D scale={[8, 8, 8]} position={[97, 0, -94]}>
        <primitive object={model.scene.clone()} />
      </object3D>
      <object3D scale={[8, 8, 8]} position={[96, 0, -62]}>
        <primitive object={model.scene.clone()} />
      </object3D>
      <object3D scale={[8, 8, 8]} position={[101, 0, -119]}>
        <primitive object={model.scene.clone()} />
      </object3D>
      <object3D scale={[8, 8, 8]} position={[-117, 0, -139]}>
        <primitive object={model.scene.clone()} />
      </object3D>
      <object3D scale={[8, 8, 8]} position={[49, 0, -104]}>
        <primitive object={model.scene.clone()} />
      </object3D>
      <object3D scale={[8, 8, 8]} position={[-129, 0, -13]}>
        <primitive object={model.scene.clone()} />
      </object3D>
      <object3D scale={[8, 8, 8]} position={[107, 0, -28]}>
        <primitive object={model.scene.clone()} />
      </object3D>
      <object3D scale={[8, 8, 8]} position={[20, 0, 88]}>
        <primitive object={model.scene.clone()} />
      </object3D>
    </group>
  );
};

export default Rocks;
