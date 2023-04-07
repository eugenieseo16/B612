import React, { memo, useState } from 'react';
import styled from '@emotion/styled';
import CreateBaobabArticle from './CreateBaobabArticle';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import BaobabArticleList from './BaobabArticleList';

const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 60%;
  background-color: #fdfcf3;
  border: none;
  border-radius: 30px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Baobabcontainer = styled.div`
  position: relative;
  margin: 2rem;
  padding: 1rem;
  width: 60%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const queryClient = new QueryClient();
const BaobabModal = memo(function SomeComponent() {
  const [refresh, setRefresh] = useState(false);

  const handleArticleCreated = () => {
    setRefresh(!refresh);
  };

  return (
    <Modal>
      <Title>바오밥나무</Title>
      <Baobabcontainer>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <CreateBaobabArticle onArticleCreated={handleArticleCreated} />
          </RecoilRoot>
          <BaobabArticleList refresh={refresh} />
        </QueryClientProvider>
      </Baobabcontainer>
    </Modal>
  );
});
export default BaobabModal;

// 바오밥나무에 글 작성	POST	api/baobab
// 바오밥나무 글 1개 조회	GET	api/baobab/detail/{baobabArticleId}
// 바오밥나무 글 최신순 조회- 페이징	GET	api/baobab/list
// 바오밥나무 글 수정	PUT	api/baobab
// 바오밥나무 글 삭제	DELETE	api/baobab/{baobabArticleId}
