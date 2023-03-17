import React from 'react';

import userRankings from '../../public/dummy/UserRanking.json';
import { RankingContainer } from '../Rankings/RankingsEmotion';

import FavoriteIcon from '@mui/icons-material/Favorite';

function UserRankings() {
  const data = userRankings.content.members;

  return (
    <div>
      <div>
        {data?.map((rank: any, i: number) => (
          <RankingContainer key={i}>
            <div className="rank">
              <h3>{i + 1}</h3>
            </div>

            <div className="member-info">
              <img src={rank.memberProfileImage} alt="" />
              <p>{rank.memberName}</p>
            </div>

            <div className="class">
              <p>{rank.memberClass}</p>
            </div>

            <div className="likes">
              <FavoriteIcon />
              <h4>{rank.totalCount}</h4>
            </div>
          </RankingContainer>
        ))}
      </div>
    </div>
  );
}

export default UserRankings;
