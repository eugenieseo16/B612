import MetaMaskLogin from '@components/MetaMaskLogin';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';
import Example from '@components/Example';
import Link from 'next/link';

import PinkGlowingButton from '@components/common/PinkGlowingButton';
import BlueGlowingButton from '@components/common/BlueGlowingButton';

const Home: NextPage = () => {
  const user = useRecoilValue(userAtom);

  return (
    <div style={{ padding: '10rem' }} className={styles.container}>
      <Link href={`/profile`}>myProfile</Link>
      <div>
        <Link href={`/square`}>광장으로 이동</Link>
      </div>
      <Example />
      {!Boolean(user) ? <MetaMaskLogin /> : <h1>{user?.memberNickname}</h1>}
      <PinkGlowingButton icon={'item'} />
      <BlueGlowingButton icon={'friend'} />
    </div>
  );
};

export default Home;
