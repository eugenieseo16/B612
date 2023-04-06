import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface BaobablistData {
  baobabArticleId: number;
  baobabArticleMemberId: number;
  baobabArticleContent: string;
  createdTime: number;
  updatedTime: number;
}

const BaobabArticleList: React.FC = () => {
  const [baobabArticleLists, setBaobabArticleLists] = useState<
    Array<BaobablistData>
  >([]);
  useEffect(() => {
    getBaobabArticleList();
  }, []);

  const getBaobabArticleList = async () => {
    // res는 http response의 header + body를 모두 갖고 있다.
    const res = await axios.get(
      'https://j8a208.p.ssafy.io/api/baobab/list?size=5&page=0'
    );
    console.log('fdfdsfdsf', res.data.responseData.content);
    setBaobabArticleLists(res.data.responseData.content);
  };
  return (
    <div>
      {baobabArticleLists.map((baobablistData: BaobablistData) => (
        <div key={baobablistData.baobabArticleId}>
          <div>{baobablistData.baobabArticleContent}</div>
        </div>
      ))}
    </div>
  );
};
export default BaobabArticleList;
