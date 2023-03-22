import React from 'react';
import styled from '@emotion/styled';

import PlanetDetailCard from '@components/Planet/PlanetDetail';
import BlueGlowingButton from '@components/common/BlueGlowingButton';
import PinkGlowingButton from '@components/common/PinkGlowingButton';
import PurpleGlowingButton from '@components/common/PurpleGlowingButton';
import YellowGlowingButton from '@components/common/YellowGlowingButton';

function Planet() {
  const FloatingButtons = styled.div`
    position: fixed;
    bottom: 3rem;
    right: 3rem;

    .floating-button-items {
      padding: 1rem 0rem;
    }
  `;

  return (
    <>
      <PlanetDetailCard></PlanetDetailCard>
      <FloatingButtons>
        <div className="floating-button-items">
          <BlueGlowingButton icon={'friend'} />
        </div>

        <div className="floating-button-items">
          <PurpleGlowingButton icon={'plant'} />
        </div>

        <div className="floating-button-items">
          <YellowGlowingButton icon={'certificate'} />
        </div>
        <div className="floating-button-items">
          <PinkGlowingButton icon={'planet'} />
        </div>
      </FloatingButtons>
    </>
  );
}

export default Planet;
