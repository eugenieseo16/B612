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
          <h4>사용자 랭킹</h4>
        </button>
        <button
          onClick={() => {
            setSelected('planet');
          }}
          className={selected === 'planet' ? 'selected' : 'default'}
        >
          <h4>행성 랭킹</h4>
        </button>
      </ButtonContainer>

      <RankingDataContainer>
        {selected === 'user' ? <UserRankings /> : <PlanetRankings />}
      </RankingDataContainer>
    </>
  );
}

export default ToggleButton;
