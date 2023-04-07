import { usePlanetContract } from '@components/contracts/planetToken';
import Button from '@mui/material/Button';
import React from 'react';
import { useRecoilState } from 'recoil';
import userAtom from 'store/userAtom';

function Approval() {
  const [me, setMe] = useRecoilState(userAtom);
  const planetContract = usePlanetContract();
  const toggleApproval = () => {
    if (!me) return;
    planetContract.methods
      .setApprovalForAll(
        '0x03DD8A0273a3ED1C15Dad07ec87f74861e6e355C',
        !me?.isApproved
      )
      .send({ from: me?.memberAddress });
    setMe({ ...me, isApproved: !me?.isApproved });
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <p>판매권한 : {me?.isApproved ? '수락' : '거부'}</p>
      <Button
        variant="contained"
        onClick={toggleApproval}
        color={me?.isApproved ? 'error' : 'success'}
      >
        <p style={{ fontSize: '0.8rem', color: '#fff' }}>
          권한 {me?.isApproved ? '거부' : '수락'}
        </p>
      </Button>
    </div>
  );
}

export default Approval;
