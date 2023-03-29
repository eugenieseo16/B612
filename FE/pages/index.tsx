import type { NextPage } from 'next';
import { useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';
import Example from '@components/Example';
import Link from 'next/link';

import styled from '@emotion/styled';

const Home: NextPage = () => {
  const user = useRecoilValue(userAtom);

  return (
    <div style={{ paddingTop: '4rem' }}>
      {!Boolean(user) ? (
        <></>
      ) : (
        <h1>{user?.memberNickname + '님, 환영해요!'}</h1>
      )}

      <Link href={`/profile/${user?.memberId}`}>myProfile</Link>
      <div>
        <Link href={`/square`}>광장으로 이동</Link>
      </div>
      <div>
        <Link href={`/planet/1`}>행성으로 이동</Link>
      </div>
      <Example />
    </div>
  );
};

export default Home;
