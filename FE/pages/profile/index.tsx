import React from 'react';
import { MotionCanvas } from 'framer-motion-3d';
import { motion, MotionConfig } from 'framer-motion';
import {
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import userAtom from 'store/userAtom';
import roomIndexAtom from 'store/profile/roomIndexAtom';
import { Modal } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import styled from '@emotion/styled';
import FlowersModal from '@components/common/FlowersModal';

import { Room, MyCamera, RoomNav, Planets } from '@components/profile/index';
import ProfileModal from '@components/profile/ProfileModal';
import { useRouter } from 'next/router';
import { useMobile } from '@hooks/useMobile';
import Garden from '@components/profile/Garden';

function UserProfile() {
  const [roomIndex, setRoomIndex] = useRecoilState(roomIndexAtom);
  const router = useRouter();
  const user = useRecoilValue(userAtom);
  const isMobile = useMobile();
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();
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
      <button
        onClick={() => setRoomIndex(0)}
        style={{
          position: 'absolute',
          top: '5rem',
          left: 0,
          zIndex: 9,
          display: roomIndex === 0 ? 'none' : 'block',
        }}
      >
        뒤로
      </button>
      <RoomNav />
      <MotionConfig transition={{ duration: 0.8, ease: 'easeInOut' }}>
        <MotionCanvas
          style={{
            width: 'calc(100% - 20rem)',
            minWidth: '70%',
            height: '100%',
          }}
        >
          <RecoilBridge>
            {/* <ambientLight intensity={0.1} /> */}
            <MyCamera />
            <Planets />
            <Room />
            <Garden />
          </RecoilBridge>
        </MotionCanvas>
      </MotionConfig>
      <Canvas style={{ display: 'none' }}>
        <mesh></mesh>
      </Canvas>
      <Modal
        sx={{
          minWidth: '70%',
          width: isMobile ? '100%' : 'calc(100% - 20rem)',
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
          {roomIndex === 1 ? (
            <MotionContainer>
              <ProfileModal user={user} />
            </MotionContainer>
          ) : roomIndex === 2 ? (
            'nullnullnull'
          ) : roomIndex === 3 ? (
            <MotionContainer>
              <FlowersModal user={user} />
            </MotionContainer>
          ) : null}
        </>
      </Modal>
    </div>
  );
}

export default UserProfile;

// eslint-disable-next-line
const MotionContainer = ({ children, ...rest }: any) => {
  const StyledFade = styled(motion.div)`
    position: absolute;
    top: 2.5%;
    left: 2.5%;
    width: 95%;
    height: 95%;
  `;

  return (
    <StyledFade
      {...rest}
      onClick={e => e.stopPropagation()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.2 }}
    >
      <div style={{ width: '100%', height: '100%' }}>{children}</div>
    </StyledFade>
  );
};
