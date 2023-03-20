import { Center, useAnimations, useGLTF } from '@react-three/drei';
import { degToRad } from 'three/src/math/MathUtils';
import { useState, useRef, useEffect } from 'react';
import { Box3, Group, Vector3 } from 'three';

function Avatar({ y }: { y: number }) {
  const [avatarHeight, setAvatarHeight] = useState(0);
  const ref = useRef<Group | null>(null);
  const avatar = useGLTF('/avatar/FZCR_080.glb');
  const { actions } = useAnimations(avatar.animations, ref);
  const [animationName, setAnimationName] = useState('idle_01');

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
  }, [animationName, actions]);

  return (
    <group
      ref={ref}
      scale={100}
      position={[0, -y / 2 + avatarHeight / 2, 0]}
      rotation={[0, degToRad(-135), 0]}
    >
      <primitive object={avatar.scene} />
    </group>
  );
}
export default Avatar;
