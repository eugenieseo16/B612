import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { TextField } from '@mui/material';
import styled from '@emotion/styled';
import { useMutation } from 'react-query';
import axios from 'axios';
import userAtom from 'store/userAtom';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const PostFormTitle = styled.header`
  padding: 1rem;
`;

const SubmitButton = styled.button`
  padding: 1rem;
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
    <FormContainer onKeyDown={handleKeyDown} onWheel={handleWheel}>
      <PostFormTitle>글 작성</PostFormTitle>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth
          multiline
          rows={10}
          label={user ? '글을 남겨주세요' : '로그인이 필요합니다.'}
          variant="outlined"
          placeholder={
            user ? '글을 남겨주세요' : '로그인 후에 글을 작성할 수 있습니다.'
          }
          value={content}
          onChange={event => setContent(event.target.value)}
        />
        <SubmitButton type="submit">
          {createPostMutation.isLoading ? '작성 중...' : '작성하기'}
        </SubmitButton>
      </form>
    </FormContainer>
  );
};

export default CreateBaobabArticle;
