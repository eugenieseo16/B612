import roomIndexAtom from 'store/profile/roomIndexAtom';
import { useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import GlowingButton from '@components/common/GlowingButton';
import { useMobile } from '@hooks/useMobile';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { rgba } from 'emotion-rgba';
import { colors } from 'styles/colors';

const FloatingButtons = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  z-index: 9;

  > div {
    padding: 1rem 0rem;
  }
`;

function RoomNav() {
  const isMobile = useMobile();
  const [roomIndex, setRoomIndex] = useRecoilState(roomIndexAtom);
  const actions = [
    {
      icon: (
        <GlowingButton
          onClick={() => setRoomIndex(0)}
          selected={roomIndex === 0}
          icon={'chair'}
        />
      ),
      name: 'Home',
    },
    {
      icon: (
        <GlowingButton
          onClick={() => setRoomIndex(1)}
          selected={roomIndex === 1}
          icon={'user'}
        />
      ),
      name: 'Profile',
    },
    {
      icon: (
        <GlowingButton
          onClick={() => setRoomIndex(1)}
          selected={roomIndex === 1}
          icon={'planet'}
        />
      ),
      name: 'Planet',
    },
    {
      icon: (
        <GlowingButton
          onClick={() => setRoomIndex(3)}
          selected={roomIndex === 3}
          icon={'plant'}
        />
      ),
      name: 'Garden',
    },
  ];

  return (
    <>
      {!isMobile && (
        <FloatingButtons>
          <GlowingButton
            onClick={() => setRoomIndex(0)}
            selected={roomIndex === 0}
            icon={'chair'}
          />
          <GlowingButton
            onClick={() => setRoomIndex(1)}
            selected={roomIndex === 1}
            icon={'user'}
          />
          <GlowingButton
            onClick={() => setRoomIndex(2)}
            selected={roomIndex === 2}
            icon={'planet'}
          />
          <GlowingButton
            onClick={() => setRoomIndex(3)}
            selected={roomIndex === 3}
            icon={'plant'}
          />
        </FloatingButtons>
      )}

      {isMobile && (
        <MyDial
          direction="down"
          ariaLabel="SpeedDial basic example"
          icon={<SpeedDialIcon />}
        >
          {actions.map((action, i) => (
            <SpeedDialAction
              sx={{ background: rgba(colors.blue, 0.7) }}
              onClick={() => setRoomIndex(i)}
              key={action.name}
              icon={action.icon}
            />
          ))}
        </MyDial>
      )}
    </>
  );
}

export default RoomNav;

const MyDial = styled(SpeedDial)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  .MuiSpeedDial-fab {
    background-color: ${rgba(colors.darkBlue, 0.7)};
  }
`;
