import React, { useEffect, useRef, useState } from 'react';
import {
  Center,
  Environment,
  Lightformer,
  OrbitControls,
  Stars,
  useGLTF,
} from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { LayoutCamera } from 'framer-motion-3d';
import { degToRad } from 'three/src/math/MathUtils';
import { Vector3, DoubleSide, Box3 } from 'three';

const CAMERA_POS = [
  { x: 6, y: 3, z: 8 },
  { x: 0, y: 2, z: 3 }, //desktop
  { x: 2.7, y: 1.5, z: 1 }, //globe
  { x: 3.5, y: 0.15, z: 1 }, //flower
];
const CAMERA_ANGLE = [
  {
    rotateX: -0.358,
    rotateY: 0.612,
    rotateZ: 0.212,
  },
  {
    rotateX: -0.4491756441212029,
    rotateY: -0.0039304318172268,
    rotateZ: -0.0018946133233827865,
  },
  {
    rotateX: -0.6878955697533992,
    rotateY: 0.5546003102322192,
    rotateZ: 0.40842930922314513,
  },
  {
    //flowerPot
    rotateX: -0.8259433780253354,
    rotateY: 0.46920842517941325,
    rotateZ: 0.455953684691092,
  },
];

function Room({ index }: any) {
  // const [index, setIndex] = useRecoilState(roomIndexAtom);
  // const [index, setIndex] = useState(0);

  const [deskHeight, setDeskHeight] = useState(0);
  const [desktopHeight, setDesktopHeight] = useState(0);
  const [globeHeight, setGlobeHeight] = useState(0);
  const [flowerpotHeight, setFlowerpotHeight] = useState(0);

  const desk = useGLTF('/desk/scene.gltf');
  const desktop = useGLTF('/desktop/scene.gltf');
  const globe = useGLTF('/globe/scene.gltf');
  const flowerPot = useGLTF('/flower_pot/scene.gltf');

  useEffect(() => {
    const bbox = new Box3().setFromObject(desk.scene);
    setDeskHeight(bbox.getSize(new Vector3()).y);
  }, [desk]);
  useEffect(() => {
    const bbox = new Box3().setFromObject(desktop.scene);
    setDesktopHeight(bbox.getSize(new Vector3()).y);
  }, [desktop]);
  useEffect(() => {
    const bbox = new Box3().setFromObject(globe.scene);
    setGlobeHeight(bbox.getSize(new Vector3()).y);
  }, [globe]);
  useEffect(() => {
    const bbox = new Box3().setFromObject(flowerPot.scene);
    setFlowerpotHeight(bbox.getSize(new Vector3()).y);
  }, [flowerPot]);

  return (
    <>
      <ambientLight />
      <OrbitControls />
      <LayoutCamera
        animate={{
          ...CAMERA_POS[index],
          ...CAMERA_ANGLE[index],
        }}
      />
      <mesh position={[0, -2, 0]} rotation={[degToRad(90), 0, 0]}>
        <meshStandardMaterial side={DoubleSide} />
        <planeGeometry args={[10, 20]} />
      </mesh>

      <Center
        position={[0, deskHeight / 2 - 2, 0]}
        rotation={[0, degToRad(90), 0]}
      >
        <group>
          <primitive object={desk.scene} scale={2} />
        </group>
      </Center>

      <Center position={[0, desktopHeight / 2 - 2 + deskHeight, 0]}>
        <group>
          <primitive object={desktop.scene} scale={0.5} />
        </group>
      </Center>

      <Center position={[1, globeHeight / 2 - 2 + deskHeight, 0]}>
        <group>
          <primitive object={globe.scene} scale={0.02} />
        </group>
      </Center>
      <Center position={[3, flowerpotHeight / 2 - 2, 1]}>
        <group>
          <primitive object={flowerPot.scene} scale={0.5} />
        </group>
      </Center>
    </>
  );
}

export default Room;
