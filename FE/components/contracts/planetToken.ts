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
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    name: 'GetOnSalePlanetTokenArray',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'GetOnSalePlanetTokenArrayLength',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'planetPrice',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'planetSeller',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'planetBuyer',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'soldAt',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'next',
            type: 'uint256',
          },
        ],
        indexed: false,
        internalType: 'struct MintPlanetToken.PlanetSalesLog[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    name: 'GetPlanetSalesLog',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'GetPlanetTokenPrice',
    type: 'event',
  },
  {
    anonymous: false,
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
            internalType: 'uint256',
            name: 'planetColor',
            type: 'uint256',
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
        indexed: false,
        internalType: 'struct MintPlanetToken.PlanetTokenData[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    name: 'GetPlanetTokens',
    type: 'event',
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
        internalType: 'uint256',
        name: 'planetColor',
        type: 'uint256',
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
        name: '_planetTokenId',
        type: 'uint256',
      },
    ],
    name: 'findLastNode',
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
            internalType: 'uint256',
            name: 'planetColor',
            type: 'uint256',
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
    name: 'getPlanetSalesLog',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'planetPrice',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'planetSeller',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'planetBuyer',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'soldAt',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'next',
            type: 'uint256',
          },
        ],
        internalType: 'struct MintPlanetToken.PlanetSalesLog[]',
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
            internalType: 'uint256',
            name: 'planetColor',
            type: 'uint256',
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
    inputs: [
      {
        internalType: 'uint256',
        name: 'planetPrice',
        type: 'uint256',
      },
    ],
    name: 'mint10PlanetTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'planetPrice',
        type: 'uint256',
      },
    ],
    name: 'mintPlanetToken',
    outputs: [],
    stateMutability: 'nonpayable',
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
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'planetSalesCntMap',
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
    name: 'planetSalesMap',
    outputs: [
      {
        internalType: 'uint256',
        name: 'planetPrice',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'planetSeller',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'planetBuyer',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'soldAt',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'next',
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
    name: 'purchasePlanetToken',
    outputs: [],
    stateMutability: 'payable',
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
];

const planetTokenAddress = '0x5d11e5aA756F16A6425a8bf5D17dD6B953C4fe46';

export const usePlanetTokenContract = () => {
  const web3 = useWeb3();
  if (web3) return new web3.eth.Contract(planetTokenAbi, planetTokenAddress);
  return null;
};
