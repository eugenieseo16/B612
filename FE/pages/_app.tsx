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
  const Background = styled.div`
    background-image: url('https://ifh.cc/g/HXB7pP.jpg');
    background-size: cover;
    height: calc(100vh - 5rem);
    width: 100vw;
    z-index: -1;
    position: fixed;
    top: 5rem;
  `;

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <UserController />
        {/* <PlanetController /> */}
        <Layout />
        <AnimatePresence mode="wait">
          <motion.div
            style={{ minHeight: 'calc(100vh - 5rem)' }}
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
