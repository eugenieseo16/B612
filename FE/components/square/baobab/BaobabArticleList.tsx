import styled from '@emotion/styled';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const StyledPagination = styled(Pagination)`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  .MuiPaginationItem-root.Mui-selected {
    color: white;
    background-color: green;
    &:hover {
      background-color: darkgreen;
    }
  }
`;

interface BaobablistData {
  baobabArticleId: number;
  baobabArticleMemberId: number;
  baobabArticleContent: string;
  createdTime: number;
  updatedTime: number;
}
interface BaobabArticleListProps {
  refresh: boolean;
}
const BaobabArticleList: React.FC<BaobabArticleListProps> = ({ refresh }) => {
  const [baobabArticleLists, setBaobabArticleLists] = useState<
    Array<BaobablistData>
  >([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getBaobabArticleList();
  }, [refresh, page]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const getBaobabArticleList = async () => {
    const res = await axios.get(
      `https://j8a208.p.ssafy.io/api/baobab/list?size=5&page=${page - 1}`
    );

    setBaobabArticleLists(res.data.responseData.content);
    setTotalPages(res.data.responseData.totalPages);
  };

  return (
    <div>
      <TableContainer>
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <p>바오밥나무 일지</p>
          </TableHead>
          <TableBody>
            {baobabArticleLists.map((baobablistData: BaobablistData) => (
              <TableRow key={baobablistData.baobabArticleId}>
                <TableCell align="left">
                  {baobablistData.baobabArticleContent}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2}>
        <StyledPagination
          count={totalPages}
          page={page}
          onChange={handleChange}
          color="primary"
        />
      </Stack>
    </div>
  );
};
export default BaobabArticleList;
