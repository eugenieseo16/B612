import React from 'react';
import Box from '@mui/material/Box';

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  height: '70%',
  bgcolor: 'rgba(207, 181, 242, 0.7)',
  border: 'none',
  borderRadius: 5,

  p: 4,
};

function ItemsModal() {
  return (
    <Box sx={modalStyle}>
      <div>items</div>
    </Box>
  );
}

export default ItemsModal;
