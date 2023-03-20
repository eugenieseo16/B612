// SPDX-License-Identifier: GPL-3.0
// referenced from https://docs.soliditylang.org/en/v0.8.19/solidity-by-example.html#simple-open-auction
pragma solidity ^0.8.4;

contract Auction {

    address payable public beneficiary;
    uint public auctionEndTime;
    uint public lowestPrice;
    uint public highestPrice;
    address public highestBidder;
    uint public highestBid;
    address public firstBidder;

    struct BidLog {
        address bidderAddress;
        uint next;
    }

    mapping(address => uint) pendingReturns;
    mapping(uint => address) addressMap; // index => 사용자 지갑 주소
    mapping(uint => BidLog) bidMap; // 인덱스 => 사용자 지갑 주소, next

    bool ended;

    event HighestBidIncreased(address bidder, uint amount);
    event AuctionEnded(address winner, uint amount);
    event CurrentBid(address bidderAddress, uint bid);
    event HighestBid(uint highestBid);
    event HighestBidder(address highestBidder);

    error AuctionAlreadyEnded();
    error BidNotHighEnough(uint highestBid);
    error AuctionNotYetEnded();
    error AuctionEndAlreadyCalled();
    error BidLowerThanLowestPrice();
    error BidHigherThanHighestPrice();

    constructor(
        uint biddingTime,
        address payable beneficiaryAddress,
        uint lowPrice,
        uint highPrice
    ) {
        beneficiary = beneficiaryAddress;
        auctionEndTime = block.timestamp + biddingTime;
        lowestPrice = lowPrice; // 판매자가 설정한 최저가 
        highestPrice = highPrice; // 판매자가 설정한 최고가 
    }

    function bid() external payable { // 입찰
        uint tmpBid;
        if (highestBidder == msg.sender)
            tmpBid = highestBid + msg.value;
        else 
            tmpBid = msg.value + pendingReturns[msg.sender];
        if (block.timestamp > auctionEndTime)
            revert AuctionAlreadyEnded();
        if (tmpBid <= highestBid)
            revert BidNotHighEnough(highestBid);
        if (tmpBid < lowestPrice)
            revert BidLowerThanLowestPrice();
        if (tmpBid > highestPrice)
            revert BidHigherThanHighestPrice();
        if (highestBid == 0) {
            firstBidder = msg.sender;
        }
        if (highestBid != 0) {
            pendingReturns[highestBidder] += highestBid; // 최고 가격이 바뀌었으니 바로 전 경매자는 돈 돌려주는 배열로 옮김
        }
        BidLog memory curBidLog = BidLog(msg.sender, uint256(keccak256(abi.encodePacked(msg.value, msg.sender, block.timestamp))));
        bidMap[findLastNode()] = curBidLog;
        highestBidder = msg.sender;
        highestBid = pendingReturns[highestBidder] + msg.value;
        pendingReturns[highestBidder] = 0;
        emit HighestBidIncreased(msg.sender, msg.value);
    }

    function getCurrrentBid(address bidderAddress) external returns (uint) { // 입찰자 지갑 주소로 현재 얼마를 입찰한 상태인지 리턴 
        uint ret;
        if (highestBidder == bidderAddress)
            ret = highestBid;
        else
            ret = pendingReturns[bidderAddress];
        emit CurrentBid(bidderAddress, ret);
        return ret;
    }

    function getHighestBid() external returns (uint) {
        emit HighestBid(highestBid);
        return highestBid;
    }

    function getHighestBidder() external returns (address) {
        emit HighestBidder(highestBidder);
        return highestBidder;
    }

    /// Withdraw a bid that was overbid.
    function withdraw() external returns (bool) {
        uint amount = pendingReturns[msg.sender];
        if (amount > 0) {
            pendingReturns[msg.sender] = 0;

            if (!payable(msg.sender).send(amount)) {
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

    

    /// Withdraw a bid that was overbid.
    function withdrawAll() external returns (bool) {
        uint nextAddress = 0;
        while(bidMap[nextAddress].bidderAddress != address(0)) {
            uint amount = pendingReturns[bidMap[nextAddress].bidderAddress];
            if (amount > 0) {
                pendingReturns[bidMap[nextAddress].bidderAddress] = 0;
                if (!payable(bidMap[nextAddress].bidderAddress).send(amount)) {
                    pendingReturns[bidMap[nextAddress].bidderAddress] = amount;
                    return false;
                }
            }
            nextAddress = bidMap[nextAddress].next;
        }
        return true;
    }

    function auctionEnd() external {
        // 1. Conditions
        if (block.timestamp < auctionEndTime)
            revert AuctionNotYetEnded();
        if (ended)
            revert AuctionEndAlreadyCalled();

        // 2. Effects
        ended = true;
        emit AuctionEnded(highestBidder, highestBid);

        // 3. Interaction
        beneficiary.transfer(highestBid);
    } 
    
    // 입찰 로그에서 마지막 노드 찾기 
    function findLastNode() view public returns (uint) {
        uint nextAddress = bidMap[0].next;
        while(bidMap[nextAddress].next != 0) {
            nextAddress = bidMap[nextAddress].next;
        }
        return nextAddress;
    }
}