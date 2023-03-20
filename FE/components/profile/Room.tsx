import React, { useEffect, useState } from 'react';
import { Center, Stars, useGLTF } from '@react-three/drei';
import { Box3, Vector3 } from 'three';
import Avatar from './Avatar';

function Room() {
  const [height, setHeight] = useState(0);
  const room = useGLTF('/room.glb');

  useEffect(() => {
    const bbox = new Box3().setFromObject(room.scene);
    setHeight(bbox.getSize(new Vector3()).y);
  }, [room]);

  return (
    <>
      <Stars radius={300} factor={15} depth={100} />
      <Center position={[0, 0, 0]}>
        <group>
          <primitive object={room.scene} />
        </group>
      </Center>
      <Avatar y={height} />
    </>
  );
}

export default Room;
