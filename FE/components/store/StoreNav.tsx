import React from 'react';
import styled from '@emotion/styled';
import GlowingButton from '@components/common/GlowingButton';
import { useRecoilState } from 'recoil';
import onSaleTypeAtom from 'store/store/onSaleTypeAtom';

function StoreNav() {
  const [storeType, setStoreType] = useRecoilState(onSaleTypeAtom);
  return (
    <FloatingButtons>
      <GlowingButton
        selected={storeType === 'planet'}
        onClick={() => setStoreType('planet')}
        icon="planet"
      />
      <GlowingButton
        selected={storeType === 'flower'}
        onClick={() => setStoreType('flower')}
        icon="plant"
      />
    </FloatingButtons>
  );
}

export default StoreNav;

const FloatingButtons = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  z-index: 9;

  > div {
    padding: 1rem 0rem;
  }
`;
