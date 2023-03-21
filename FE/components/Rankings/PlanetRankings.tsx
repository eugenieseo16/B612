import React from 'react';

import planetRankings from '../../public/dummy/PlanetRanking.json';
import { RankingTable, TableItem } from '../Rankings/RankingsEmotion';

import FavoriteIcon from '@mui/icons-material/Favorite';

function PlanetRankings() {
  const data = planetRankings.content.members;

  return (
    <RankingTable>
      <th className="rank">
        <p>순위</p>
      </th>
      <th className="planet">
        <p>행성</p>
      </th>
      <th className="member">
        <p>사용자</p>
      </th>
      <th className="likes">
        <p>좋아요</p>
      </th>

      {data?.map((rank: any, i: number) => (
        <TableItem key={i}>
          <td className="rank">
            <h2>{i + 1}</h2>
          </td>

          <td className="planet">
            <img src={rank.memberProfileImage} alt="" />
            <h6>{rank.planetName}</h6>
          </td>

          <td className="member">
            <p>{rank.memberName}</p>
          </td>

          <td className="likes">
            <FavoriteIcon id="icon-item" />
            <p>{rank.totalCount}</p>
          </td>
        </TableItem>
      ))}
    </RankingTable>
  );
}

export default PlanetRankings;
