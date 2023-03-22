import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Link from 'next/link';

import { Container } from './RankingsEmotion';
import planetRankings from '../../public/dummy/PlanetRanking.json';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function BasicTable() {
  const planets = planetRankings.content.members;

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
            {planets.map(planet => (
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
                      <img src={planet.memberProfileImage} alt="" />
                      <h4>{planet.planetName}</h4>
                    </div>
                  </Link>
                </TableCell>
                <TableCell align="center">
                  <p>{planet.memberName}</p>
                </TableCell>
                <TableCell align="center">
                  <div className="like-item">
                    <FavoriteIcon id="icon-item" />
                    <p>{planet.totalCount}</p>
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
