import { useRecoilState, useRecoilValue } from 'recoil';
import onSalePlanetsAtom from 'store/store/onSalePlanetsAtom';
import storeIndexAtom from 'store/store/storeIndexAtom';
import Pagination from '@mui/material/Pagination';

function StorePagination() {
  const onSalePlanets = useRecoilValue(onSalePlanetsAtom);

  const [storeIndex, setStoreIndex] = useRecoilState(storeIndexAtom);

  const changePage = (e: React.ChangeEvent<unknown>, page: number) => {
    setStoreIndex({ index: page - 1, page: storeIndex.page });
  };

  return (
    <Pagination
      count={onSalePlanets.length}
      page={storeIndex.index + 1}
      onChange={changePage}
      variant="outlined"
      color="secondary"
      size={'large'}
      sx={{
        position: 'absolute',
        bottom: '150px',
        right: '50%',
        transform: 'translate(50%,-50%)',
        zIndex: 9999,
      }}
    />
  );
}

export default StorePagination;
