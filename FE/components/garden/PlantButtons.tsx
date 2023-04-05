import styled from '@emotion/styled';
import { Button } from '@mui/material';
import React from 'react';
import { useRecoilState } from 'recoil';
import plantedFlowersAtom from 'store/garden/plantedFlowersAtom';
import selectedFlowerAtom from 'store/garden/selectedFlowerAtom';
import plantButtonAtom from 'store/garden/plantButtonAtom';
import positionAtom from 'store/garden/positionAtom';
import { Vector3 } from 'three';
import { apiBaseUrl } from 'API/apiURLs';
import axios from 'axios';

function PlantButtons() {
  const [{ show }, setShow] = useRecoilState(plantButtonAtom);
  const [selected, setSelected] = useRecoilState(selectedFlowerAtom);
  const [planted, setPlanted] = useRecoilState(plantedFlowersAtom);
  const [position, setPosition] = useRecoilState(positionAtom);

  const handleCancel = () => {
    setShow({ show: false, hold: false });
    setSelected(null);
    setPosition(new Vector3());
  };
  
  const handlePlant = () => {
    if (!selected) return;
    setPlanted([
      ...planted,
      {
        ...selected,
        flowerLocationX: position.x,
        flowerLocationY: position.y,
        flowerLocationZ: position.z,
      },
    ]);
    axios.post(`${apiBaseUrl}/flower/plant`, {
      flowerId: selected?.flowerNftId,
      x: position.x,
      y: position.y,
      z: position.z,
    });
    handleCancel();
  };

  return (
    <>
      {!show ? null : (
        <Container>
          <Button variant="contained" color="error" onClick={handleCancel}>
            <ButtonText style={{ color: '#fff' }}> 취소</ButtonText>
          </Button>
          <Button onClick={handlePlant} variant="contained" color="success">
            <ButtonText style={{ color: '#fff' }}> 심기</ButtonText>
          </Button>
        </Container>
      )}
    </>
  );
}

export default PlantButtons;

const Container = styled.div`
  display: flex;
  gap: 2rem;
  position: absolute;
  bottom: 10rem;
  transform: translate(50%, 50%);
  right: 50%;
  z-index: 999;
`;
const ButtonText = styled.h1`
  padding: 0 1rem;
  @media (max-width: 500px) {
    padding: 0;
    font-size: 1rem;
  }
`;
