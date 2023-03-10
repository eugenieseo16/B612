import React, { useEffect, useRef, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

function UserAvatar() {
  const group = useRef<any>();
  const [index, setIndex] = useState(0);
  const { scene, animations } = useGLTF('/dinosaur/scene.gltf');
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    actions[names[index]].reset().fadeIn(0.5).play();
    return () => {
      actions[names[index]].fadeOut(0.5);
    };
  }, [index]);

  const changeAnim = () => {
    console.log('HHH');
    setIndex(index < names.length - 1 ? index + 1 : 0);
  };
  console.log(names);

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <group position={[0, -2, 0]} ref={group} onClick={changeAnim}>
        <primitive object={scene} scale={1} />
      </group>
    </>
  );
}

export default UserAvatar;
