import type { NextPage } from 'next';
import { useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';
import Example from '@components/Example';
import Link from 'next/link';

import styled from '@emotion/styled';

import ModelCanvas from '@components/Main/ModelCanvas';

const Home: NextPage = () => {
  const user = useRecoilValue(userAtom);
  // console.log(user?.planets[0]);

  return (
    <div style={{ paddingTop: '4rem' }}>
      {!Boolean(user) ? (
        <></>
      ) : (
        <h1>{user?.memberNickname + '님, 환영해요!'}</h1>
      )}

      <ModelCanvas />
    </div>
  );
};

export default Home;
