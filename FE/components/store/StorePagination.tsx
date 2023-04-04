import { useRecoilState, useRecoilValue } from 'recoil';
import onSalePlanetsAtom from 'store/store/onSalePlanetsAtom';
import storeIndexAtom from 'store/store/storeIndexAtom';
import Pagination from '@mui/material/Pagination';
import onSaleTypeAtom from 'store/store/onSaleTypeAtom';
import onSaleFlowersAtom from 'store/store/onSaleFlowersAtom';

function StorePagination() {
  const storeType = useRecoilValue(onSaleTypeAtom);
  const onSalePlanets = useRecoilValue(onSalePlanetsAtom);
  const onSaleFlowers = useRecoilValue(onSaleFlowersAtom);

  const [storeIndex, setStoreIndex] = useRecoilState(storeIndexAtom);

  const changePage = (e: any, page: number) => {
    setStoreIndex({ index: page - 1, page: storeIndex.page });
  };

  return (
    <Pagination
      count={onSalePlanets.length}
      variant="outlined"
      color="secondary"
      page={storeIndex.index + 1}
      onChange={changePage}
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
