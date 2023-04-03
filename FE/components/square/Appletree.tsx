import * as THREE from 'three';
import React, { useRef, useState } from 'react';
import { Html, useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { Object3D } from 'three';
import { Modal } from '@mui/material';
import { CertificateModal } from '@components/Planet';

type GLTFResult = GLTF & {
  nodes: {
    AppleTree_MaterialAppleTree001_0: THREE.Mesh;
    AppleTree_MaterialApple001_0: THREE.Mesh;
  };
  materials: {
    ['MaterialAppleTree.001']: THREE.MeshStandardMaterial;
    ['MaterialApple.001']: THREE.MeshStandardMaterial;
  };
};

export function AppleTreeModel(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(
    '/apple_tree/apple_tree.glb'
  ) as GLTFResult;
  const objectRef = useRef<THREE.Object3D>(null);

  const [openCertificate, setOpenCertificate] = useState(false);
  const handleOpenCertificate = () => setOpenCertificate(true);
  const handleCloseCertificate = () => setOpenCertificate(false);

  return (
    <>
      <object3D ref={objectRef} onClick={handleOpenCertificate}>
        <group {...props} dispose={null}>
          <group
            position={[14.38, 0, -1.6]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={0.01}
          >
            <group rotation={[Math.PI / 2, 0, 0]}>
              <group
                position={[407.62, 590.39, -100.55]}
                rotation={[1.89, 0.88, -2.05]}
                scale={100}
              >
                <group rotation={[Math.PI / 2, 0, 0]} />
              </group>
              <group
                position={[1082.42, 315.84, 488.34]}
                rotation={[Math.PI, 0.39, 3.04]}
                scale={100}
              />
              <group rotation={[-Math.PI / 2, 0, -0.36]} scale={90.44}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.AppleTree_MaterialAppleTree001_0.geometry}
                  material={materials['MaterialAppleTree.001']}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.AppleTree_MaterialApple001_0.geometry}
                  material={materials['MaterialApple.001']}
                />
              </group>
            </group>
          </group>
        </group>
      </object3D>
      <Html>
        {openCertificate && (
          <Modal open={openCertificate} onClose={handleCloseCertificate}>
            <CertificateModal />
          </Modal>
        )}
      </Html>
    </>
  );
}

useGLTF.preload('/apple_tree/apple_tree.glb');
