import React from 'react';
import styled from '@emotion/styled';

import Tooltip from '@mui/material/Tooltip';
import { useRecoilValue } from 'recoil';
import selectedPlanetAtom from 'store/profile/selectedPlanet';
import planetAtom from 'store/planetsAtom';
import { usePlanetContract } from '@components/contracts/planetToken';
import userAtom from 'store/userAtom';
import planetPageAtom from 'store/profile/planetPageAtom';
import IconButton from '@mui/material/IconButton';
import { motion } from 'framer-motion';
import { colors } from 'styles/colors';
import { rgba } from 'emotion-rgba';
import { useRouter } from 'next/router';
import { useMobile } from '@hooks/useMobile';

function PlanetDetailCard() {
  const router = useRouter();
  const planets = useRecoilValue(planetAtom);
  const me = useRecoilValue(userAtom);
  const selectedId = useRecoilValue(selectedPlanetAtom);
  const page = useRecoilValue(planetPageAtom);
  const planet = planets[selectedId + page * 5];
  const isMobile = useMobile();

  const planetContract = usePlanetContract();
  const handleSale = () => {
    planetContract?.methods
      .setForSalePlanetToken(planet.planetTokenId, '2000000000000000000')
      .send({ from: me?.memberAddress });
  };
  return (
    <>
      {!isMobile ? (
        <PlanetToolTip
          key={selectedId}
          initial={{ opacity: 0 }}
          animate={{ opacity: selectedId === -1 ? 0 : 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          onClick={() => router.push(`/planet/${planet.planetTokenId}`)}
        >
          <Tooltip
            placement="top"
            arrow
            title={
              <span
                style={{ color: 'inherit', padding: '1rem', display: 'flex' }}
              >
                {planet.planetName}
              </span>
            }
          >
            <IconButton sx={{ width: '2rem', height: '2rem' }}>
              <img src="" alt="" />
            </IconButton>
          </Tooltip>
        </PlanetToolTip>
      ) : (
        <div onClick={() => router.push(`/planet/${planet.planetTokenId}`)}>
          <Tooltip
            placement="top"
            open={true}
            title={
              <span
                style={{ color: 'inherit', padding: '1rem', display: 'flex' }}
              >
                {planet.planetName}
              </span>
            }
          >
            <IconButton sx={{ width: '2rem', height: '2rem' }}>
              <img src="" alt="" />
            </IconButton>
          </Tooltip>
        </div>
      )}
    </>
  );
}

export default PlanetDetailCard;

const PlanetToolTip = styled(motion.div)`
  position: fixed;
  z-index: 99;
  background: ${rgba(colors.purple, 0.7)};
  box-shadow: 0px 0px 15px 7px ${colors.purple};
  border-radius: 50%;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

// export const PlanetCard = styled.div`
//   position: fixed;
//   bottom: 8rem;
//   left: 3rem;
//   z-index: 99;
//   width: 30em;
//   background: rgba(174, 197, 255, 0.7);
//   box-shadow: 0px 0px 15px 7px #aec5ff;

//   border-radius: 2rem;
//   .detail-container {
//     padding: 1.5rem;
//     display: flex;
//     justify-content: space-between;

//     .planet-info {
//       display: flex;
//       justify-content: space-between;
//     }

//     button {
//       height: 2rem;
//       width: 8rem;

//       font-size: 1.2rem;
//       color: #252530;

//       border: none;
//       border-radius: 1rem;
//       background: rgba(255, 255, 255, 0.7);
//     }
//   }
//   @media (max-width: 500px) {
//     left: 5%;
//     bottom: 1rem;
//     width: 90%;
//     border-radius: 0;

//     h2 {
//       font-size: 1.4rem;
//     }
//     p {
//       font-size: 1rem;
//       margin-bottom: 0.5rem;
//     }
//     .detail-container {
//       padding: 1rem;
//       button {
//         font-size: 1rem;
//         width: 5rem;
//       }
//     }
//   }
// `;
