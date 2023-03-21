import { useNavigate } from 'react-router-dom';
import MetaMaskLogin from '@components/MetaMaskLogin';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';
import Example from '@components/Example';
import Link from 'next/link';

import styled from '@emotion/styled';

import BlueGlowingButton from '@components/common/BlueGlowingButton';
import PurpleGlowingButton from '@components/common/PurpleGlowingButton';

const Home: NextPage = () => {
  const user = useRecoilValue(userAtom);

  const FloatingButtons = styled.div`
    position: fixed;
    bottom: 40px;
    right: 40px;

    .floating-button-items {
      padding: 1rem 0rem;
    }
  `;

  return (
    <div>
      <Link href={`/profile`}>myProfile</Link>
      <div>
        <Link href={`/square`}>광장으로 이동</Link>
      </div>
      <Example />
      {!Boolean(user) ? <MetaMaskLogin /> : <h1>{user?.memberNickname}</h1>}

      <h1>h1 태그 입니다 - Heading 1 마요 체 (3rem)</h1>
      <h2>h2 태그 입니다 - Heading 2 마요 체 (2.5rem)</h2>
      <h3>h3 태그 입니다 - Heading 3 마요 체 (2rem)</h3>
      <h4>h4 태그 입니다 - Heading 4 마요 체 (1.5rem)</h4>
      <h5>h5 태그 입니다 - Heading 5 거친마요 체 (2rem)</h5>
      <h6>h6 태그 입니다 - Heading 6 거친마요 체 (1.5rem)</h6>
      <span>span tag - testtest (1.3rem)</span>
      <p>p tag - 이 글씨체보다 작을 필요가 있을까요?? (1.3rem)</p>

      <table>test</table>
      <article>test</article>

      <FloatingButtons>
        <div className="floating-button-items">
          <BlueGlowingButton icon={'friend'} />
        </div>
        <div className="floating-button-items">
          <PurpleGlowingButton icon={'quest'} />
        </div>
      </FloatingButtons>
    </div>
  );
};

export default Home;
