import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { Object3D } from 'three';

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh;
    Object_3: THREE.Mesh;
    Object_4: THREE.Mesh;
    Object_5: THREE.Mesh;
  };
  materials: {
    Material__47: THREE.MeshStandardMaterial;
    Material__48: THREE.MeshStandardMaterial;
    Material__49: THREE.MeshStandardMaterial;
    Material__50: THREE.MeshStandardMaterial;
  };
};

export function DaisyModel(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/daisy/daisy.glb') as GLTFResult;
  return (
    <object3D scale={[0.05, 0.05, 0.05]} position={[0, 1, 0]}>
      <group {...props} dispose={null}>
        <group position={[0, -25.89, 28.93]} rotation={[-Math.PI, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_2.geometry}
            material={materials.Material__47}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_3.geometry}
            material={materials.Material__48}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_4.geometry}
            material={materials.Material__49}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_5.geometry}
            material={materials.Material__50}
          />
        </group>
      </group>
    </object3D>
  );
}

useGLTF.preload('/daisy/daisy.glb');
