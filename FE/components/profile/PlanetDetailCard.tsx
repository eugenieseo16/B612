import React from 'react';
import styled from '@emotion/styled';

import Tooltip from '@mui/material/Tooltip';
import { useRecoilValue } from 'recoil';
import selectedPlanetAtom from 'store/profile/selectedPlanet';
import planetAtom from 'store/planetsAtom';
import { useState } from 'react';
import planetPageAtom from 'store/profile/planetPageAtom';
import IconButton from '@mui/material/IconButton';
import { motion } from 'framer-motion';
import { colors } from 'styles/colors';
import { rgba } from 'emotion-rgba';
import { useRouter } from 'next/router';
import { useMobile } from '@hooks/useMobile';
import { Button } from '@mui/material';
import roomIndexAtom from 'store/profile/roomIndexAtom';

function PlanetDetailCard({ isMe }: { isMe: boolean }) {
  const router = useRouter();
  const index = useRecoilValue(roomIndexAtom);
  const planets = useRecoilValue(planetAtom);
  const selectedId = useRecoilValue(selectedPlanetAtom);
  const page = useRecoilValue(planetPageAtom);
  const planet = planets[selectedId + page * 5];
  const isMobile = useMobile();
  const [hover, setHover] = useState(false);
  return (
    <>
      {planets.length > 0 ? (
        <>
          {!isMobile ? (
            <PlanetToolTip
              key={selectedId}
              initial={{ opacity: 0 }}
              onMouseOver={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              animate={{ opacity: selectedId === -1 ? 0 : hover ? 1 : 0.5 }}
              transition={{ delay: selectedId === -1 ? 0.8 : 0, duration: 0.5 }}
              onClick={() => router.push(`/planet/${planet.planetTokenId}`)}
            >
              <Tooltip
                placement="top"
                arrow
                title={
                  <p
                    style={{
                      color: 'inherit',
                      padding: '1rem',
                      display: 'flex',
                    }}
                  >
                    {planet?.planetName}
                  </p>
                }
              >
                <Button color="success">
                  <p>자세히보기</p>
                </Button>
              </Tooltip>
            </PlanetToolTip>
          ) : (
            <div onClick={() => router.push(`/planet/${planet.planetTokenId}`)}>
              <Tooltip
                placement="top"
                open={true}
                title={
                  <span
                    style={{
                      color: 'inherit',
                      padding: '1rem',
                      display: 'flex',
                    }}
                  >
                    {planet?.planetName}
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
      ) : (
        <NoPlanets
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: index !== 2 ? 0 : 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <h1 style={{ color: '#BCF0FA' }}>보유행성이 없습니다</h1>
          {isMe && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => router.push('/store')}
            >
              <span style={{ color: '#fff' }}>구매하러 가기</span>
            </Button>
          )}
        </NoPlanets>
      )}
    </>
  );
}

export default PlanetDetailCard;

const PlanetToolTip = styled(motion.div)`
  position: fixed;
  z-index: 99;
  background: #2e7d32;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 1rem;
  > button {
    p {
      color: #fff;
    }
    /* width: 5rem;
    height: 5rem; */
  }
`;
const NoPlanets = styled(motion.div)`
  transform: translate(-50%, -50%);
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${rgba(colors.navy, 0.9)};
  z-index: 99;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (max-width: 500px) {
    h1 {
      font-size: 1.2rem;
    }
  }
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
