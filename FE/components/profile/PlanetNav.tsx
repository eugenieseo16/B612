import styled from '@emotion/styled';
import { useRecoilState, useRecoilValue } from 'recoil';
import selectedPlanetAtom from 'store/profile/selectedPlanet';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { colors } from 'styles/colors';
import planetAtom from 'store/planetsAtom';
import planetPageAtom from 'store/profile/planetPageAtom';

function PlanetNav() {
  const [selectedPlanet, setSelectedPlanet] =
    useRecoilState(selectedPlanetAtom);
  const [planetPage, setPlanetPage] = useRecoilState(planetPageAtom);
  const planets = useRecoilValue(planetAtom);
  const totalLength = planets.length;
  const curPlanetsLength =
    totalLength - planetPage * 5 >= 4 ? 5 : totalLength - planetPage * 5;
  const handlePlanet =
    (type: 'next' | 'prev' | 'nextPage' | 'prevPage') => () => {
      if (type === 'next') {
        if (totalLength + planetPage * 5 > totalLength) {
          return;
        }

        if (selectedPlanet == curPlanetsLength - 1) {
          setSelectedPlanet(0);
          setPlanetPage(planetPage + 1);
          return;
        }

        setSelectedPlanet(selectedPlanet + 1);
      } else if (type == 'prev') {
        if (selectedPlanet + planetPage * 5 <= 0) return;
        else if (selectedPlanet == 0) {
          setSelectedPlanet(4);
          setPlanetPage(planetPage - 1);
        } else {
          setSelectedPlanet(selectedPlanet - 1);
        }
      } else if (type == 'nextPage') {
        if (totalLength - (planetPage + 1) * 5 <= 0) {
          return;
        }
        setPlanetPage(planetPage + 1);
        setSelectedPlanet(0);
      } else if (type == 'prevPage') {
        console.log('Here');
        if (planetPage == 0) {
          setSelectedPlanet(0);
          return;
        }
        setPlanetPage(planetPage - 1);
        setSelectedPlanet(0);
      }
    };

  return (
    <>
      {(selectedPlanet != 0 || planetPage != 0) && (
        <Button onClick={handlePlanet('prevPage')} style={{ left: '10%' }}>
          <NavigateBeforeIcon
            sx={{
              fontSize: '8rem',
              color: colors.purple,
              filter: 'drop-shadow(0px 0px 5px #fff)',
            }}
          />
        </Button>
      )}
      <Button onClick={handlePlanet('prev')} style={{ left: '20%' }}>
        {selectedPlanet + planetPage * 5 > 0 && (
          <NavigateBeforeIcon
            sx={{
              fontSize: '8rem',
              color: colors.skyBlue,
              filter: 'drop-shadow(0px 0px 5px #fff)',
            }}
          />
        )}
      </Button>
      {selectedPlanet + planetPage * 5 < totalLength - 1 && (
        <Button onClick={handlePlanet('next')} style={{ right: '20%' }}>
          {selectedPlanet < totalLength - 1 && (
            <NavigateNextIcon
              sx={{
                fontSize: '8rem',
                color: colors.skyBlue,
                filter: 'drop-shadow(0px 0px 5px #fff)',
              }}
            />
          )}
        </Button>
      )}

      {!(totalLength - (planetPage + 1) * 5 <= 0) && (
        <Button onClick={handlePlanet('nextPage')} style={{ right: '10%' }}>
          {selectedPlanet < totalLength - 1 && (
            <NavigateNextIcon
              sx={{
                fontSize: '8rem',
                color: colors.skyBlue,
                filter: 'drop-shadow(0px 0px 5px #fff)',
              }}
            />
          )}
        </Button>
      )}
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
