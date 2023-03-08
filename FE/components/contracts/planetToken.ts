import { AbiItem } from 'web3-utils';
import useWeb3 from '.';

const planetTokenAbi: AbiItem[] = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'approved',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'planetTokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'planetAddress',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'planetPrice',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'planetColor',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'planetType',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'planetName',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'createdAt',
            type: 'uint256',
          },
        ],
        internalType: 'struct MintPlanetToken.PlanetTokenData',
        name: 'data',
        type: 'tuple',
      },
    ],
    name: 'mintPlanetToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_salePlanetToken',
        type: 'address',
      },
    ],
    name: 'setSalePlanetToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'b612AddressMap',
    outputs: [
      {
        internalType: 'uint256',
        name: 'planetTokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'planetAddress',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'planetPrice',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'planetColor',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'planetType',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'planetName',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'createdAt',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getApproved',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getOnSalePlanet',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'planetTokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'planetAddress',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'planetPrice',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'planetColor',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'planetType',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'planetName',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'createdAt',
            type: 'uint256',
          },
        ],
        internalType: 'struct MintPlanetToken.PlanetTokenData[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_planetTokenOwner',
        type: 'address',
      },
    ],
    name: 'getPlanetTokens',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'planetTokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'planetAddress',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'planetPrice',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'planetColor',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'planetType',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'planetName',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'createdAt',
            type: 'uint256',
          },
        ],
        internalType: 'struct MintPlanetToken.PlanetTokenData[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
    ],
    name: 'isApprovedForAll',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'ownerOf',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'salePlanetToken',
    outputs: [
      {
        internalType: 'contract SalePlanetToken',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'tokenByIndex',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'tokenURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
const salePlanetTokenAbi: AbiItem[] = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_planetTokenId',
        type: 'uint256',
      },
    ],
    name: 'purchasePlanetToken',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_planetTokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_price',
        type: 'uint256',
      },
    ],
    name: 'setForSalePlanetToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_mintPlanetTokenAddress',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'getOnSalePlanetTokenArray',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getOnSalePlanetTokenArrayLength',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_planetTokenId',
        type: 'uint256',
      },
    ],
    name: 'getPlanetTokenPrice',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'mintPlanetTokenAddress',
    outputs: [
      {
        internalType: 'contract MintPlanetToken',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'onSalePlanetTokenArray',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'planetPrices',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

const planetTokenAddress = '0xC5C42932cc3dB7420a5AA8D70bfF4d0F6F8e3ec5';
const salePlanetTokenAddress = '0x1D4425c8314965B28E4bc7Fcee73C60f49B65714';

export const usePlanetTokenContract = () => {
  const web3 = useWeb3();
  if (web3) return new web3.eth.Contract(planetTokenAbi, planetTokenAddress);
  return null;
};

export const usePlanetSaleTokenContract = () => {
  const web3 = useWeb3();
  return new web3.eth.Contract(salePlanetTokenAbi, salePlanetTokenAddress);
};
