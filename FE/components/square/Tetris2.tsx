import { useAnimations } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import Modal from '@mui/material/Modal';
import { CertificateModal } from '@components/Planet/index';
import { Html } from '@react-three/drei';

const Tetris2 = () => {
  const model = useLoader(GLTFLoader, './tetris/tetris_animation.glb');
  const { actions } = useAnimations(model.animations, model.scene);
  const objectRef = useRef<THREE.Object3D>(null);

  const [openCertificate, setOpenCertificate] = useState(false);
  const handleOpenCertificate = () => setOpenCertificate(true);
  const handleCloseCertificate = () => setOpenCertificate(false);

  useEffect(() => {
    const action = actions['Take 001'];
    action?.play();
  }, [actions]);

  return (
    <>
      <object3D ref={objectRef} scale={[40, 40, 40]} position={[35, 0, -45]}>
        <primitive object={model.scene} onClick={handleOpenCertificate} />
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
};

export default Tetris2;

// https://jstris.jezevec10.com/?langSwitch=ko
