import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import UserController from '@components/UserController';

declare global {
  interface Window {
    // eslint-disable-next-line
    ethereum: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <UserController />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
