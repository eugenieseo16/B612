import { useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import GlowingButton from '@components/common/GlowingButton';
import { useMobile } from '@hooks/useMobile';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { rgba } from 'emotion-rgba';
import { colors } from 'styles/colors';
import mainModalAtom from 'store/main/mainModalAtom';

function MainNav() {
  const isMobile = useMobile();
  const [modalOpen, setModalOpen] = useRecoilState(mainModalAtom);
  const actions = [
    {
      icon: (
        <GlowingButton
          key={'friend'}
          selected={modalOpen.friend}
          onClick={() => setModalOpen({ certificate: false, friend: true })}
          icon={'friend'}
        />
      ),
      name: 'Friend',
    },
    {
      icon: (
        <GlowingButton
          key={'cert'}
          selected={modalOpen.certificate}
          onClick={() => setModalOpen({ certificate: true, friend: false })}
          icon={'certificate'}
        />
      ),
      name: 'Certificate',
    },
  ];

  return (
    <>
      {!isMobile && (
        <FloatingButtons>{actions.map(({ icon }) => icon)}</FloatingButtons>
      )}

      {isMobile && (
        <MyDial direction="up" ariaLabel="dial" icon={<SpeedDialIcon />}>
          {actions.map(action => (
            <SpeedDialAction
              sx={{ background: rgba(colors.blue, 0.7) }}
              key={action.name}
              icon={action.icon}
            />
          ))}
        </MyDial>
      )}
    </>
  );
}

export default MainNav;

const MyDial = styled(SpeedDial)`
  position: absolute;
  bottom: 5rem;
  right: 1rem;
  .MuiSpeedDial-fab {
    background-color: ${rgba(colors.darkBlue, 0.7)};
  }
`;
const FloatingButtons = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  z-index: 9;

  > div {
    padding: 1rem 0rem;
  }
`;
