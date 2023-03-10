// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

import "SalePlanetToken.sol";

contract MintPlanetToken is ERC721Enumerable {
    constructor() ERC721("h662Animals", "HAS") {}

    SalePlanetToken public salePlanetToken;

    struct PlanetTokenData {
        uint256 planetTokenId; // 행성 아이디
        uint256 planetAddress; // 행성 좌표 
        uint256 planetPrice; // 행성 가격 
        string planetColor; // 행성 색깔 
        uint256 planetType; // 행성 유형(모양)
        string planetName; // 행성 이름
        uint createdAt; // 구매 시점 
    }

    mapping(uint256 => PlanetTokenData) public b612AddressMap;

    function mintPlanetToken(PlanetTokenData calldata data) public {
        uint256 planetTokenId = totalSupply() + 1;

        // uint256 animalType = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, animalTokenId))) % 5 + 1;
        PlanetTokenData memory planetTokenData = PlanetTokenData(planetTokenId, data.planetAddress, data.planetPrice, 
        data.planetColor, data.planetType, data.planetName, block.timestamp);

        b612AddressMap[planetTokenId] = planetTokenData;

        _mint(msg.sender, planetTokenId);
    }

    function getPlanetTokens(address _planetTokenOwner) view public returns (PlanetTokenData[] memory) {
        uint256 balanceLength = balanceOf(_planetTokenOwner);

        require(balanceLength != 0, "Owner did not have token.");

        PlanetTokenData[] memory planetTokenData = new PlanetTokenData[](balanceLength);

        for(uint256 i = 0; i < balanceLength; i++) {
            uint256 planetTokenId = tokenOfOwnerByIndex(_planetTokenOwner, i);
            uint256 planetPrice = salePlanetToken.getPlanetTokenPrice(planetTokenId);
            uint256 planetAddress = b612AddressMap[planetTokenId].planetAddress; // 행성 좌표 
            string memory planetColor = b612AddressMap[planetTokenId].planetColor; // 행성 색깔 
            uint256 planetType = b612AddressMap[planetTokenId].planetType; // 행성 유형(모양)
            string memory planetName = b612AddressMap[planetTokenId].planetName; // 행성 이름
            uint createdAt = b612AddressMap[planetTokenId].createdAt; // 구매 시점 

            planetTokenData[i] = PlanetTokenData(planetTokenId, planetPrice, planetAddress, planetColor, planetType, planetName, createdAt);
        }

        return planetTokenData;
    }

    function getOnSalePlanet() view public returns (PlanetTokenData[] memory) {
        uint256[] memory saleArray=salePlanetToken.getOnSalePlanetTokenArray();
        uint256 length = saleArray.length;

        PlanetTokenData[] memory planetTokenData = new PlanetTokenData[](length);

        for(uint256 i = 0; i < length; i++) {
            uint256 planetTokenId = saleArray[i];
            uint256 planetPrice = salePlanetToken.getPlanetTokenPrice(planetTokenId);
            uint256 planetAddress = b612AddressMap[planetTokenId].planetAddress; // 행성 좌표 
            string memory planetColor = b612AddressMap[planetTokenId].planetColor; // 행성 색깔 
            uint256 planetType = b612AddressMap[planetTokenId].planetType; // 행성 유형(모양)
            string memory planetName = b612AddressMap[planetTokenId].planetName; // 행성 이름
            uint createdAt = b612AddressMap[planetTokenId].createdAt; // 구매 시점 

            planetTokenData[i] = PlanetTokenData(planetTokenId, planetPrice, planetAddress, planetColor, planetType, planetName, createdAt);
        }

        return planetTokenData;
    }


    function setSalePlanetToken(address _salePlanetToken) public {
        salePlanetToken = SalePlanetToken(_salePlanetToken);
    }
}