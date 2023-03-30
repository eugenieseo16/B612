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
import { useEffect } from 'react';
import { useQuery } from 'react-query';

import { Room, MyCamera, RoomNav, Planets } from '@components/profile/index';
import ProfileModal from '@components/profile/ProfileModal';
import { useRouter } from 'next/router';
import Garden from '@components/profile/Garden';
import selectedPlanetAtom from 'store/profile/selectedPlanet';
import PlanetNav from '@components/profile/PlanetNav';
import ProfileCard from '@components/profile/ProfileCard';
import PlanetDetailCard from '@components/profile/PlanetDetailCard';
import MyProfileModal from '@components/profile/MyProfileModal';

import planetAtom from 'store/planetsAtom';
import planetPageAtom from 'store/profile/planetPageAtom';
import animateAtom from 'store/profile/animateAtom';

function UserProfile() {
  const router = useRouter();
  const { userId } = router.query;
  const [roomIndex, setRoomIndex] = useRecoilState(roomIndexAtom);
  const [planets, setPlanets] = useRecoilState(planetAtom);
  const [selected, setSelected] = useRecoilState(selectedPlanetAtom);
  const [planetPage, setPlanetPage] = useRecoilState(planetPageAtom);
  const [animate, setAnimate] = useRecoilState(animateAtom);

  const planetDetail = useRecoilValue(selectedPlanetAtom);
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();

  const me = useRecoilValue(userAtom);

  const { data: userData } = useQuery(`user/${userId}`, () => {
    if (!userId) return;
    return fetch(`https://j8a208.p.ssafy.io/api/member/${userId}`).then(res =>
      res.json()
    );
  });

  useEffect(() => {
    setRoomIndex(0);
  }, []);
  useEffect(() => {
    setAnimate(true);
  }, [roomIndex]);

  const isMe = me?.memberId == userId;

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: '#252530',
      }}
    >
      {/* <PlanetController userAddress={userData?.responseData?.memberAddress} /> */}
      {roomIndex !== 1 && <RoomNav />}
      {planetDetail !== -1 && (
        <>
          <PlanetDetailCard />
          <PlanetNav />
        </>
      )}
      {planetDetail === -1 && roomIndex === 0 && (
        <>
          <ProfileCard user={isMe ? me : userData?.responseData} />
        </>
      )}

      <MotionConfig transition={{ duration: 0.8, ease: 'easeInOut' }}>
        <MotionCanvas
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <RecoilBridge>
            {/* <ambientLight intensity={0.1} /> */}
            <MyCamera router={router} />
            <Room />
            <Garden />
          </RecoilBridge>
          <Planets
            me={isMe}
            memberAddress={
              isMe ? me?.memberAddress : userData?.responseData.memberAddress
            }
            planetsState={
              isMe ? [me?.planets, () => {}] : [planets, setPlanets]
            }
            selectedState={[selected, setSelected]}
            roomIndexState={[roomIndex, setRoomIndex]}
            planetPageState={[planetPage, setPlanetPage]}
          />
        </MotionCanvas>
      </MotionConfig>
      <Canvas style={{ display: 'none' }}>
        <mesh></mesh>
      </Canvas>
      <Modal
        sx={{
          minWidth: '70%',
          width: '100%',
          marginTop: '4rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflowY: roomIndex === 1 ? 'scroll' : 'hidden',
        }}
        closeAfterTransition
        hideBackdrop
        open={
          roomIndex > 0 &&
          roomIndex !== 2 &&
          router.pathname === '/profile/[userId]'
        }
        onClose={() => setRoomIndex(0)}
        onClick={() => setRoomIndex(0)}
      >
        <>
          {roomIndex === 1 ? (
            <MotionContainer>
              {isMe ? (
                <MyProfileModal />
              ) : (
                <ProfileModal user={userData?.responseData} />
              )}
            </MotionContainer>
          ) : roomIndex === 2 ? (
            'nullnullnull'
          ) : null}
        </>
      </Modal>
    </div>
  );
}

export default UserProfile;

// eslint-disable-next-line
const MotionContainer = ({ children, ...rest }: any) => {
  const roomIndex = useRecoilValue(roomIndexAtom);
  const [isAnimate, setAnimate] = useRecoilState(animateAtom);
  const StyledFade = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  `;

  return (
    <StyledFade
      {...rest}
      onClick={e => e.stopPropagation()}
      initial={{ opacity: isAnimate ? 0 : 1 }}
      animate={{ opacity: roomIndex === 1 ? 1 : 0 }}
      transition={{ duration: 0.5, delay: 1.2 }}
      onAnimationComplete={() => setAnimate(false)}
    >
      <div style={{ width: '100%', height: '100%' }}>{children}</div>
    </StyledFade>
  );
};

const Temp = () => {};
