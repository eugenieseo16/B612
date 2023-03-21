import React from 'react';
import { MotionCanvas } from 'framer-motion-3d';
import { MotionConfig } from 'framer-motion';
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';
import roomIndexAtom from 'store/profile/roomIndexAtom';
import { Modal, Fade } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import styled from '@emotion/styled';
import FlowersModal from '@components/common/FlowersModal';

import { Room, MyCamera, RoomNav, Planets } from '@components/profile/index';
import ProfileModal from '@components/profile/ProfileModal';
import { useRouter } from 'next/router';

function UserProfile() {
  const [roomIndex, setRoomIndex] = useRecoilState(roomIndexAtom);
  const router = useRouter();
  // useEffect(() => {
  //   if (!Boolean(user)) router.replace('/');
  // }, [user, router]);

  return (
    <div
      style={{
        width: '100vw',
        height: 'calc(100vh - 5rem)',
        background: '#252530',
      }}
    >
      <RoomNav />
      <MotionConfig transition={{ duration: 0.8, ease: 'easeInOut' }}>
        <MotionCanvas
          style={{
            width: 'calc(100% - 20rem)',
            minWidth: '70%',
            height: '100%',
          }}
        >
          <ambientLight intensity={0.1} />
          <directionalLight position={[100, 100, 250]} intensity={1.1} />
          <color attach="background" args={['#252530']} />
          <MyCamera index={roomIndex} />
          <Planets index={roomIndex} />
          <Room />
        </MotionCanvas>
      </MotionConfig>
      <Canvas style={{ display: 'none' }}>
        <mesh></mesh>
      </Canvas>
      <Modal
        sx={{
          minWidth: '70%',
          width: 'calc(100% - 20rem)',
          marginTop: '5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflowY: roomIndex === 1 ? 'scroll' : 'hidden',
        }}
        closeAfterTransition
        hideBackdrop
        open={
          roomIndex > 0 && roomIndex !== 2 && router.pathname === '/profile'
        }
        onClose={() => setRoomIndex(0)}
        onClick={() => setRoomIndex(0)}
      >
        <>
          <MyFade in={roomIndex === 3}>
            <FlowersModal />
          </MyFade>
          <MyFade in={roomIndex === 1}>
            <ProfileModal />
          </MyFade>
        </>
      </Modal>
    </div>
  );
}

export default UserProfile;

const MyFade = ({ children, ...rest }: any) => {
  const StyledFade = styled(Fade)`
    position: absolute;
    top: 2.5%;
    left: 2.5%;
    width: 100%;
    height: 100%;
  `;

  return (
    <StyledFade
      {...rest}
      timeout={500}
      onClick={e => e.stopPropagation()}
      style={{ transitionDelay: 1000 }}
    >
      <div style={{ width: '95%', height: '95%' }}>{children}</div>
    </StyledFade>
  );
};
