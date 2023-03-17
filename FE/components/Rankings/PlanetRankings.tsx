import React from 'react';

import planetRankings from '../../public/dummy/PlanetRanking.json';
import { RankingContainer } from '../Rankings/RankingsEmotion';

import FavoriteIcon from '@mui/icons-material/Favorite';

function PlanetRankings() {
  const data = planetRankings.content.members;

  return (
    <div>
      {data?.map((rank: any, i: number) => (
        <RankingContainer key={i}>
          <div className="rank">
            <h3>{i + 1}</h3>
          </div>

          <div className="planet">
            <h3>{rank.planetName}</h3>
          </div>

          <div className="member-info">
            <img src={rank.memberProfileImage} alt="" />
            <p>{rank.memberName}</p>
          </div>

          <div className="likes">
            <FavoriteIcon />
            <h4>{rank.totalCount}</h4>
          </div>
        </RankingContainer>
      ))}
    </div>
  );
}

export default PlanetRankings;
