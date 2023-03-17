import React, { useEffect, useState, useRef } from 'react';
import {
  BakeShadows,
  Center,
  Stars,
  useAnimations,
  useGLTF,
  useHelper,
} from '@react-three/drei';
import { LayoutCamera } from 'framer-motion-3d';
import { degToRad } from 'three/src/math/MathUtils';
import { Box3, DirectionalLightHelper, Vector3 } from 'three';

const CAMERA_POS = [
  { x: 420, y: 300, z: 420 }, //home
  { x: -40, y: 0, z: -54 }, //desktop
  { x: 10, y: 20, z: -80 }, //window
  { x: 27, y: 1.5, z: 1 }, //
  { x: 3.5, y: 0.15, z: 1 }, //
  { x: 300, y: 300, z: 300 }, //
];

const CAMERA_ANGLE = [
  {
    rotateX: -0.6202494859828216,
    rotateY: 0.6830590914963978,
    rotateZ: 0.4235479439953271,
  },
  {
    rotateY: 1.5707963267948966, //desktop view
    rotateX: 0,
    rotateZ: 0,
  },
  {
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
  },
  {
    //flowerPot
    rotateX: -0.8259433780253354,
    rotateY: 0.46920842517941325,
    rotateZ: 0.455953684691092,
  },
];

const CAMERA_LOOK_AT = [
  new Vector3(),
  new Vector3(-110, 0, -54),
  new Vector3(10, 20, -130),
  new Vector3(),
  new Vector3(),
];

function Room({ index }: any) {
  const ref = useRef<any>();
  const lightRef = useRef<any>();
  const room = useGLTF('/room.glb');
  const avatar = useGLTF('/avatar/FZCR_080.glb');
  const { actions } = useAnimations(avatar.animations, ref);

  useHelper(lightRef, DirectionalLightHelper);
  const [height, setHeight] = useState(0);
  const [avatarHeight, setAvatarHeight] = useState(0);
  const [animationName, setAnimationName] = useState('idle_01');
  useEffect(() => {
    const bbox = new Box3().setFromObject(room.scene);
    setHeight(bbox.getSize(new Vector3()).y);
  }, [room]);

  useEffect(() => {
    actions[animationName]?.reset().fadeIn(0.5).play();
  }, [animationName, actions]);

  useEffect(() => {
    const bbox = new Box3().setFromObject(avatar.scene);
    setAvatarHeight(bbox.getSize(new Vector3()).y);
  }, [avatar]);

  useEffect(() => {
    const time = animationName === 'idle_01' ? 4000 : 1400;
    const id = setInterval(() => {
      if (animationName === 'idle_01') {
        actions['idle_01']?.fadeOut(0.5);
        setAnimationName('hi');
      } else {
        actions['hi']?.fadeOut(0.5);
        setAnimationName('idle_01');
      }
    }, time);
    return () => clearInterval(id);
  }, [animationName]);

  // useFrame(({ camera }) => {
  //   camera.lookAt(CAMERA_LOOK_AT[index]);
  //   console.log('ROTATION', camera.rotation);
  // });

  return (
    <>
      <Stars radius={300} factor={15} depth={100} />
      <LayoutCamera
        animate={{
          ...CAMERA_POS[index],
          ...CAMERA_ANGLE[index],
        }}
      />
      <color attach="background" args={['#252530']} />
      <ambientLight intensity={0.1} />
      <spotLight
        intensity={0.6}
        position={[100, 100, 100]}
        penumbra={0.5}
        shadow-mapSize={[64, 64]}
        shadow-bias={-0.000001}
      />
      <directionalLight
        ref={lightRef}
        position={[100, 100, 250]}
        intensity={0.8}
      />

      <Center position={[0, 0, 0]}>
        <group>
          <primitive object={room.scene} />
        </group>
      </Center>

      <Center
        top
        scale={100}
        position={[0, -height / 2 + avatarHeight * 25, 0]}
        rotation={[0, degToRad(-135), 0]}
      >
        <group ref={ref}>
          <primitive object={avatar.scene} />
        </group>
      </Center>
      <BakeShadows />
    </>
  );
}

export default Room;
