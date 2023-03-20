import styled from '@emotion/styled';
import { colors } from 'styles/colors';
import { Paper, Avatar, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import roomIndexAtom from 'store/profile/roomIndexAtom';
import defaultImg from 'assets/imgs/cryptoPunk1.png';

function ProfileModal() {
  const roomIndex = useRecoilValue(roomIndexAtom);
  return (
    <Container>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Avatar src={defaultImg.src} sx={{ width: '4rem', height: '4rem' }} />
        <h1>내이름</h1>
      </div>
      <p>보유 코인 : 11.12980 GoerliETH</p>
      <div>
        <span>충전하러 가기 </span>
        <a>https://goerlifaucet.com/</a>
      </div>

      <p>받은 친구요청</p>
      <p>친구목록</p>
    </Container>
  );
}

export default ProfileModal;

const Container = styled.div`
  padding: 5vh 0 0 5vw;
  color: #fff;
  h1,
  span,
  p,
  a {
    color: #fff;
    font-family: 'pixel';
  }
  a {
    color: ${colors.blue};
  }
`;
const Item = styled(Paper)`
  background-color: transparent;
  font-family: 'pixel';
  p {
    font-family: 'pixel';
    color: #fff;
  }
`;
