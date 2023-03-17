import React, { useState } from 'react';
import ToggleButton from '@components/Rankings/ToggleButton';

import background from '/default_background.png';

import styled from '@emotion/styled';

function Rankings() {
  const Background = styled.div`
    background: url('/assets/images/header_roof.png') no-repeat;
    /* background-image: url('/assets/img/default_background.png'); */
    /* height: 1080px; */
    width: 100%;
  `;

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
    <Background>
      <RankingContainer>
        <ToggleButton />
      </RankingContainer>
    </Background>
  );
}

export default Rankings;
