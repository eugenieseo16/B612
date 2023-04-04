import React from 'react';
import styled from '@emotion/styled';

import { useRecoilValue } from 'recoil';
import selectedPlanetAtom from 'store/profile/selectedPlanet';
import planetAtom from 'store/planetsAtom';
import { usePlanetContract } from '@components/contracts/planetToken';
import userAtom from 'store/userAtom';
import planetPageAtom from 'store/profile/planetPageAtom';

function PlanetDetailCard() {
  const me = useRecoilValue(userAtom);
  const selectedId = useRecoilValue(selectedPlanetAtom);
  const planets = useRecoilValue(planetAtom);
  const page = useRecoilValue(planetPageAtom);
  const planet = planets[selectedId + page * 5];
  console.log('여기', page * 5, selectedId);
  const planetContract = usePlanetContract();
  const handleSale = () => {
    planetContract?.methods
      .setForSalePlanetToken(planet.planetTokenId, '2000000000000000000')
      .send({ from: me?.memberAddress });
  };

  return (
    <PlanetCard>
      <div className="detail-container">
        <div>
          <p>{planet.planetName.split(' ').slice(0, 3).join(' ')}</p>
          <h2>{planet.planetName.split(' ')[3]}</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'end' }}>
          {/* <button>자세히 보기</button> */}
          <button onClick={handleSale}>팔기</button>
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
