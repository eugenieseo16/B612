import React, { useEffect } from 'react';
import Room from '@components/profile/Room';
import { MotionCanvas } from 'framer-motion-3d';
import { MotionConfig, motion } from 'framer-motion';
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';
import roomIndexAtom from 'store/profile/roomIndexAtom';
import {
  Modal,
  Fade,
  List,
  ListItem,
  ListItemText,
  Divider,
  ButtonBase,
} from '@mui/material';
import FlowersModal from '@components/common/FlowersModal';
import { Canvas } from '@react-three/fiber';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

const ROOM = ['HOME', 'DESKTOP', 'PLANETS', 'FLOWERS'];

function UserProfile() {
  const user = useRecoilValue(userAtom);
  const router = useRouter();
  const [roomIndex, setRoomIndex] = useRecoilState(roomIndexAtom);

  useEffect(() => {
    if (!Boolean(user)) router.replace('/');
  }, [user, router]);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <MotionConfig transition={{ duration: 0.8, ease: 'easeInOut' }}>
        <MotionCanvas
          shadows
          style={{
            width: 'calc(100% - 20rem)',
            minWidth: '70%',
            height: '100%',
          }}
        >
          <Room index={roomIndex} />
        </MotionCanvas>
      </MotionConfig>
      <Canvas style={{ display: 'none' }}>
        <mesh></mesh>
      </Canvas>

      <div
        style={{
          position: 'fixed',
          right: '0',
          top: 0,
          padding: '0 1rem',
          width: '20rem',
          maxWidth: '30%',
          height: '100vh',
          background: '#fff',
        }}
      >
        <List component="nav" aria-label="mailbox folders">
          {ROOM.map((text, i) => (
            <div key={i}>
              <ButtonBase
                sx={{ width: '100%' }}
                onClick={() => setRoomIndex(i)}
              >
                <ListItem>
                  <ListItemText>{text}</ListItemText>
                </ListItem>
              </ButtonBase>
              <Divider />
            </div>
          ))}
        </List>
        {roomIndex}
      </div>

      <Modal
        sx={{
          minWidth: '70%',
          width: 'calc(100% - 20rem)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        closeAfterTransition
        hideBackdrop
        open={roomIndex > 0}
        onClose={() => setRoomIndex(0)}
        onClick={() => setRoomIndex(0)}
      >
        <>
          <MyFade in={roomIndex === 3}>
            <FlowersModal />
          </MyFade>
          <MyFade in={roomIndex === 1}>
            <div
              style={{ width: '100%', height: '100%', background: 'tomato' }}
            >
              하이하이
            </div>
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
    top: 10%;
    left: 10%;
    width: 80%;
    height: 80%;
  `;

  return (
    <StyledFade {...rest} timeout={1200} onClick={e => e.stopPropagation()}>
      <div style={{ width: '80%', height: '80%' }}>{children}</div>
    </StyledFade>
  );
};
