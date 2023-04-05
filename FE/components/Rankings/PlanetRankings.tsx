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
import { useRouter } from 'next/router';
import { usePlanetContract } from '@components/contracts/planetToken';
import { useEffect, useState } from 'react';
import { planetDataList } from 'utils/planetDataList';

export default function BasicTable() {
  const data = PlanetRankingAPI();

  const router = useRouter();

  const planetContract = usePlanetContract();
  const [planetDetail, setPlanetDetail] = useState(null);

  console.log(data);
  // const planetId = 1;
  // useEffect(() => {
  //   if (!planetId) return;
  //   planetContract?.methods
  //     .b612AddressMap(planetId)
  //     .call()
  //     .then((data: any) => {
  //       setPlanetDetail(data);
  //     });
  // }, [planetContract, planetId]);

  // console.log(planetDetail);

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
                key={planet?.planetNftId}
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
                  <Link href={`/planet/${planet.planetNftId}`} id="link-item">
                    <div className="planet-item">
                      {/* Web3로 받아와야함 */}
                      <img src={planetDataList.get(planet.planetType)} alt="" />
                      <h4>{planetDataList.get(planet.planetType)}</h4>
                      {/* <h4>{planet.planetName}</h4> */}
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
