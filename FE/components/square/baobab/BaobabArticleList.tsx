import styled from '@emotion/styled';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface BaobablistData {
  baobabArticleId: number;
  baobabArticleMemberId: number;
  baobabArticleContent: string;
  createdTime: number;
  updatedTime: number;
}

const BaobabArticleList: React.FC = () => {
  const [baobabArticleLists, setBaobabArticleLists] = useState<
    Array<BaobablistData>
  >([]);
  useEffect(() => {
    getBaobabArticleList();
  }, []);

  const getBaobabArticleList = async () => {
    // res는 http response의 header + body를 모두 갖고 있다.
    const res = await axios.get(
      'https://j8a208.p.ssafy.io/api/baobab/list?size=5&page=0'
    );
    console.log('fdfdsfdsf', res.data.responseData.content);
    setBaobabArticleLists(res.data.responseData.content);
  };
  return (
    <div>
      <TableContainer>
        <Table sx={{ minWidth: 650, width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <p>바오밥나무 일지</p>
              </TableCell>
            </TableRow>
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
    </div>
  );
};
export default BaobabArticleList;
