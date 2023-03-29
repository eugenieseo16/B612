/* eslint-disable prefer-const */
import React, { useEffect, useRef, useState } from 'react';
import { Html, useAnimations, useGLTF } from '@react-three/drei';
import { UseInput } from '@components/square/UseInput';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import CertificateModal from '@components/Planet/CertificateModal';
import { Modal } from '@mui/material';

// import Modal from '@mui/material/Modal';
// import { CertificateModal } from '@components/Planet/index';

// eslint-disable-next-line prefer-const
let walkDirection = new THREE.Vector3();
let rotateAngle = new THREE.Vector3(0, 1, 0);
let rotateQuaternion = new THREE.Quaternion();
let cameraTarget = new THREE.Vector3();

type DirectionOffsetProps = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
};

const directionOffset = ({
  forward,
  backward,
  left,
  right,
}: DirectionOffsetProps) => {
  var directionOffset = 0; // w
  if (forward) {
    if (left) {
      directionOffset = Math.PI / 4; // w+a
    } else if (right) {
      directionOffset = -Math.PI / 4; // w+d
    }
  } else if (backward) {
    if (left) {
      directionOffset = Math.PI / 4 + Math.PI / 2; // s+a
    } else if (right) {
      directionOffset = Math.PI / 4 - Math.PI / 2; // s+d
    } else {
      directionOffset = Math.PI; // s
    }
  } else if (left) {
    directionOffset = Math.PI / 2; // a
  } else if (right) {
    directionOffset = -Math.PI / 2; // d
  }

  return directionOffset;
};

const AvatarFinn = () => {
  const { forward, backward, left, right, jump, shift } = UseInput();
  const model = useGLTF('./avatar_finn/avatar_finn.glb');
  let pos = [0, 0, 0];

  const { actions } = useAnimations(model.animations, model.scene);
  // 아바타 크기조절
  model.scene.scale.set(1.2, 1.2, 1.2);
  // 그림자
  model.scene.traverse(object => {
    if (object instanceof THREE.Mesh) {
      object.castShadow = true;
    }
  });

  const currentAction = useRef('');
  // const controlsRef = useRef<typeof OrbitControls>();
  const camera = useThree(state => state.camera);

  const updateCameraTarget = (moveX: number, moveZ: number) => {
    // move camera
    camera.position.x += moveX;
    camera.position.z += moveZ;

    // update camera target
    cameraTarget.x = model.scene.position.x;
    cameraTarget.y = model.scene.position.y + 2;
    cameraTarget.z = model.scene.position.z;
    // if (controlsRef.current) controlsRef.current.target = cameraTarget;
  };

  useEffect(() => {
    let action = '';

    if (forward || backward || left || right) {
      action = 'walking';
      if (shift) {
        action = 'running';
      }
    } else if (jump) {
      action = 'jumping';
    } else {
      action = 'Action';
    }

    if (currentAction.current != action) {
      const NextActionToPlay = actions[action];
      const current = actions[currentAction.current];
      current?.fadeOut(0.2);
      NextActionToPlay?.reset().fadeIn(0.2).play();
      currentAction.current = action;
    }
  }, [forward, backward, left, right, jump, shift]);

  // 줌인 줌아웃 설정을 적용해보자
  const MIN_ZOOM = 0.5;
  const MAX_ZOOM = 15;

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      const deltaY = event.deltaY;
      let zoomAmount = deltaY > 0 ? 0.5 : 1.5; // zoom in 또는 zoom out
      const currentZoom = camera.zoom * zoomAmount;
      if (currentZoom < MIN_ZOOM) {
        zoomAmount = MIN_ZOOM / camera.zoom;
      } else if (currentZoom > MAX_ZOOM) {
        zoomAmount = MAX_ZOOM / camera.zoom;
      }
      camera.zoom *= zoomAmount;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('wheel', handleWheel);
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [camera]);

  // 캐릭터가 갈수있는 영역좌표 설정하기
  const isInAllowedArea = (x: number, z: number): boolean => {
    if (x < -8 && x >= -23) {
      if ((z >= 16 && z <= 40) || (z >= -48 && z <= -16)) {
        return true;
      }
    } else if (x >= -8 && x <= 26) {
      if (z >= -23 && z <= 40) {
        return true;
      }
    } else if (x > 26 && x <= 48) {
      if (z >= -48 && z <= -17) {
        return true;
      }
    } else if (x > 48 && x < 106) {
      if (z >= -48 && z <= 40) {
        return true;
      }
    }
    return false;
  };

  // modal 영역 설정하기 (테트리스)
  const isTetrisModalArea = (x: number, z: number): boolean => {
    if (x <= -18 && x >= -23 && z >= -48 && z <= -45) {
      return true;
    } else if (x <= 32 && x >= 28 && z >= -42 && z <= -38) {
      return true;
    } else if (x <= -18 && x >= -23 && z >= 16 && z <= 20) {
      return true;
    }
    return false;
  };

  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    if (isTetrisModalArea(model.scene.position.x, model.scene.position.z)) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [model.scene.position.x, model.scene.position.z]);

  useFrame((state, delta) => {
    if (
      currentAction.current == 'running' ||
      currentAction.current == 'walking'
    ) {
      // calculate towards camera direction
      let angleYCameraDirection = Math.atan2(
        camera.position.x - model.scene.position.x,
        camera.position.z - model.scene.position.z
      );

      // diagonal movement angle offset
      let newDirectionOffset = directionOffset({
        forward,
        backward,
        left,
        right,
      });

      // rotate model
      rotateQuaternion.setFromAxisAngle(
        rotateAngle,
        angleYCameraDirection + newDirectionOffset
      );
      model.scene.quaternion.rotateTowards(rotateQuaternion, 0.2);

      // calculate direction
      camera.getWorldDirection(walkDirection);
      walkDirection.y = 0;
      walkDirection.normalize();
      walkDirection.applyAxisAngle(rotateAngle, newDirectionOffset);

      //run/walk velocity
      const velocity = currentAction.current == 'running' ? 10 : 5;

      // move model & camera
      const moveX = walkDirection.x * velocity * delta;
      const moveZ = walkDirection.z * velocity * delta;

      // Check if the new position is within the allowed area
      const newPosition = model.scene.position.clone();
      newPosition.x += moveX;
      newPosition.z += moveZ;
      if (isInAllowedArea(newPosition.x, newPosition.z)) {
        model.scene.position.x += moveX;
        model.scene.position.z += moveZ;
        pos = [model.scene.position.x, 0, model.scene.position.z];
        updateCameraTarget(moveX, moveZ);
      }
    }
  });
  console.log(cameraTarget);

  return (
    <>
      {/* <PerspectiveCamera position={} ref={ref}/> */}
      {/* <OrbitControls
        target={[
          model.scene.position.x,
          model.scene.position.y,
          model.scene.position.z,
        ]}
        enableDamping={true}
      /> */}
      <primitive object={model.scene} />;
      <Html>
        {showModal && (
          <Modal open={showModal} onClose={handleClose}>
            <CertificateModal />
          </Modal>
        )}
      </Html>
      {/* {showModal && (
        <Modal open={showModal} onClose={handleClose}>
          <CertificateModal />
        </Modal>
      )} */}
    </>
  );
};

export default AvatarFinn;

//
