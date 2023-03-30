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
}
interface IRose {}
