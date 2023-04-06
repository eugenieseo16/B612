/* eslint-disable  */

import { useEffect, useState } from 'react';
import Web3 from 'web3';
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
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'status',
        type: 'string',
      },
    ],
    name: 'returnResult',
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
      {
        internalType: 'address',
        name: 'userAddress',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'onSale',
        type: 'bool',
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
    name: 'discardForSalePlanetToken',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
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
          {
            internalType: 'address',
            name: 'userAddress',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'onSale',
            type: 'bool',
          },
        ],
        internalType: 'struct PlanetToken.PlanetTokenData[]',
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
        internalType: 'struct PlanetToken.PlanetSalesLog[]',
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
          {
            internalType: 'address',
            name: 'userAddress',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'onSale',
            type: 'bool',
          },
        ],
        internalType: 'struct PlanetToken.PlanetTokenData[]',
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
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
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
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
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

const planetTokenAddress = '0x03DD8A0273a3ED1C15Dad07ec87f74861e6e355C';

export const usePlanetTokenContract = () => {
  const web3 = useWeb3();
  if (web3) return new web3.eth.Contract(planetTokenAbi, planetTokenAddress);
  return null;
};
export const usePlanetContract = () => {
  const provider =
    'https://lively-still-grass.ethereum-sepolia.discover.quiknode.pro/5474ef6df02aa3ac87fd5d092c7ea59303ff2d26/';
  const web3Provider = new Web3.providers.HttpProvider(provider);
  const [contract, setContract] = useState<any>();
  useEffect(() => {
    let web3 = new Web3(web3Provider);
    if (window.ethereum) web3 = new Web3(window.ethereum);
    const temp: any = new web3.eth.Contract(planetTokenAbi, planetTokenAddress);
    setContract(temp);
  }, []);
  return contract;
};
export const myWeb3 = () => {
  const provider =
    'https://lively-still-grass.ethereum-sepolia.discover.quiknode.pro/5474ef6df02aa3ac87fd5d092c7ea59303ff2d26/';
  const web3Provider = new Web3.providers.HttpProvider(provider);
  return new Web3(web3Provider);
};
