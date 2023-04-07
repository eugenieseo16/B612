import React, { memo, useState } from 'react';
import styled from '@emotion/styled';
import CreateBaobabArticle from './CreateBaobabArticle';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import BaobabArticleList from './BaobabArticleList';
import { Dialog, DialogTitle, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Baobabcontainer = styled.div`
  position: relative;
  margin: 2rem;
  padding: 1rem;
  width: 60%;
  height: 80%;
  display: flex;
  flex-direction: column;
`;
const BaobabTitle = styled.div`
  margin: 2rem;
  padding: 1rem;
  display: flex;
  justify-content: center;
`;

const queryClient = new QueryClient();
const BaobabModal = memo(function SomeComponent() {
  const [refresh, setRefresh] = useState(false);

  const [open, setOpen] = useState(true);

  const handleArticleCreated = () => {
    setRefresh(!refresh);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} fullWidth maxWidth="md" sx={{ borderRadius: '3rem' }}>
      <BaobabTitle>
        <h2>바오밥나무</h2>
      </BaobabTitle>
      <DialogTitle>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={{
            position: 'absolute',
            right: '1rem',
            top: '1rem',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Baobabcontainer>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <CreateBaobabArticle onArticleCreated={handleArticleCreated} />
          </RecoilRoot>
          <BaobabArticleList refresh={refresh} />
        </QueryClientProvider>
      </Baobabcontainer>
    </Dialog>
  );
});
export default BaobabModal;
