// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "MintPlanetToken.sol";

contract SalePlanetToken {
    MintPlanetToken public mintPlanetTokenAddress;

    constructor (address _mintPlanetTokenAddress) {
        mintPlanetTokenAddress = MintPlanetToken(_mintPlanetTokenAddress);
    }

    mapping(uint256 => uint256) public planetPrices; // 가격 매핑

    uint256[] public onSalePlanetTokenArray;

    function setForSalePlanetToken(uint256 _planetTokenId, uint256 _price) public { // 판매 등록 
        address planetTokenOwner = mintPlanetTokenAddress.ownerOf(_planetTokenId);

        require(planetTokenOwner == msg.sender, "Caller is not planet token owner.");
        require(_price > 0, "Price is zero or lower.");
        require(planetPrices[_planetTokenId] == 0, "This planet token is already on sale.");
        require(mintPlanetTokenAddress.isApprovedForAll(planetTokenOwner, address(this)), "planet token owner did not approve token.");

        planetPrices[_planetTokenId] = _price;

        onSalePlanetTokenArray.push(_planetTokenId);
    }

    function purchasePlanetToken(uint256 _planetTokenId) public payable { // 구매 
        uint256 price = planetPrices[_planetTokenId];
        address planetTokenOnwer = mintPlanetTokenAddress.ownerOf(_planetTokenId);

        require(price > 0, "planet token not sale.");
        require(price <= msg.value, "Caller sent lower than price.");
        require(planetTokenOnwer != msg.sender, "Caller is planet token owner.");

        payable(planetTokenOnwer).transfer(msg.value);
        mintPlanetTokenAddress.safeTransferFrom(planetTokenOnwer, msg.sender, _planetTokenId);

        planetPrices[_planetTokenId] = 0;

        for(uint256 i = 0; i < onSalePlanetTokenArray.length; i++) {
            if(planetPrices[onSalePlanetTokenArray[i]] == 0) {
                onSalePlanetTokenArray[i] = onSalePlanetTokenArray[onSalePlanetTokenArray.length - 1];
                onSalePlanetTokenArray.pop();
            }
        }
    }

    function getOnSalePlanetTokenArray() view public returns (uint256[] memory) {
        return onSalePlanetTokenArray;
    }

    
    function getOnSalePlanetTokenArrayLength() view public returns (uint256) {
        return onSalePlanetTokenArray.length;
    }

    function getPlanetTokenPrice(uint256 _planetTokenId) view public returns (uint256) {
        return planetPrices[_planetTokenId];
    }
}