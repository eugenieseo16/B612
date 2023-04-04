import { useLoader } from '@react-three/fiber';
import React, { useRef, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import Modal from '@mui/material/Modal';
import { Html } from '@react-three/drei';
import BaobabModal from './BaobabModal';

const Baobab = () => {
  const model = useLoader(GLTFLoader, './baobab/baobab.glb');
  const objectRef = useRef<THREE.Object3D>(null);

  const [openBaobab, setOpenBaobab] = useState(false);
  const handleOpenBaobab = () => setOpenBaobab(true);
  const handleCloseBaobab = () => setOpenBaobab(false);

  return (
    <>
      <object3D ref={objectRef}>
        <primitive
          object={model.scene}
          position={[70, 0, -5]}
          scale={[1.8, 1.5, 1.5]}
          onClick={handleOpenBaobab}
        />
      </object3D>
      <Html>
        {openBaobab && (
          <Modal open={openBaobab} onClose={handleCloseBaobab}>
            <BaobabModal />
          </Modal>
        )}
      </Html>
    </>
  );
};

export default Baobab;

// https://jstris.jezevec10.com/?langSwitch=ko
// scale={[0.5, 1, 0.5]}
// rotation={[0, Math.PI / 2, 0]}
//  position={[-20, 0, -45]
