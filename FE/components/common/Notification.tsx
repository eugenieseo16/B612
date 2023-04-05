import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useRecoilState, useRecoilValue } from 'recoil';
import loadingAtom from 'store/loadingAtom';
import Button from '@mui/material/Button';
import { rgba } from 'emotion-rgba';
import { colors } from 'styles/colors';

function Notification() {
  const [{ loading, type, message }, setLoading] = useRecoilState(loadingAtom);

  return (
    <Container
      animate={{
        opacity: !loading && type !== 'none' ? 1 : 0,
        display: !loading && type !== 'none' ? 'flex' : 'none',
      }}
    >
      <h2>{message ? message : type}</h2>
      <Button
        variant="contained"
        color="success"
        onClick={() => setLoading({ loading, type: 'none' })}
      >
        <span style={{ color: '#fff' }}>확인</span>
      </Button>
    </Container>
  );
}

export default Notification;

const Container = styled(motion.div)`
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${rgba(colors.orange, 0.8)};
  /* width: 20rem; */
  padding: 2rem;
  border-radius: 1rem;
  flex-direction: column;
  gap: 1rem;
`;
