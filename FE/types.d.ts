interface IUser {
  memberAddress: string;
  memberCurrentScore: number;
  memberImage?: string;
  memberNickname: string;
  memberTierName: string;
  eth: number;
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
}
interface IRose {}
