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
    
    event GetRoseTokens(RoseTokenData[]);
    event GetRoseSalesLog(RoseSalesLog[]);
    event GetOnSaleRoseTokenArray(uint256[]);
    event GetOnSaleRoseTokenArrayLength(uint256);
    event GetRoseTokenPrice(uint256);

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
        // 로그에 초기 정보 추가
        uint next = uint256(keccak256(abi.encodePacked(roseTokenId, rosePrice, msg.sender, msg.sender, block.timestamp)));
        RoseSalesLog memory roseSalesLog = RoseSalesLog(rosePrice, msg.sender, msg.sender, block.timestamp, next);
        roseSalesMap[roseTokenId] = roseSalesLog;
        roseSalesCntMap[roseTokenId] = 1;

        _mint(msg.sender, roseTokenId);
    }

    function mint10RoseTokens(uint rosePrice) public {
        for(int i=0;i<10;i++) {
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
            // 로그에 초기 정보 추가
            uint next = uint256(keccak256(abi.encodePacked(roseTokenId, rosePrice, msg.sender, msg.sender, block.timestamp)));
            RoseSalesLog memory roseSalesLog = RoseSalesLog(rosePrice, msg.sender, msg.sender, block.timestamp, next);
            roseSalesMap[roseTokenId] = roseSalesLog;
            roseSalesCntMap[roseTokenId] = 1;
            _mint(msg.sender, roseTokenId);
        }
    }

    function getRoseTokens(address _roseTokenOwner) public returns (RoseTokenData[] memory) {
        uint256 balanceLength = balanceOf(_roseTokenOwner);

        require(balanceLength != 0, "Owner did not have token.");

        RoseTokenData[] memory roseTokenData = new RoseTokenData[](balanceLength);

        for(uint256 i = 0; i < balanceLength; i++) {
            uint256 roseTokenId = tokenOfOwnerByIndex(_roseTokenOwner, i);
            uint256 rosePrice = getRoseTokenPrice(roseTokenId);
            uint256 roseColor = b612RoseMap[roseTokenId].roseColor; // 장미꽃 색깔
            uint256 roseType = b612RoseMap[roseTokenId].roseType; // 장미꽃 유형
            uint createdAt = b612RoseMap[roseTokenId].createdAt; // 구매 시점 

            roseTokenData[i] = RoseTokenData(roseTokenId, rosePrice, roseColor, roseType, createdAt);
        }

        emit GetRoseTokens(roseTokenData);
        return roseTokenData;
    }

    function getOnSaleRose() public returns (RoseTokenData[] memory) {
        uint256[] memory saleArray=getOnSaleRoseTokenArray();
        uint256 length = saleArray.length;

        RoseTokenData[] memory roseTokenData = new RoseTokenData[](length);

        for(uint256 i = 0; i < length; i++) {
            uint256 roseTokenId = saleArray[i];
            uint256 rosePrice = getRoseTokenPrice(roseTokenId);
            uint256 roseColor = b612RoseMap[roseTokenId].roseColor; // 행성 색깔 
            uint256 roseType = b612RoseMap[roseTokenId].roseType; // 행성 유형(모양)
            uint createdAt = b612RoseMap[roseTokenId].createdAt; // 구매 시점 

            roseTokenData[i] = RoseTokenData(roseTokenId, rosePrice, roseColor, roseType, createdAt);
        }

        return roseTokenData;
    }

    function getRoseSalesLog(uint256 _roseTokenId) public returns (RoseSalesLog[] memory) {
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
        emit GetRoseSalesLog(roseSalesLog);
        return roseSalesLog;
    }

    function setForSaleRoseToken(uint256 _roseTokenId, uint256 _price) public { // 판매 등록 
        address roseTokenOwner = ownerOf(_roseTokenId);

        require(roseTokenOwner == msg.sender, "Caller is not Rose token owner.");
        require(_price > 0, "Price is zero or lower.");
        require(rosePrices[_roseTokenId] == 0, "This Rose token is already on sale.");
        require(isApprovedForAll(roseTokenOwner, address(this)), "Rose token owner did not approve token.");

        rosePrices[_roseTokenId] = _price;

        onSaleRoseTokenArray.push(_roseTokenId);
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

    function getOnSaleRoseTokenArray() public returns (uint256[] memory) {
        emit GetOnSaleRoseTokenArray(onSaleRoseTokenArray);
        return onSaleRoseTokenArray;
    }

    function getOnSaleRoseTokenArrayLength() public returns (uint256) {
        emit GetOnSaleRoseTokenArrayLength(onSaleRoseTokenArray.length);
        return onSaleRoseTokenArray.length;
    }

    function getRoseTokenPrice(uint256 _roseTokenId) view public returns (uint256) {
        return rosePrices[_roseTokenId];
    }
}