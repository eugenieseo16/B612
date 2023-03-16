import React from 'react';

import planetRankings from '../../public/dummy/PlanetRanking.json';
import FavoriteIcon from '@mui/icons-material/Favorite';

function PlanetRankings() {
  const data = planetRankings.content.members;

  return (
    <div>
      <div>
        {data?.map((rank: any, i: number) => (
          <div key={i}>
            <p>{i + 1}</p>
            <p>{rank.planetName}</p>

            <img src={rank.memberProfileImage} alt="" />
            <p>{rank.memberName}</p>

            <FavoriteIcon />
            <p>{rank.totalCount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlanetRankings;
