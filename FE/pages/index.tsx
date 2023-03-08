import MetaMaskLogin from '@components/MetaMaskLogin';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';
import Example from '@components/Example';

const Home: NextPage = () => {
  const user = useRecoilValue(userAtom);
  return (
    <div className={styles.container}>
      <Example />
      {user.length == 0 ? <MetaMaskLogin /> : <h1>{user}</h1>}
    </div>
  );
};

export default Home;
