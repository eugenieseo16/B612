interface IUser {
  memberAddress: string;
  memberCurrentScore: number;
  memberImage?: string;
  memberNickname: string;
  memberTierName: string;
  memberId: number;
  eth: number;
  isApproved?: boolean;
  planets: IPlanet[];
}

interface IPlanet {
  createdAt: string;
  planetAddress: string;
  planetColor: string;
  planetName: string;
  planetPrice: string;
  planetTokenId: string;
  planetType: string;
  userAddress: string;
  onSale: boolean;
}
interface IFlower {
  roseTokenId: string; // 장미꽃 아이디 uint256 rosePrice; // 장미꽃 가격(0)
  roseColor: string; // 장미꽃 색깔
  roseType: string; // 장미꽃 종류(잡초, 해바라기 등)
  createdAt: string; // 씨앗 생성 시점
  userAddress: string; // 해당 행성을 소유한 사용자 지갑 주소
  onSale: boolean; // 판매 여부
}
