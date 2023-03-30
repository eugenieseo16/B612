import * as React from 'react';
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

import { PlanetRankingAPI } from 'API/rankingAPIs';

import Web3 from 'web3';

export default function BasicTable() {
  const data = PlanetRankingAPI();
  console.log(data);

  // console.log(Web3.eth.accounts);

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
                <p>행성</p>
              </TableCell>
              <TableCell align="center">
                <p>사용자</p>
              </TableCell>
              <TableCell align="center">
                <p>좋아요</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.responseData?.map((planet: any) => (
              <TableRow
                key={planet.planetId}
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
                  <h2>{planet.rank}</h2>
                </TableCell>
                <TableCell align="left">
                  <Link href={`/planet/${planet.planetId}`} id="link-item">
                    <div className="planet-item">
                      {/* Web3로 받아와야함 */}
                      <img src={planet.planetImage} alt="" />
                      <h4>{planet.planetName}</h4>
                    </div>
                  </Link>
                </TableCell>
                <TableCell align="center">
                  <div className="member-tier">
                    <img src={tierDataList.get(planet.memberTierName)} alt="" />
                    <p>{planet.memberNickName}</p>
                  </div>
                </TableCell>
                <TableCell align="center">
                  <div className="like-item">
                    <FavoriteIcon id="icon-item" />
                    <p>{planet.planetLikeCount}</p>
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
