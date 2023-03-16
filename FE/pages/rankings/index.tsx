import React, { useState } from 'react';
import ToggleButton from '@components/Rankings/ToggleButton';

import styled from '@emotion/styled';

function Rankings() {
  const RankingContainer = styled.div`
    background-color: rgb(222 200 212528 / 0.4);
    padding-top: 30px;
    padding-bottom: 30px;
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
      </RankingContainer>
    </div>
  );
}

export default Rankings;
