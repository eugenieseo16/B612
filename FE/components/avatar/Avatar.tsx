/* eslint-disable prefer-const */
import React, { useEffect, useRef, useState } from 'react';
import { Html, useAnimations, useGLTF } from '@react-three/drei';
import { UseInput } from '@components/square/UseInput';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useRecoilState, useRecoilValue } from 'recoil';
import { positionAtom } from 'store/square/positionAtom';
import userAtom from 'store/userAtom';
// import { AvatarPosition } from '@components/avatar/AvatarPosition';

import { Modal } from '@mui/material';
import {
  TetrisModal,
  BaobabModal,
  AppleGameModal,
} from '@components/square/index';
import {
  isInAllowedArea,
  directionOffset,
  isTetrisModalArea,
  isAppleModalArea,
  isBaobabModalArea,
  AvatarCharacter,
} from '@components/avatar/index';

// eslint-disable-next-line prefer-const
//  걷는 방향을 저장하는 변수
let walkDirection = new THREE.Vector3();
// 회전 각도를 저장하는 변수
let rotateAngle = new THREE.Vector3(0, 1, 0);
// Quaternion 회전 값을 저장하는 변수
let rotateQuaternion = new THREE.Quaternion();
// 카메라의 타겟을 저장하는 변수
let cameraTarget = new THREE.Vector3();

const Avatar = () => {
  const [avatarPosition, setAvatarPosition] = useRecoilState(positionAtom);
  const { forward, backward, left, right, shift } = UseInput();
  const user = useRecoilValue(userAtom);
  const memberCharacterIndex = user?.memberCharacter ?? 0;
  const model = useGLTF(AvatarCharacter[memberCharacterIndex]);
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
      // } else if (jump) {
      //   action = 'jumping';
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
  }, [forward, backward, left, right, shift]);

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

  const [showTetrisModal, setShowTetrisModal] = useState(false);
  const handleTetrisOpen = () => setShowTetrisModal(true);
  const handleTetrisClose = () => setShowTetrisModal(false);
  const [showAppleModal, setShowAppleModal] = useState(false);
  const handleAppleOpen = () => setShowAppleModal(true);
  const handleAppleClose = () => setShowAppleModal(false);
  const [showBaobabModal, setShowBaobabModal] = useState(false);
  const handleBaobabOpen = () => setShowBaobabModal(true);
  const handleBaobabClose = () => setShowBaobabModal(false);

  useEffect(() => {
    if (isTetrisModalArea(model.scene.position.x, model.scene.position.z)) {
      setShowTetrisModal(true);
    } else {
      setShowTetrisModal(false);
    }
  }, [model.scene.position.x, model.scene.position.z]);

  useEffect(() => {
    if (isAppleModalArea(model.scene.position.x, model.scene.position.z)) {
      setShowAppleModal(true);
    } else {
      setShowAppleModal(false);
    }
  }, [model.scene.position.x, model.scene.position.z]);

  useEffect(() => {
    if (isBaobabModalArea(model.scene.position.x, model.scene.position.z)) {
      setShowBaobabModal(true);
    } else {
      setShowBaobabModal(false);
    }
  }, [model.scene.position.x, model.scene.position.z]);

  useFrame((state, delta) => {
    if (
      currentAction.current == 'running' ||
      currentAction.current == 'walking'
    ) {
      // calculate towards camera direction
      let angleYCameraDirection = Math.atan2(
        camera.position.x - avatarPosition.x,
        camera.position.z - avatarPosition.z
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
      const velocity = currentAction.current == 'running' ? 8 : 4;

      // move model & camera
      const moveX = walkDirection.x * velocity * delta;
      const moveZ = walkDirection.z * velocity * delta;

      // Check if the new position is within the allowed area
      const newPosition = {
        x: avatarPosition.x + moveX,
        z: avatarPosition.z + moveZ,
      };
      if (isInAllowedArea(newPosition.x, newPosition.z)) {
        setAvatarPosition(newPosition);
        pos = [avatarPosition.x, 0, avatarPosition.z];
        updateCameraTarget(moveX, moveZ);
      }
    }
  });
  console.log(cameraTarget);

  useEffect(() => {
    model.scene.position.x = avatarPosition.x;
    model.scene.position.z = avatarPosition.z;
  }, [avatarPosition.x, avatarPosition.z]);

  return (
    <>
      <primitive object={model.scene} />;{/* <AvatarPosition /> */}
      <Html>
        {showTetrisModal && (
          <Modal open={showTetrisModal} onClose={handleTetrisClose}>
            <TetrisModal />
          </Modal>
        )}
      </Html>
      <Html>
        {showAppleModal && (
          <Modal open={showAppleModal} onClose={handleAppleClose}>
            <AppleGameModal />
          </Modal>
        )}
      </Html>
      <Html>
        {showBaobabModal && (
          <Modal open={showBaobabModal} onClose={handleBaobabClose}>
            <BaobabModal />
          </Modal>
        )}
      </Html>
      {/* <AvatarPosition /> */}
    </>
  );
};

export default Avatar;

// 3D 모델링을 담당하는 AvatarModel 컴포넌트,
// 애니메이션을 담당하는 AvatarAnimation 컴포넌트,
// 사용자 입력 처리를 담당하는 AvatarInput 컴포넌트
