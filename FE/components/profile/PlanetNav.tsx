import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import selectedPlanetAtom from 'store/profile/selectedPlanet';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { shadowGenerator, simpleShadow } from 'styles/utils';
import { colors } from 'styles/colors';

function PlanetNav() {
  const [selectedPlanet, setSelectedPlanet] =
    useRecoilState(selectedPlanetAtom);
  const handlePlanet = (type: 'next' | 'prev') => () => {
    if (type === 'next') {
      if (selectedPlanet == 5) return;
      setSelectedPlanet(selectedPlanet + 1);
    } else {
      if (selectedPlanet == 1) return;
      setSelectedPlanet(selectedPlanet - 1);
    }
  };
  return (
    <>
      <Button onClick={handlePlanet('prev')} style={{ left: '20%' }}>
        {selectedPlanet > 1 && (
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
        {selectedPlanet < 5 && (
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
