import React from 'react';
import { useRouter } from 'next/router';
import { Canvas } from '@react-three/fiber';
import UserAvatar from '@components/profile/UserAvatar';
import Room from '@components/profile/Room';
import { MotionCanvas } from 'framer-motion-3d';
import { MotionConfig } from 'framer-motion';

function UserProfile() {
  const router = useRouter();
  const { userId } = router.query;
  return (
    <div
      style={{
        background: '#AEC5FF',
        width: '100vw',
        height: '100vh',
      }}
    >
      <button
        onClick={() => console.log('hello')}
        style={{
          position: 'absolute',
          zIndex: 9,
        }}
      >
        테스트버튼
      </button>
      <MotionConfig transition={{ duration: 2 }}>
        <MotionCanvas
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <Room />
        </MotionCanvas>
      </MotionConfig>

      <Canvas
        style={{
          width: '30%',
          height: '30vh',
          position: 'absolute',
          bottom: '5vh',
          left: '0vw',
        }}
      >
        <UserAvatar />
      </Canvas>
    </div>
  );
}

export default UserProfile;
