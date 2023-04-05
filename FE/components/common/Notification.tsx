import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useRecoilState, useRecoilValue } from 'recoil';
import loadingAtom from 'store/loadingAtom';

function Notification() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useRecoilState(loadingAtom);
  useEffect(() => {
    if (loading) return;
    setOpen(true);
  }, [loading]);
  return (
    <Container animate={{ opacity: 0, display: 'none' }}>
      Notification
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
  background-color: tomato;
  /* width: 20rem; */
  padding: 2rem;
  border-radius: 1rem;
`;
