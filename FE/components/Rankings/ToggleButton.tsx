import React, { useState } from 'react';

import UserRankings from '../Rankings/UserRankings';
import PlanetRankings from '../Rankings/PlanetRankings';

import {
  ButtonContainer,
  RankingDataContainer,
} from '../Rankings/ToggleButtonEmotion';

function ToggleButton() {
  const [selected, setSelected] = useState('user');

  return (
    <>
      <ButtonContainer>
        <button
          onClick={() => {
            setSelected('user');
          }}
          className={selected === 'user' ? 'selected' : 'default'}
        >
          <h6>사용자 랭킹</h6>
        </button>
        <button
          onClick={() => {
            setSelected('planet');
          }}
          className={selected === 'planet' ? 'selected' : 'default'}
        >
          <h6>행성 랭킹</h6>
        </button>
      </ButtonContainer>

      <RankingDataContainer>
        {selected === 'user' ? <UserRankings /> : <PlanetRankings />}
      </RankingDataContainer>
    </>
  );
}

export default ToggleButton;
