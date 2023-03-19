import React from 'react';

import userRankings from '../../public/dummy/UserRanking.json';
import { TableItem } from '../Rankings/RankingsEmotion';

import FavoriteIcon from '@mui/icons-material/Favorite';

function UserRankings() {
  const data = userRankings.content.members;

  return (
    <div>
      <table width="1000">
        <th>
          <p>순위</p>
        </th>
        <th>
          <p>사용자</p>
        </th>
        <th>
          <p>계급</p>
        </th>
        <th>
          <p>좋아요</p>
        </th>

        {data?.map((rank: any, i: number) => (
          <TableItem key={i}>
            <td className="rank">
              <h2>{i + 1}</h2>
            </td>

            <td className="member-info">
              <img src={rank.memberProfileImage} alt="" />
              <p>{rank.memberName}</p>
            </td>

            <td className="class">
              <p>{rank.memberClass}</p>
            </td>

            <td className="likes">
              <FavoriteIcon id="icon-item" />
              <p>{rank.totalCount}</p>
            </td>
          </TableItem>
        ))}
      </table>
    </div>
  );
}

export default UserRankings;
