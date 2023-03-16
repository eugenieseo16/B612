import React from 'react';

import userRankings from '../../public/dummy/UserRanking.json';
import { RankingContainer } from '../Rankings/UserRankingsEmotion';

import FavoriteIcon from '@mui/icons-material/Favorite';

function UserRankings() {
  const data = userRankings.content.members;

  return (
    <div>
      <div>
        {data?.map((rank: any, i: number) => (
          <RankingContainer key={i}>
            <p>{i + 1}</p>

            <div className="member-info">
              <img src={rank.memberProfileImage} alt="" />
              <h6>{rank.memberName}</h6>
            </div>
            <p>{rank.memberClass}</p>
            <FavoriteIcon />
            <p>{rank.totalCount}</p>
          </RankingContainer>
        ))}
      </div>
    </div>
  );
}

export default UserRankings;
