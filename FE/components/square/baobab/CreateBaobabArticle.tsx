import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Button, Grid, TextField } from '@mui/material';
import styled from '@emotion/styled';
import { useMutation } from 'react-query';
import axios from 'axios';
import userAtom from 'store/userAtom';

const StyledGrid = styled(Grid)`
  padding: 1rem;
`;

const StyledTextField = styled(TextField)`
  margin: 1rem;
`;

const StyledButton = styled(Button)`
  margin: 0.5 rem;
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

const CreateBaobabArticle = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [content, setContent] = useState<string>('');

  const memberAddress = user?.memberAddress;
  console.log(user);

  const createPostMutation = useMutation(createPost, {
    onSuccess: () => {
      alert('글 작성 완료.');
    },
    onError: () => {
      alert('글 작성에 실패하였습니다.');
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!memberAddress) {
      alert('로그인을 해주세요.');
      return;
    }

    if (!content) {
      alert('글 내용을 입력해주세요.');
      return;
    }

    try {
      await createPostMutation.mutateAsync({
        baobabArticleContent: content,
        memberAddress,
      });
      setContent('');
    } catch (error) {
      console.error(error);
    }
  };

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    e.stopPropagation();
    // ChattingContainer에서 발생한 키보드 이벤트 처리
    // console.log('keydown event in ChattingContainer');
  }

  function handleWheel(e: React.WheelEvent<HTMLDivElement>) {
    e.stopPropagation();
    // ChattingContainer에서 발생한 마우스 스크롤 이벤트 처리
    // console.log('wheel event in ChattingContainer');
  }
  return (
    <div onKeyDown={handleKeyDown} onWheel={handleWheel}>
      <form onSubmit={handleSubmit}>
        <h4>바오밥나무에 낙서하기</h4>
        <StyledGrid container spacing={2}>
          <Grid item xs={9}>
            <StyledTextField
              required
              placeholder={
                user
                  ? '글을 남겨주세요'
                  : '로그인 후에 글을 작성할 수 있습니다.'
              }
              value={content}
              onChange={event => setContent(event.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <StyledButton fullWidth type="submit" variant="contained">
              낙서
            </StyledButton>
          </Grid>
        </StyledGrid>
      </form>
    </div>
  );
};
export default CreateBaobabArticle;
