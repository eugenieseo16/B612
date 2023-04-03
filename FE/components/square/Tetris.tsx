import { useLoader } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import Modal from '@mui/material/Modal';
import TetrisModal from './TetrisModal';
import { Html } from '@react-three/drei';

const Tetris = () => {
  const model = useLoader(GLTFLoader, './tetris/tetris.glb');
  const objectRef = useRef<THREE.Object3D>(null);

  const [openTetris, setOpenTetris] = useState(false);
  const handleOpenTetris = () => setOpenTetris(true);
  const handleCloseTetris = () => setOpenTetris(false);

  return (
    <>
      <object3D ref={objectRef}>
        <primitive
          object={model.scene}
          position={[-20, 0, -45]}
          onClick={handleOpenTetris}
        />
      </object3D>
      <Html>
        {openTetris && (
          <Modal open={openTetris} onClose={handleCloseTetris}>
            <TetrisModal />
          </Modal>
        )}
      </Html>
    </>
  );
};

export default Tetris;

// https://jstris.jezevec10.com/?langSwitch=ko
// scale={[0.5, 1, 0.5]}
// rotation={[0, Math.PI / 2, 0]}
//  position={[-20, 0, -45]
