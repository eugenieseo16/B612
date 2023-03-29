import * as React from 'react';
import { useRouter } from 'next/navigation';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { tierDataList } from '../../utils/tierDataList';

import Link from 'next/link';

import { Container } from './RankingsEmotion';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { MemberRankingAPI } from 'API/rankingURLs';

export default function BasicTable() {
  const router = useRouter();
  const data = MemberRankingAPI();

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
            {data?.responseData?.map((member: any) => (
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
                    <div
                      className="member-item"
                      onClick={() => router.push(`/profile/${member.memberId}`)}
                    >
                      <img src={member.memberImage} alt="" />
                      <h6>{member.memberNickname}</h6>
                    </div>
                  </Link>
                </TableCell>
                <TableCell align="center">
                  <div className="member-tier">
                    <img src={tierDataList.get(member.memberTierName)} alt="" />
                    <p>{member.memberTierName}</p>
                  </div>
                </TableCell>
                <TableCell align="center">
                  <div className="like-item">
                    <FavoriteIcon id="icon-item" />
                    <p>{member.memberLiked}</p>
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
