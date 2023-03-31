import type { NextPage } from 'next';
import { useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';

import RocketModel from '@components/Main/RocketModel';

const Home: NextPage = () => {
  const user = useRecoilValue(userAtom);
  console.log(user);

  return (
    <div style={{ paddingTop: '4rem' }}>
      {!Boolean(user) ? (
        <></>
      ) : (
        <h1>{user?.memberNickname + '님, 환영해요!'}</h1>
      )}

      <RocketModel />
    </div>
  );
};

export default Home;
