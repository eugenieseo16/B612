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
  flowerNftId: string; // 장미꽃 아이디 uint256 rosePrice; // 장미꽃 가격(0)
  flowerPlanted: boolean;
  flowerType: number;
  onSale: boolean;
  ownerAddress: string;
  ownerId: number;
  ownerNickName: string;
  ownerTierName: string;
  createdAt: string;
  flowerLocationX: number;
  flowerLocationY: number;
  flowerLocationZ: number;
}
interface IRose extends IFlower {
  createdAt: string;
  roseTokenId: string;
  roseType: string;
  onSale: string;
}
