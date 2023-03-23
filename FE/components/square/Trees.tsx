import { useLoader } from '@react-three/fiber';
import { count } from 'console';
import React, { useEffect, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Trees = () => {
  const model = useLoader(GLTFLoader, './trees/trees.glb');
  // const [trees, setTrees] = useState<treeType[]>([]);

  // 그림자
  // model.scene.traverse((object)=>{
  //   if(object.isMesh){
  //     object.castShadow = true;
  //   }
  // })

  // const updatePosition = (treeArray: treeType[], boundary: number) => {
  //   treeArray.forEach((tree, index) => {
  // tree.position.x = [
  //   45, 167, 121, 64, 155, 20, 91, 87, 128, 77, 84, 137, 102, 38, 53, 19,
  //   173, 139, 170, 79,
  // ][index % 20];
  // tree.position.z = [
  //   23, 176, 98, 66, 162, 52, 105, 11, 115, 34, 84, 135, 177, 130, 70, 154,
  //   44, 131, 39, 56,
  // ][index % 20];
  //   });
  //   setTrees(treeArray);
  // };

  // useEffect(() => {
  //   const tempTrees: treeType[] = [];
  //   for (let i = 0; i < count; i++) {
  //     tempTrees.push({ position: { x: 0, z: 0 }, box: 1 });
  //   }
  //   updatePosition(tempTrees, boundary);
  // }, [boundary, count]);

  return (
    <group>
      <object3D scale={[8, 8, 8]} position={[30, 0, 40]} rotation={[0, 0, 0]}>
        <primitive object={model.scene.clone()} />
      </object3D>
      <object3D scale={[8, 8, 8]} position={[110, 0, 43]}>
        <primitive object={model.scene.clone()} />
      </object3D>
      <object3D scale={[8, 8, 8]} position={[20, 0, 140]}>
        <primitive object={model.scene.clone()} />
      </object3D>
      <object3D scale={[8, 8, 8]} position={[130, 0, 20]}>
        <primitive object={model.scene.clone()} />
      </object3D>
      <object3D scale={[8, 8, 8]} position={[-30, 0, 40]}>
        <primitive object={model.scene.clone()} />
      </object3D>
      <object3D scale={[8, 8, 8]} position={[110, 0, -43]}>
        <primitive object={model.scene.clone()} />
      </object3D>
      <object3D scale={[8, 8, 8]} position={[-20, 0, 10]}>
        <primitive object={model.scene.clone()} />
      </object3D>
      <object3D scale={[8, 8, 8]} position={[-130, 0, 20]}>
        <primitive object={model.scene.clone()} />
      </object3D>
      <object3D scale={[8, 8, 8]} position={[-10, 0, 25]}>
        <primitive object={model.scene.clone()} />
      </object3D>
      <object3D scale={[8, 8, 8]} position={[-21, 0, 45]}>
        <primitive object={model.scene.clone()} />
      </object3D>
      <object3D scale={[8, 8, 8]} position={[-53, 0, -65]}>
        <primitive object={model.scene.clone()} />
      </object3D>
      <object3D scale={[8, 8, 8]} position={[-84, 0, 135]}>
        <primitive object={model.scene.clone()} />
      </object3D>
      <object3D scale={[8, 8, 8]} position={[-14, 0, -120]}>
        <primitive object={model.scene.clone()} />
      </object3D>
      <object3D scale={[8, 8, 8]} position={[-86, 0, -43]}>
        <primitive object={model.scene.clone()} />
      </object3D>
      <object3D scale={[8, 8, 8]} position={[-20, 0, 140]}>
        <primitive object={model.scene.clone()} />
      </object3D>
      <object3D scale={[8, 8, 8]} position={[-130, 0, -20]}>
        <primitive object={model.scene.clone()} />
      </object3D>
    </group>
  );
};

export default Trees;
