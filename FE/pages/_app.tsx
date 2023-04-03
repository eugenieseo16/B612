import styled from '@emotion/styled';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import UserController from '@components/UserController';
import Layout from '../components/Layout';
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import Loading from '../components/loading/loading';
import { useGLTF } from '@react-three/drei';
import { PLANETS_LIST } from 'utils/utils';
import { useMobile } from '@hooks/useMobile';
import MobileNav from '@components/common/MobileNav';
React.useLayoutEffect = React.useEffect;

declare global {
  interface Window {
    // eslint-disable-next-line
    ethereum: any;
  }
}
const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isMobile = useMobile();

  useGLTF.preload('/little-prince.glb');
  PLANETS_LIST.forEach(planet => {
    useGLTF.preload(planet);
  });

  const Background = styled.div`
    background-image: url('https://ifh.cc/g/HXB7pP.jpg');
    background-size: cover;
    height: calc(100vh);
    width: 100vw;
    z-index: -1;
    position: fixed;
    top: 0;
  `;
  const [imgsLoaded, setImgsLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setImgsLoaded(true);
    }, 1);
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <UserController />
          {imgsLoaded ? (
            <AnimatePresence mode="wait">
              <motion.div
                style={{ minHeight: 'calc(100vh)' }}
                key={router.route}
                initial="initialState"
                animate="animateState"
                exit="exitState"
                transition={{ duration: 0.75, ease: 'easeInOut' }}
                variants={{
                  initialState: {
                    opacity: 0,
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
                  },
                  animateState: {
                    opacity: 1,
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
                  },
                  exitState: {
                    clipPath: 'polygon(50% 0, 50% 0, 50% 100%, 50% 100%)',
                  },
                }}
              >
                {!isMobile ? <Layout /> : <MobileNav />}

                <Background />

                <Component {...pageProps} />
              </motion.div>
            </AnimatePresence>
          ) : (
            <Loading />
          )}
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
