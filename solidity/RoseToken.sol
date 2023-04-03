// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract RoseToken is ERC721Enumerable {
    constructor() ERC721("find your b612", "b612") {}

    struct RoseTokenData {
        uint256 roseTokenId; // 장미꽃 아이디
        uint256 rosePrice; // 장미꽃 가격 
        uint256 roseColor; // 장미꽃 색깔 
        uint256 roseType; // 장미꽃 종류(잡초, 해바라기 등)
        uint createdAt; // 씨앗 구매 시점 
        address userAddress; // 해당 장미꽃을 소유한 사용자 지갑 주소
        bool onSale; // 판매 여부 
    }

    struct RoseSalesLog {
        uint256 rosePrice; // 판매된 가격
        address roseSeller; // 판매자
        address roseBuyer; // 구매자
        uint soldAt; // 판매 시점 
        uint next; // 다음 노드 주소 저장 
    }

    mapping(uint256 => RoseTokenData) public b612RoseMap; 
    mapping(uint256 => RoseSalesLog) public roseSalesMap; // 장미꽃 아이디와 판매 로그
    mapping(uint256 => uint256) public roseSalesCntMap; // 장미꽃 아이디와 판매 로그 개수 저장 
    mapping(uint256 => uint256) public rosePrices; // 가격 매핑

    uint256[] public onSaleRoseTokenArray; // 판매중인 장미꽃 배열 

    function mintRoseToken() public {
        uint256 roseTokenId = totalSupply() + 1;

        uint256 roseType = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, roseTokenId))) % 1000 + 1;
        uint roseColor = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, roseTokenId))) % 16777215;
        RoseTokenData memory roseTokenData = RoseTokenData(roseTokenId, 0, roseColor, roseType, block.timestamp, msg.sender, false);
        b612RoseMap[roseTokenId] = roseTokenData;
        // 로그에 초기 정보 추가
        uint next = uint256(keccak256(abi.encodePacked(roseTokenId, msg.sender, msg.sender, block.timestamp)));
        RoseSalesLog memory roseSalesLog = RoseSalesLog(0, msg.sender, msg.sender, block.timestamp, next);
        roseSalesMap[roseTokenId] = roseSalesLog;
        roseSalesCntMap[roseTokenId] = 1;

        _mint(msg.sender, roseTokenId);
    }

    function getRoseTokens(address _roseTokenOwner) view public returns (RoseTokenData[] memory) {
        uint256 balanceLength = balanceOf(_roseTokenOwner);

        RoseTokenData[] memory roseTokenData = new RoseTokenData[](balanceLength);

        for(uint256 i = 0; i < balanceLength; i++) {
            uint256 roseTokenId = tokenOfOwnerByIndex(_roseTokenOwner, i);
            uint256 rosePrice = getRoseTokenPrice(roseTokenId);
            uint256 roseColor = b612RoseMap[roseTokenId].roseColor; // 장미꽃 색깔
            uint256 roseType = b612RoseMap[roseTokenId].roseType; // 장미꽃 유형
            uint createdAt = b612RoseMap[roseTokenId].createdAt; // 구매 시점 
            address userAddress = b612RoseMap[roseTokenId].userAddress; // 소유자 지갑 주소
            bool onSale = b612RoseMap[roseTokenId].onSale; // 판매 여부 
            roseTokenData[i] = RoseTokenData(roseTokenId, rosePrice, roseColor, roseType, createdAt, userAddress, onSale);
        }

        return roseTokenData;
    }

    function getOnSaleRose() view public returns (RoseTokenData[] memory) {
        uint256[] memory saleArray=getOnSaleRoseTokenArray();
        uint256 length = saleArray.length;

        RoseTokenData[] memory roseTokenData = new RoseTokenData[](length);

        for(uint256 i = 0; i < length; i++) {
            uint256 roseTokenId = saleArray[i];
            uint256 rosePrice = getRoseTokenPrice(roseTokenId);
            uint256 roseColor = b612RoseMap[roseTokenId].roseColor; // 행성 색깔 
            uint256 roseType = b612RoseMap[roseTokenId].roseType; // 행성 유형(모양)
            uint createdAt = b612RoseMap[roseTokenId].createdAt; // 구매 시점 
            address userAddress = b612RoseMap[roseTokenId].userAddress; // 소유자 지갑 주소
            bool onSale = b612RoseMap[roseTokenId].onSale; // 판매 여부 
            roseTokenData[i] = RoseTokenData(roseTokenId, rosePrice, roseColor, roseType, createdAt, userAddress, onSale);
        }

        return roseTokenData;
    }

    function getRoseSalesLog(uint256 _roseTokenId) view public returns (RoseSalesLog[] memory) {
        uint256 length = roseSalesCntMap[_roseTokenId];
        RoseSalesLog[] memory roseSalesLog = new RoseSalesLog[](length);
        uint nextAddress = roseSalesMap[_roseTokenId].next;
        roseSalesLog[0] = roseSalesMap[_roseTokenId];
        uint idx = 1;
        while(roseSalesMap[nextAddress].next > 0){
            roseSalesLog[idx] = roseSalesMap[nextAddress];
            idx++;
            nextAddress = roseSalesMap[nextAddress].next;
        }
        return roseSalesLog;
    }

    function setForSaleRoseToken(uint256 _roseTokenId, uint256 _price) public { // 판매 등록 
        address roseTokenOwner = ownerOf(_roseTokenId);

        require(roseTokenOwner == msg.sender, "Caller is not Rose token owner.");
        require(_price > 0, "Price is zero or lower.");
        require(rosePrices[_roseTokenId] == 0, "This Rose token is already on sale.");
        require(isApprovedForAll(roseTokenOwner, address(this)), "Rose token owner did not approve token.");

        rosePrices[_roseTokenId] = _price;
        b612RoseMap[_roseTokenId].onSale = true;

        onSaleRoseTokenArray.push(_roseTokenId);
    }

    function discardForSaleRoseToken(uint256 _roseTokenId) public { // 판매 등록 취소
        address roseTokenOwner = ownerOf(_roseTokenId);

        require(roseTokenOwner == msg.sender, "Caller is not Rose token owner.");
        require(rosePrices[_roseTokenId] != 0, "This Rose token is already not on sale.");
        require(isApprovedForAll(roseTokenOwner, address(this)), "Rose token owner did not approve token.");

        rosePrices[_roseTokenId] = 0;
        b612RoseMap[_roseTokenId].onSale = false;
        
        // 판매중인 토큰 배열 수정 
        for(uint256 i = 0; i < onSaleRoseTokenArray.length; i++) {
            if(rosePrices[onSaleRoseTokenArray[i]] == 0) {
                onSaleRoseTokenArray[i] = onSaleRoseTokenArray[onSaleRoseTokenArray.length - 1];
                onSaleRoseTokenArray.pop();
            }
        }
    }

    function purchaseRoseToken(uint256 _roseTokenId) public payable { // 구매 
        uint256 price = rosePrices[_roseTokenId];
        address roseTokenOwner = ownerOf(_roseTokenId);

        require(price > 0, "msg : Rose token not sale.");
        require(price <= msg.value, "msg : Caller sent lower than price.");
        require(roseTokenOwner != msg.sender, "msg : Caller is Rose token owner.");

        payable(roseTokenOwner).transfer(msg.value);
        this.safeTransferFrom(roseTokenOwner, msg.sender, _roseTokenId);

        rosePrices[_roseTokenId] = 0;
        b612RoseMap[_roseTokenId].userAddress = msg.sender;
        b612RoseMap[_roseTokenId].onSale = false;

        // 판매중인 토큰 배열 수정 
        for(uint256 i = 0; i < onSaleRoseTokenArray.length; i++) {
            if(rosePrices[onSaleRoseTokenArray[i]] == 0) {
                onSaleRoseTokenArray[i] = onSaleRoseTokenArray[onSaleRoseTokenArray.length - 1];
                onSaleRoseTokenArray.pop();
            }
        }

        // 판매/구매 로그에 추가
        uint lastNode = findLastNode(_roseTokenId);
        uint nextAddress = uint256(keccak256(abi.encodePacked(_roseTokenId, price, roseTokenOwner, msg.sender, block.timestamp)));
        RoseSalesLog memory roseSalesLog = RoseSalesLog(price, roseTokenOwner, msg.sender, block.timestamp, nextAddress);
        roseSalesMap[lastNode] = roseSalesLog;
        roseSalesCntMap[_roseTokenId]++;

    }

    // 판매/구매 로그에서 마지막 노드 찾기 
    function findLastNode(uint256 _roseTokenId) view public returns (uint256) {
        uint nextAddress = roseSalesMap[_roseTokenId].next;
        while(roseSalesMap[nextAddress].next != 0) {
            nextAddress = roseSalesMap[nextAddress].next;
        }
        return nextAddress;
    }

    function getOnSaleRoseTokenArray() view public returns (uint256[] memory) {
        return onSaleRoseTokenArray;
    }

    function getOnSaleRoseTokenArrayLength() view public returns (uint256) {
        return onSaleRoseTokenArray.length;
    }

    function getRoseTokenPrice(uint256 _roseTokenId) view public returns (uint256) {
        return rosePrices[_roseTokenId];
    }
}