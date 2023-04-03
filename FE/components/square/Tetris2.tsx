import { useAnimations } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import Modal from '@mui/material/Modal';
import { Html } from '@react-three/drei';
import TetrisModal from './TetrisModal';

const Tetris2 = () => {
  const model = useLoader(GLTFLoader, './tetris/tetris_animation.glb');
  const { actions } = useAnimations(model.animations, model.scene);
  const objectRef = useRef<THREE.Object3D>(null);

  const [openTetris, setOpenTetris] = useState(false);
  const handleOpenTetris = () => setOpenTetris(true);
  const handleCloseTetris = () => setOpenTetris(false);

  useEffect(() => {
    const action = actions['Take 001'];
    action?.play();
  }, [actions]);

  return (
    <>
      <object3D ref={objectRef} scale={[40, 40, 40]} position={[35, 0, -45]}>
        <primitive object={model.scene} onClick={handleOpenTetris} />
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

export default Tetris2;

// https://jstris.jezevec10.com/?langSwitch=ko
