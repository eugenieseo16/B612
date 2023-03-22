import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Link from 'next/link';

import { Container } from './RankingsEmotion';
import userRankings from '../../public/dummy/UserRanking.json';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function BasicTable() {
  const members = userRankings.content.members;

  return (
    <Container>
      <TableContainer>
        <Table sx={{ minWidth: 650, width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <p>순위</p>
              </TableCell>
              <TableCell align="center">
                <p>사용자</p>
              </TableCell>
              <TableCell align="center">
                <p>계급</p>
              </TableCell>
              <TableCell align="center">
                <p>좋아요</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map(member => (
              <TableRow
                key={member.memberId}
                sx={
                  {
                    // '&:last-child td, &:last-child th': {
                    // border: 10,
                    // bgcolor: '#fff',
                    // borderRadius: '40px',
                    // },
                  }
                }
              >
                <TableCell align="center">
                  <h2>{member.rank}</h2>
                </TableCell>
                <TableCell align="left">
                  <Link href={`/profile/${member.memberId}`} id="link-item">
                    <div className="member-item">
                      <img src={member.memberProfileImage} alt="" />
                      <h6>{member.memberName}</h6>
                    </div>
                  </Link>
                </TableCell>
                <TableCell align="center">
                  <p>{member.memberClass}</p>
                </TableCell>
                <TableCell align="center">
                  <div className="like-item">
                    <FavoriteIcon id="icon-item" />
                    <p>{member.totalCount}</p>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
