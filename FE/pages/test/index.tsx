import Testmodal from './Testmodal';

const test = () => {
  //   const user = useRecoilValue(userAtom);

  return (
    <div>
      <Testmodal />
    </div>
  );
};

export default test;

// 바오밥나무에 글 작성	POST	api/baobab
// 바오밥나무 글 1개 조회	GET	api/baobab/detail/{baobabArticleId}
// 바오밥나무 글 최신순 조회- 페이징	GET	api/baobab/list
// 바오밥나무 글 수정	PUT	api/baobab
// 바오밥나무 글 삭제	DELETE	api/baobab/{baobabArticleId}
