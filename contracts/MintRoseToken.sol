// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

import "SaleRoseToken.sol";

contract MintRoseToken is ERC721Enumerable {
    constructor() ERC721("h662Animals", "HAS") {}

    SaleRoseToken public saleRoseToken;

    struct RoseTokenData {
        uint256 roseTokenId; // 장미꽃 아이디
        uint256 rosePrice; // 장미꽃 가격 
        uint256 roseColor; // 장미꽃 색깔 
        uint256 roseType; // 장미꽃 종류(잡초, 해바라기 등)
        uint createdAt; // 씨앗 구매 시점 
    }

    mapping(uint256 => RoseTokenData) public b612RoseMap;

    function mintRoseToken(uint rosePrice) public {
        uint256 roseTokenId = totalSupply() + 1;

        uint256 tmp = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, roseTokenId))) % 1000 + 1;
        uint256 roseType;
        if(tmp<=3) { // 황금 장미꽃 
            roseType = 1;
        } else if(tmp<=33) { // 장미꽃 
            roseType = 2;
        } else if(tmp<=333) { // 해바라기 3, 민들레 4, 무궁화 5, 벚꽃 6
            roseType = tmp%4+3;
        } else { // 잡초 
            roseType = 10;
        }
        uint roseColor = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, roseTokenId))) % 16777215;
        RoseTokenData memory roseTokenData = RoseTokenData(roseTokenId, rosePrice, roseColor, roseType, block.timestamp);

        b612RoseMap[roseTokenId] = roseTokenData;

        _mint(msg.sender, roseTokenId);
    }

    function getRoseTokens(address _roseTokenOwner) view public returns (RoseTokenData[] memory) {
        uint256 balanceLength = balanceOf(_roseTokenOwner);

        require(balanceLength != 0, "Owner did not have token.");

        RoseTokenData[] memory roseTokenData = new RoseTokenData[](balanceLength);

        for(uint256 i = 0; i < balanceLength; i++) {
            uint256 roseTokenId = tokenOfOwnerByIndex(_roseTokenOwner, i);
            uint256 rosePrice = saleRoseToken.getRoseTokenPrice(roseTokenId);
            uint256 roseColor = b612RoseMap[roseTokenId].roseColor; // 장미꽃 색깔
            uint256 roseType = b612RoseMap[roseTokenId].roseType; // 장미꽃 유형
            uint createdAt = b612RoseMap[roseTokenId].createdAt; // 구매 시점 

            roseTokenData[i] = RoseTokenData(roseTokenId, rosePrice, roseColor, roseType, createdAt);
        }

        return roseTokenData;
    }

    function getOnSaleRose() view public returns (RoseTokenData[] memory) {
        uint256[] memory saleArray=saleRoseToken.getOnSaleRoseTokenArray();
        uint256 length = saleArray.length;

        RoseTokenData[] memory roseTokenData = new RoseTokenData[](length);

        for(uint256 i = 0; i < length; i++) {
            uint256 roseTokenId = saleArray[i];
            uint256 rosePrice = saleRoseToken.getRoseTokenPrice(roseTokenId);
            uint256 roseColor = b612RoseMap[roseTokenId].roseColor; // 행성 색깔 
            uint256 roseType = b612RoseMap[roseTokenId].roseType; // 행성 유형(모양)
            uint createdAt = b612RoseMap[roseTokenId].createdAt; // 구매 시점 

            roseTokenData[i] = RoseTokenData(roseTokenId, rosePrice, roseColor, roseType, createdAt);
        }

        return roseTokenData;
    }


    function setSaleRoseToken(address _saleRoseToken) public {
        saleRoseToken = SaleRoseToken(_saleRoseToken);
    }
}