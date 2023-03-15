import React from 'react';
import ToggleButton from '@components/Rankings/ToggleButton';

import styled from '@emotion/styled';

function Rankings() {
  const RankingContainer = styled.div`
    background-color: rgb(222 200 212528 / 0.4);
    height: 650px;
    width: 80%;
    border-radius: 50px;

    display: flex;
    flex-direction: column;

    align-items: center;
  `;

  return (
    <div>
      <RankingContainer>
        <ToggleButton />

        <div>list</div>
      </RankingContainer>
    </div>
  );
}

export default Rankings;
