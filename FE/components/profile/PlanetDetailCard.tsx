import React from 'react';
import styled from '@emotion/styled';

import { useRecoilValue } from 'recoil';
import selectedPlanetAtom from 'store/profile/selectedPlanet';
import planetAtom from 'store/planetsAtom';

function PlanetDetailCard() {
  const selectedId = useRecoilValue(selectedPlanetAtom);
  const planets = useRecoilValue(planetAtom);
  console.log(planets[selectedId].planetType);
  return (
    <PlanetCard>
      <div className="detail-container">
        <div>
          <p>
            {planets[selectedId].planetName.split(' ').slice(0, 3).join(' ')}
          </p>
          <h2>{planets[selectedId].planetName.split(' ')[3]}</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'end' }}>
          <button>자세히 보기</button>
        </div>
      </div>
    </PlanetCard>
  );
}

export default PlanetDetailCard;

export const PlanetCard = styled.div`
  position: fixed;
  bottom: 4rem;
  left: 3rem;
  z-index: 99;
  width: 30em;
  background: rgba(174, 197, 255, 0.7);
  box-shadow: 0px 0px 15px 7px #aec5ff;

  border-radius: 2rem;
  .detail-container {
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;

    .planet-info {
      display: flex;
      justify-content: space-between;
    }

    button {
      height: 2rem;
      width: 8rem;

      font-size: 1.2rem;
      color: #252530;

      border: none;
      border-radius: 1rem;
      background: rgba(255, 255, 255, 0.7);
    }
  }
`;
