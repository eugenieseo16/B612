import styled from '@emotion/styled';
import { useRecoilState, useRecoilValue } from 'recoil';
import selectedPlanetAtom from 'store/profile/selectedPlanet';

import { colors } from 'styles/colors';
import planetAtom from 'store/planetsAtom';
import { Pagination } from '@mui/material';
import { rgba } from 'emotion-rgba';

function PlanetNav() {
  const [selectedPlanet, setSelectedPlanet] =
    useRecoilState(selectedPlanetAtom);
  const planets = useRecoilValue(planetAtom);
  const totalLength = planets.length;

  const changePage = (e: any, page: number) => {
    setSelectedPlanet(page - 1);
  };
  return (
    <Pagination
      hideNextButton
      hidePrevButton
      count={totalLength}
      page={selectedPlanet + 1}
      onChange={changePage}
      variant="outlined"
      color="secondary"
      size={'large'}
      sx={{
        position: 'absolute',
        bottom: '5rem',
        right: '50%' ,
        transform: 'translate(50%,50%)',
        zIndex: 9999,
        background: rgba(colors.purple, 0.8),
        padding: '1rem',
        borderRadius: '1rem',
        display: planets.length > 0 ? 'flex' : 'none',
      }}
    />
  );
}

export default PlanetNav;

const Button = styled.button`
  position: absolute;
  top: 50%;
  z-index: 99;
  background: none;
  border: none;
  cursor: pointer;
`;
