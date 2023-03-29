import styled from '@emotion/styled';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useRecoilState } from 'recoil';
import onSalePlanetsAtom from 'store/store/onSalePlanetsAtom';
import storeIndexAtom from 'store/store/storeIndexAtom';
import { colors } from 'styles/colors';

function StoreNav() {
  const [onSalePlanets, setOnSalePlanets] = useRecoilState(onSalePlanetsAtom);
  const [storeIndex, setStoreIndex] = useRecoilState(storeIndexAtom);
  console.log(storeIndex);
  return (
    <>
      {/* 이전페이지 */}
      {storeIndex.page > 0 && (
        <Button
          onClick={() => {
            if (storeIndex.page > 0) {
              setStoreIndex({ page: storeIndex.page - 1, index: 0 });
            }
          }}
          style={{ left: '10%' }}
        >
          <NavigateBeforeIcon
            sx={{
              fontSize: '8rem',
              color: colors.purple,
              filter: 'drop-shadow(0px 0px 5px #fff)',
            }}
          />
        </Button>
      )}
      {/* 다음페이지 */}
      {onSalePlanets.length - (storeIndex.page + 1) * 5 > 0 && (
        <Button
          onClick={() => {
            if (onSalePlanets.length - (storeIndex.page + 1) * 5 > 0) {
              setStoreIndex({ page: storeIndex.page + 1, index: 0 });
            }
          }}
          style={{ right: '10%' }}
        >
          <NavigateNextIcon
            sx={{
              fontSize: '8rem',
              color: colors.purple,
              filter: 'drop-shadow(0px 0px 5px #fff)',
            }}
          />
        </Button>
      )}

      {/* 이전 행성 */}
      <Button
        onClick={() => {
          if (storeIndex.index <= 0) {
            const tt = onSalePlanets.length - storeIndex.page * 5;
            setStoreIndex({
              ...storeIndex,
              index: tt > 4 ? 4 : tt - 1,
            });
          } else {
            setStoreIndex({ ...storeIndex, index: storeIndex.index - 1 });
          }
        }}
        style={{ left: '20%' }}
      >
        <NavigateBeforeIcon
          sx={{
            fontSize: '8rem',
            color: colors.skyBlue,
            filter: 'drop-shadow(0px 0px 5px #fff)',
          }}
        />
      </Button>
      {/* 다음행성 */}
      <Button
        onClick={() => {
          const tt = onSalePlanets.length - storeIndex.page * 5;
          const curLength = tt > 4 ? 5 : tt;
          console.log(curLength);
          if (storeIndex.index >= curLength - 1)
            setStoreIndex({ ...storeIndex, index: 0 });
          else {
            setStoreIndex({ ...storeIndex, index: storeIndex.index + 1 });
          }
        }}
        style={{ right: '20%' }}
      >
        <NavigateNextIcon
          sx={{
            fontSize: '8rem',
            color: colors.skyBlue,
            filter: 'drop-shadow(0px 0px 5px #fff)',
          }}
        />
      </Button>
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
