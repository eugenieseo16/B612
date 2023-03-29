import styled from '@emotion/styled';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import UserController from '@components/UserController';
import Layout from '../components/Layout';
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import PlanetController from '@components/PlanetController';
import { useGLTF } from '@react-three/drei';
import { PLANETS_LIST } from 'utils/utils';
React.useLayoutEffect = React.useEffect;

declare global {
  interface Window {
    // eslint-disable-next-line
    ethereum: any;
  }
}
const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
  const tt = useGLTF.preload('/little-prince.glb');

  PLANETS_LIST.forEach(planet => {
    useGLTF.preload(planet);
  });

  const router = useRouter();
  const Background = styled.div`
    background-image: url('https://ifh.cc/g/HXB7pP.jpg');
    background-size: cover;
    height: calc(100vh);
    width: 100vw;
    z-index: -1;
    position: fixed;
    top: 0;
  `;

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <UserController />
        {/* <PlanetController /> */}
        <Layout />
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
            <Background />

            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default MyApp;
