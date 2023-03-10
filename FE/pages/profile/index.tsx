import React from 'react';
import { Canvas } from '@react-three/fiber';
import UserAvatar from '@components/profile/UserAvatar';
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

const ROOM = ['HOME', 'DESKTOP', 'PLANETS', 'FLOWERS'];

function UserProfile() {
  const user = useRecoilValue(userAtom);
  const [roomIndex, setRoomIndex] = useRecoilState(roomIndexAtom);

  return (
    <div
      style={{
        background: '#AEC5FF',
        width: '100vw',
        height: '100vh',
      }}
    >
      <MotionConfig transition={{ duration: 0.5 }}>
        <MotionCanvas
          style={{
            width: '70%',
            height: '100%',
          }}
        >
          <Room index={roomIndex} setIndex={setRoomIndex} />
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

      <div
        style={{
          position: 'fixed',
          right: '0',
          top: 0,
          padding: '0 1rem',
          width: '30%',
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
          width: '70%',
          background: 'rgba(0,0,0,0.2)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        hideBackdrop
        open={roomIndex > 0}
        onClose={() => setRoomIndex(0)}
        onClick={() => setRoomIndex(0)}
      >
        <Fade
          in={roomIndex > 0}
          timeout={500}
          onClick={e => e.stopPropagation()}
        >
          <motion.div
            style={{ width: '80%', height: '80%' }}
            animate={roomIndex > 0 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {roomIndex === 3 && <FlowersModal />}
          </motion.div>
        </Fade>
      </Modal>
    </div>
  );
}

export default UserProfile;
