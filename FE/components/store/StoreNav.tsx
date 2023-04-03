import styled from '@emotion/styled';
import { useRecoilState, useRecoilValue } from 'recoil';
import onSalePlanetsAtom from 'store/store/onSalePlanetsAtom';
import storeIndexAtom from 'store/store/storeIndexAtom';
import Pagination from '@mui/material/Pagination';
import GlowingButton from '@components/common/GlowingButton';
import { colors } from 'styles/colors';

function StoreNav() {
  const onSalePlanets = useRecoilValue(onSalePlanetsAtom);
  const [storeIndex, setStoreIndex] = useRecoilState(storeIndexAtom);

  const handlePage = (type: 'next' | 'prev') => () => {
    const tt = onSalePlanets.length - storeIndex.page * 5;
    if (type === 'prev') {
      if (storeIndex.index <= 0) {
        setStoreIndex({
          ...storeIndex,
          index: tt > 4 ? 4 : tt - 1,
        });
        return;
      }
      setStoreIndex({ ...storeIndex, index: storeIndex.index - 1 });
    }

    if (type == 'next') {
      const curLength = tt > 4 ? 5 : tt;
      if (storeIndex.index >= curLength - 1)
        setStoreIndex({ ...storeIndex, index: 0 });
      else {
        setStoreIndex({ ...storeIndex, index: storeIndex.index + 1 });
      }
    }
  };

  const changePage = (e: any, page: number) => {
    setStoreIndex({ index: page - 1, page: storeIndex.page });
  };

  return (
    <>
      <Pagination
        count={onSalePlanets.length}
        variant="outlined"
        color="secondary"
        page={storeIndex.index + 1}
        onChange={changePage}
        size={'large'}
        sx={{
          position: 'absolute',
          bottom: '1rem',
          right: '1rem',
          zIndex: 9999,
        }}
      />

      {/* 이전 행성 */}
      {/* <Button onClick={handlePage('prev')} style={{ left: '20%' }}>
        <GlowingButton selected={true} icon="left" bgColor={colors.purple} />
      </Button> */}
      {/* 다음행성 */}
      {/* <Button onClick={handlePage('next')} style={{ right: '20%' }}>
        <GlowingButton selected={true} icon="right" bgColor={colors.purple} />
      </Button> */}
    </>
  );
}

export default StoreNav;
const Button = styled.button`
  position: absolute;
  top: 50%;
  z-index: 99;
  background: none;
  border: none;
  cursor: pointer;
`;
