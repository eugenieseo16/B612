import MetaMaskLogin from '@components/MetaMaskLogin';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';
import Example from '@components/Example';
import Link from 'next/link';

const Home: NextPage = () => {
  const user = useRecoilValue(userAtom);
  return (
    <div className={styles.container}>
      <Link href={`/profile`}>myProfile</Link>
      <div>
        <Link href={`/square`}>광장으로 이동</Link>
      </div>
      <Example />
      {user.length == 0 ? <MetaMaskLogin /> : <h1>{user}</h1>}

      <h1>Heading1 폰트 테스트 - MYCHEW</h1>
      <h2>Heading2 폰트 테스트 - MYCHEW</h2>
      <h3>Heading3 폰트 테스트 - TMONEY</h3>
      <h4>Heading4 폰트 테스트 - TMONEY</h4>
      <h5>Heading5 폰트 테스트 - TMONEY</h5>
      <h6>Heading6 폰트 테스트 - TMONEY</h6>
      <span>span tag 폰트 테스트 - LITTLEPRINCE</span>
      <p>p tag 폰트 테스트 - LITTLEPRINCE</p>
      <a href="#">a tag 폰트 테스트 - LITTLEPRINCE</a>
    </div>
  );
};

export default Home;
