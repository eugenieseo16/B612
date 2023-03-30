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
        if (selectedPlanet == curPlanetsLength - 1) {
          setSelectedPlanet(0);
          return;
        }

        setSelectedPlanet(selectedPlanet + 1);
        return;
      }

      if (type == 'prev') {
        console.log(selectedPlanet);

        if (selectedPlanet == 0) {
          setSelectedPlanet(curPlanetsLength - 1);
          return;
        }
        setSelectedPlanet(selectedPlanet - 1);
      }
    };

  return (
    <>
      <Button onClick={handlePlanet('prev')} style={{ left: '20%' }}>
        prev
      </Button>
      <Button onClick={handlePlanet('next')} style={{ right: '20%' }}>
        next
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
