import styled from '@emotion/styled';
import { useRecoilState, useRecoilValue } from 'recoil';
import selectedPlanetAtom from 'store/profile/selectedPlanet';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { shadowGenerator, simpleShadow } from 'styles/utils';
import { colors } from 'styles/colors';
import planetAtom from 'store/planetsAtom';
import planetPageAtom from 'store/profile/planetPageAtom';

function PlanetNav() {
  const [selectedPlanet, setSelectedPlanet] =
    useRecoilState(selectedPlanetAtom);
  const planets = useRecoilValue(planetAtom);
  const [planetPage, setPlanetPage] = useRecoilState(planetPageAtom);

  const curPlanetsLength =
    planets.length - planetPage * 5 > 4 ? 5 : planets.length - planetPage * 5;

  const handlePlanet =
    (type: 'next' | 'prev' | 'nextPage' | 'prevPage') => () => {
      if (type === 'next') {
        if (selectedPlanet == curPlanetsLength - 1) return;
        setSelectedPlanet(selectedPlanet + 1);
      } else if (type == 'prev') {
        if (selectedPlanet == 0) return;
        setSelectedPlanet(selectedPlanet - 1);
      } else if (type == 'nextPage') {
        setPlanetPage(planetPage + 1);
        setSelectedPlanet(0);
      } else {
        setPlanetPage(planetPage - 1);
        setSelectedPlanet(0);
      }
    };
  return (
    <>
      <Button onClick={handlePlanet('prevPage')} style={{ left: '10%' }}>
        <NavigateBeforeIcon
          sx={{
            fontSize: '8rem',
            color: colors.purple,
            filter: 'drop-shadow(0px 0px 5px #fff)',
          }}
        />
      </Button>
      <Button onClick={handlePlanet('prev')} style={{ left: '20%' }}>
        {selectedPlanet > 0 && (
          <NavigateBeforeIcon
            sx={{
              fontSize: '8rem',
              color: colors.skyBlue,
              filter: 'drop-shadow(0px 0px 5px #fff)',
            }}
          />
        )}
      </Button>
      <Button onClick={handlePlanet('next')} style={{ right: '20%' }}>
        {selectedPlanet < planets.length - 1 && (
          <NavigateNextIcon
            sx={{
              fontSize: '8rem',
              color: colors.skyBlue,
              filter: 'drop-shadow(0px 0px 5px #fff)',
            }}
          />
        )}
      </Button>

      <Button onClick={handlePlanet('nextPage')} style={{ right: '10%' }}>
        {selectedPlanet < planets.length - 1 && (
          <NavigateNextIcon
            sx={{
              fontSize: '8rem',
              color: colors.skyBlue,
              filter: 'drop-shadow(0px 0px 5px #fff)',
            }}
          />
        )}
      </Button>
    </>
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
