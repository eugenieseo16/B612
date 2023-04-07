import React, { SyntheticEvent, useState } from 'react';
import {
  Button,
  Grid,
  TextField,
  Snackbar,
  Alert,
  SnackbarCloseReason,
} from '@mui/material';
import styled from '@emotion/styled';
import { useMutation } from 'react-query';
import axios from 'axios';

interface CreateBaobabArticleProps {
  onArticleCreated: () => void;
}
const StyledForm = styled.form`
  width: 100%;
  margin-bottom: 2rem;
`;

const StyledGrid = styled(Grid)`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 1rem;
  width: 100%;
  align-items: center;
`;

const StyledTextField = styled(TextField)`
  margin: 0.5rem 1rem;
  height: 100%;
  width: 100%;
`;

const StyledButton = styled(Button)`
  margin: 1rem;

  width: 80%;

  background-color: #57cd0d;
  color: white;
  &:hover {
    background-color: #0dcd10;
  }
`;

const createPost = async (data: {
  baobabArticleContent: string;
  memberAddress: string;
}): Promise<void> => {
  const response = await axios.post(
    'https://j8a208.p.ssafy.io/api/baobab',
    data
  );
};

const CreateBaobabArticle = (props: CreateBaobabArticleProps) => {
  const [content, setContent] = useState<string>('');

  const memberAddress = '0x800fc0CaCd21C3EC9D65b637ab9AfBaa2bC47EEC';

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success'
  );
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const createPostMutation = useMutation(createPost, {
    onSuccess: () => {
      setSnackbarSeverity('success');
      setSnackbarMessage('글 작성 완료.');
      setSnackbarOpen(true);
      props.onArticleCreated(); // 글 작성이 완료되면 부모 컴포넌트에 알립니다.
    },
    onError: () => {
      setSnackbarSeverity('error');
      setSnackbarMessage('글 작성에 실패');
      setSnackbarOpen(true);
    },
  });
  const handleSnackbarClose = (
    event: React.SyntheticEvent<Element, Event> | Event
  ) => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!content) {
      alert('글 내용을 입력해주세요.');
      return;
    }

    try {
      await createPostMutation.mutateAsync({
        baobabArticleContent: content,
        memberAddress: memberAddress,
      });
      setContent('');
    } catch (error) {
      console.error(error);
    }
  };

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  function handleWheel(e: React.WheelEvent<HTMLDivElement>) {
    e.stopPropagation();
  }
  return (
    <div onKeyDown={handleKeyDown} onWheel={handleWheel}>
      <p>바오밥나무에 낙서하기</p>
      <StyledForm onSubmit={handleSubmit}>
        <StyledGrid container>
          <Grid xs={8}>
            <StyledTextField
              required
              placeholder="글을 남겨주세요"
              value={content}
              onChange={event => setContent(event.target.value)}
            />
          </Grid>
          <Grid xs={1}></Grid>
          <Grid xs={3}>
            <StyledButton fullWidth type="submit" variant="contained">
              낙서
            </StyledButton>
          </Grid>
        </StyledGrid>
      </StyledForm>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default CreateBaobabArticle;
