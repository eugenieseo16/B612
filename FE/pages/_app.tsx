import styled from '@emotion/styled';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import UserController from '@components/UserController';
import Layout from '../components/Layout';
import React from 'react';
React.useLayoutEffect = React.useEffect;

declare global {
  interface Window {
    // eslint-disable-next-line
    ethereum: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const Background = styled.div`
    background-image: url('https://ifh.cc/g/HXB7pP.jpg');
    background-size: cover;
    height: 100vh;
  `;

  return (
    <RecoilRoot>
      <Background>
        <Layout />
        <UserController />
        <Component {...pageProps} />
      </Background>
    </RecoilRoot>
  );
}

export default MyApp;
