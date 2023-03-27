// // SPDX-License-Identifier: MIT

// pragma solidity ^0.8.0;

// import "MintRoseToken.sol";

// contract SaleRoseToken {
//     MintRoseToken public mintRoseTokenAddress;

//     constructor (address _mintRoseTokenAddress) {
//         mintRoseTokenAddress = MintRoseToken(_mintRoseTokenAddress);
//     }

//     mapping(uint256 => uint256) public rosePrices; // 가격 매핑

//     uint256[] public onSaleRoseTokenArray;

//     function setForSaleRoseToken(uint256 _roseTokenId, uint256 _price) public { // 판매 등록 
//         address roseTokenOwner = mintRoseTokenAddress.ownerOf(_roseTokenId);

//         require(roseTokenOwner == msg.sender, "Caller is not Rose token owner.");
//         require(_price > 0, "Price is zero or lower.");
//         require(rosePrices[_roseTokenId] == 0, "This Rose token is already on sale.");
//         require(mintRoseTokenAddress.isApprovedForAll(roseTokenOwner, address(this)), "Rose token owner did not approve token.");

//         rosePrices[_roseTokenId] = _price;

//         onSaleRoseTokenArray.push(_roseTokenId);
//     }

//     function purchaseRoseToken(uint256 _roseTokenId) public payable { // 구매 
//         uint256 price = rosePrices[_roseTokenId];
//         address roseTokenOwner = mintRoseTokenAddress.ownerOf(_roseTokenId);

//         require(price > 0, "Rose token not sale.");
//         require(price <= msg.value, "Caller sent lower than price.");
//         require(roseTokenOwner != msg.sender, "Caller is Rose token owner.");

//         payable(roseTokenOwner).transfer(msg.value);
//         mintRoseTokenAddress.safeTransferFrom(roseTokenOwner, msg.sender, _roseTokenId);

//         rosePrices[_roseTokenId] = 0;

//         // 판매중인 토큰 배열 수정 
//         for(uint256 i = 0; i < onSaleRoseTokenArray.length; i++) {
//             if(rosePrices[onSaleRoseTokenArray[i]] == 0) {
//                 onSaleRoseTokenArray[i] = onSaleRoseTokenArray[onSaleRoseTokenArray.length - 1];
//                 onSaleRoseTokenArray.pop();
//             }
//         }

//         // 판매/구매 로그에 추가
//         uint lastNode = findLastNode(_roseTokenId);
//         uint256 nextAddress = uint256(keccak256(abi.encodePacked(_roseTokenId, price, roseTokenOwner, msg.sender, block.timestamp)));
//         SharedLibraries.RoseSalesLog memory roseSalesLog = SharedLibraries.RoseSalesLog(price, roseTokenOwner, msg.sender, block.timestamp, nextAddress);
//         roseSalesMap[lastNode] = roseSalesLog;
//         roseSalesCntMap[_roseTokenId]++;

//     }

//     // 판매/구매 로그에서 마지막 노드 찾기 
//     function findLastNode(uint256 _roseTokenId) view public returns (uint256) {
//         uint nextAddress = roseSalesMap[_roseTokenId];
//         while(roseSalesMap[nextAddress] != 0) {
//             nextAddress = roseSalesMap[nextAddress].next;
//         }
//         return nextAddress;
//     }

//     function getOnSaleRoseTokenArray() view public returns (uint256[] memory) {
//         return onSaleRoseTokenArray;
//     }

    
//     function getOnSaleRoseTokenArrayLength() view public returns (uint256) {
//         return onSaleRoseTokenArray.length;
//     }

//     function getRoseTokenPrice(uint256 _roseTokenId) view public returns (uint256) {
//         return rosePrices[_roseTokenId];
//     }
// }