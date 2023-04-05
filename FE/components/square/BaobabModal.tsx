import React, { memo } from 'react';
import styled from '@emotion/styled';
import BaobabArticle from './BaobabArticle';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';

const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 70%;
  background-color: #fdfcf3;
  border: none;
  border-radius: 30px;
  padding: 30px;
`;
const queryClient = new QueryClient();
const BaobabModal = memo(function SomeComponent() {
  return (
    <Modal>
      <div>바오밥나무</div>

      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <BaobabArticle />
        </RecoilRoot>
      </QueryClientProvider>
    </Modal>
  );
});

export default BaobabModal;

// 바오밥나무에 글 작성	POST	api/baobab
// 바오밥나무 글 1개 조회	GET	api/baobab/detail/{baobabArticleId}
// 바오밥나무 글 최신순 조회- 페이징	GET	api/baobab/list
// 바오밥나무 글 수정	PUT	api/baobab
// 바오밥나무 글 삭제	DELETE	api/baobab/{baobabArticleId}