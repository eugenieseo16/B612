import React from 'react';
import Box from '@mui/material/Box';

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  height: '70%',
  bgcolor: 'rgba(188, 240, 250, 0.7)',
  border: 'none',
  borderRadius: 5,
  p: 4,
};

function FriendsModal() {
  return (
    <Box sx={modalStyle}>
      <div>friends</div>
    </Box>
  );
}

export default FriendsModal;
