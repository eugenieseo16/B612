import type { NextPage } from 'next';

import TestCanvas from '@components/Main/TestCanvas';

import { CertificateModal, FriendsModal } from '@components/Planet/index';
import { Canvas } from '@react-three/fiber';
import MainNav from '@components/Main/MainNav';
import styled from '@emotion/styled';
import { useMobile } from '@hooks/useMobile';

const Home: NextPage = () => {
  const isMobile = useMobile();
  return (
    <Container>
      <Canvas
        style={{
          width: '100vw',
          height: !isMobile ? 'calc(100vh - 4rem)' : '100vh',
        }}
      >
        <TestCanvas />
      </Canvas>

      <MainNav />
      {/* 친구 목록 조회 */}
      <FriendsModal />

      {/* 인증서 발급 */}
      <CertificateModal />
    </Container>
  );
};

export default Home;

const Container = styled.div`
  padding-top: 4rem;
  @media (max-width: 500px) {
    padding-top: 0;
  }
`;
