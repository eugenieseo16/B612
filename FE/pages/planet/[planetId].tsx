import styled from '@emotion/styled';
import PlanetModel from '@components/Planet/PlanetModel';
import { FriendsModal } from '@components/Planet/index';

import PlanetCertificateModal from '@components/Planet/PlanetCertificateModal';
import PlanetDetailCard from '@components/Planet/PlanetDetail';
import { Canvas } from '@react-three/fiber';
import { useMobile } from '@hooks/useMobile';
import MainNav from '@components/Main/MainNav';
import { dividerClasses } from '@mui/material';

import like from '../../assets/imgs/buttonIcons/heart.svg';
import dislike from '../../assets/imgs/buttonIcons/heart-filled.svg';
import { likePlanetAPI, useIsLikedPlanetAPI } from 'API/planetAPIs';
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';
import { useRouter } from 'next/router';
import hoverdAtom from 'store/planet/hoverdAtom';
import selectedAtom from 'store/planet/selectedAtom';
import { StyledLikeButton } from '@components/Planet/PlanetModelEmotion';
import { Html } from '@react-three/drei';
import { useEffect } from 'react';

function Planet() {
  const { query } = useRouter();
  const me = useRecoilValue(userAtom);
  const isMobile = useMobile();

  return (
    <Container>
      <Canvas
        style={{
          width: '100vw',
          height: !isMobile ? 'calc(100vh - 4rem)' : '100vh',
        }}
      >
        <PlanetModel />
        {me && query.planetId && (
          <LikeButton me={me} planetId={+query.planetId} />
        )}
      </Canvas>

      <PlanetDetailCard />

      <MainNav />
      {/* 친구 목록 조회 */}
      <FriendsModal />
      {/* 인증서 발급 */}
      <PlanetCertificateModal />
    </Container>
  );
}

export default Planet;

const LikeButton = ({ planetId, me }: { planetId: number; me: IUser }) => {
  const [selected, setSelected] = useRecoilState(selectedAtom);

  const isLiked = useIsLikedPlanetAPI(me.memberId, +planetId);

  useEffect(() => {
    setSelected(isLiked);
  }, [isLiked, setSelected]);

  const likeButton = () => {
    if (!me || !planetId) return;
    setSelected(!selected);

    likePlanetAPI({
      planetLikeMemberId: me?.memberId,
      planetNftId: planetId,
    });
  };

  return (
    <Html position={[0, 3, 0]}>
      <StyledLikeButton>
        {selected ? (
          <img src={dislike.src} alt="" onClick={likeButton} />
        ) : (
          <img src={like.src} alt="" onClick={likeButton} />
        )}
      </StyledLikeButton>
    </Html>
  );
};

const Container = styled.div`
  padding-top: 4rem;
  @media (max-width: 500px) {
    padding-top: 0;
  }
`;
