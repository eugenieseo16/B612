import React, { useEffect, useRef, useState } from 'react';
import { OrbitControls, useGLTF } from '@react-three/drei';
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

function Room({ index, setIndex }: any) {
  // const [index, setIndex] = useRecoilState(roomIndexAtom);
  // const [index, setIndex] = useState(0);

  const [deskHeight, setDeskHeight] = useState(0);
  const desk = useGLTF('/desk/scene.gltf');
  const desktop = useGLTF('/desktop/scene.gltf');
  const globe = useGLTF('/globe/scene.gltf');
  const flowerPot = useGLTF('/flower_pot/scene.gltf');
  useEffect(() => {
    var mroot = flowerPot.scene;
    var bbox = new Box3().setFromObject(mroot);
    var cent = bbox.getCenter(new Vector3());
    var size = bbox.getSize(new Vector3());
    var maxAxis = Math.max(size.x, size.y, size.z);
    mroot.scale.multiplyScalar(1.0 / maxAxis);
    bbox.setFromObject(mroot);
    bbox.getCenter(cent);
    bbox.getSize(size);
    //Reposition to 0,halfY,0
    mroot.position.copy(cent).multiplyScalar(-1);
    mroot.position.y -= 2;
    mroot.position.y += size.y * 0.5;
    mroot.position.x += 2.5;
  }, [flowerPot]);

  useEffect(() => {
    var mroot = desk.scene;
    var bbox = new Box3().setFromObject(mroot);
    var cent = bbox.getCenter(new Vector3());
    var size = bbox.getSize(new Vector3());
    var maxAxis = Math.max(size.x, size.y, size.z);
    mroot.scale.multiplyScalar(4.0 / maxAxis);
    bbox.setFromObject(mroot);
    bbox.getCenter(cent);
    bbox.getSize(size);
    //Reposition to 0,halfY,0
    mroot.position.copy(cent).multiplyScalar(-1);
    mroot.position.y += size.y * 0.5;

    mroot.position.y -= 2;
    setDeskHeight(size.y);
  }, [desk]);

  useEffect(() => {
    if (deskHeight === 0) return;
    var mroot = desktop.scene;
    var bbox = new Box3().setFromObject(mroot);
    var cent = bbox.getCenter(new Vector3());
    var size = bbox.getSize(new Vector3());
    var maxAxis = Math.max(size.x, size.y, size.z);
    mroot.scale.multiplyScalar(2.0 / maxAxis);
    bbox.setFromObject(mroot);
    bbox.getCenter(cent);
    bbox.getSize(size);
    //Reposition to 0,halfY,0
    mroot.position.copy(cent).multiplyScalar(-1);
    // mroot.position.y -= size.y * 0.5;
    mroot.position.y += size.y * 0.5;

    mroot.position.y += deskHeight - 2;
  }, [deskHeight, desktop]);

  useEffect(() => {
    if (deskHeight === 0) return;
    var mroot = globe.scene;
    var bbox = new Box3().setFromObject(mroot);
    var cent = bbox.getCenter(new Vector3());
    var size = bbox.getSize(new Vector3());
    var maxAxis = Math.max(size.x, size.y, size.z);
    mroot.scale.multiplyScalar(1.0 / maxAxis);
    bbox.setFromObject(mroot);
    bbox.getCenter(cent);
    bbox.getSize(size);
    //Reposition to 0,halfY,0
    mroot.position.copy(cent).multiplyScalar(-1);
    // mroot.position.y -= size.y * 0.5;
    mroot.position.y += size.y * 0.5;

    mroot.position.y -= 2;
    mroot.position.y += deskHeight;
    mroot.position.z -= 0.5;
    mroot.position.x += 1.5;
  }, [deskHeight, globe]);

  return (
    <>
      <ambientLight />
      {/* <OrbitControls /> */}
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
      <group
        position={[0, -1, 0]}
        rotation={[0, degToRad(90), 0]}
        onClick={() => setIndex(0)}
      >
        <primitive object={desk.scene} scale={2} />
      </group>
      <group onClick={() => setIndex(1)}>
        <primitive object={desktop.scene} scale={0.5} />
      </group>
      <group onClick={() => setIndex(2)}>
        <primitive object={globe.scene} scale={0.018} />
      </group>
      <group onClick={() => setIndex(3)}>
        <primitive object={flowerPot.scene} scale={0.5} />
      </group>
    </>
  );
}

export default Room;
