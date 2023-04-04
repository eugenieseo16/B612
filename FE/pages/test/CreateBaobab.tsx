import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { Container, Typography, TextField, Button, Stack } from '@mui/material';
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

const CreateBaobao = () => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userAtom);
  const [content, setContent] = useState('');
  const createPostMutation = useMutation(createPost, {
    onSuccess: () => {
      router.push('/test');
    },
    onError: () => {
      alert('글 작성에 실패하였습니다.');
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      alert('로그인 후에 글을 작성할 수 있습니다.');
      router.push('/test');
      return;
    }

    const memberAddress = user.memberAddress;

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

  return (
    <FormContainer>
      <PostFormTitle>글 작성</PostFormTitle>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Stack spacing={2}>
          <TextField
            required
            fullWidth
            multiline
            rows={10}
            label="글 작성"
            variant="outlined"
            value={content}
            onChange={event => setContent(event.target.value)}
          />
          <SubmitButton type="submit" disabled={!user}>
            {createPostMutation.isLoading ? '작성 중...' : '작성하기'}
          </SubmitButton>
        </Stack>
      </form>
    </FormContainer>
  );
};

export default CreateBaobao;
