// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./PlanetToken.sol";
import "./RoseToken.sol";

contract SaleToken {

    PlanetToken pt;
    RoseToken rt;

    constructor(address _planetAddress, address _roseAddress) {
        pt = PlanetToken(_planetAddress);
        rt = RoseToken(_roseAddress);
    }

    function setForSalePlanetToken(
        uint256 _planetTokenId,
        uint256 _price
    ) public {
        // 판매 등록
        address planetTokenOwner = pt.ownerOf(_planetTokenId);

        require(
            planetTokenOwner == msg.sender,
            "Caller is not planet token owner."
        );
        require(_price >= 10000000000000000, "Price is too low. Should be more than 10^16");
        require(
            pt.getPlanetPrices(_planetTokenId) == 0,
            "This planet token is already on sale."
        );
        require(
            pt.isApprovedForAll(planetTokenOwner, address(pt)),
            "planet token owner did not approve token."
        );

        pt.setPlanetPrices(_planetTokenId, _price);
        pt.setSaleOfB612AddressMap(_planetTokenId, true);

        pt.pushOnSalePlanetTokenArray(_planetTokenId);
    }

    function getPlanetTokenOwner(uint256 _planetTokenId) public view returns (address) {
        return pt.ownerOf(_planetTokenId);
    }

    function discardForSalePlanetToken(uint256 _planetTokenId) public {
        // 판매 등록 취소
        address planetTokenOwner = pt.ownerOf(_planetTokenId);

        require(
            planetTokenOwner == msg.sender,
            "Caller is not planet token owner."
        );
        require(
            pt.getPlanetPrices(_planetTokenId) != 0,
            "This planet token is already not on sale."
        );
        require(
            pt.isApprovedForAll(planetTokenOwner, address(pt)),
            "planet token owner did not approve token."
        );

        pt.setPlanetPrices(_planetTokenId, 0);
        pt.setSaleOfB612AddressMap(_planetTokenId, false);

        for (uint256 i = 0; i < pt.getOnSalePlanetTokenArrayLength(); i++) {
            if (pt.getPlanetPrices(pt.getOnSalePlanetTokenArray(i)) == 0) {
                pt.setOnSalePlanetTokenArray(i, pt.getOnSalePlanetTokenArray(
                    pt.getOnSalePlanetTokenArrayLength() - 1
                ));
                pt.popOnSalePlanetTokenArray();
            }
        }
    }

    function purchasePlanetToken(uint256 _planetTokenId) public payable {
        // 구매
        uint256 price = pt.getPlanetPrices(_planetTokenId);
        address planetTokenOwner = pt.ownerOf(_planetTokenId);

        require(price > 0, "planet token not sale.");
        require(price <= msg.value, "Caller sent lower than price.");
        require(
            planetTokenOwner != msg.sender,
            "Caller is planet token owner."
        );

        payable(planetTokenOwner).transfer(msg.value);
        pt.safeTransferFrom(planetTokenOwner, msg.sender, _planetTokenId);

        pt.setUserAddressOfB612AddressMap(_planetTokenId, msg.sender);
        pt.setSaleOfB612AddressMap(_planetTokenId, false);

        pt.setPlanetPrices(_planetTokenId, 0);

        for (uint256 i = 0; i < pt.getOnSalePlanetTokenArrayLength(); i++) {
            if (pt.getPlanetPrices(pt.getOnSalePlanetTokenArray(i)) == 0) {
                pt.setOnSalePlanetTokenArray(i, pt.getOnSalePlanetTokenArray(
                    pt.getOnSalePlanetTokenArrayLength() - 1
                ));
                pt.popOnSalePlanetTokenArray();
            }
        }

        // 판매/구매 로그에 추가
        uint lastNode = pt.findLastNode(_planetTokenId);
        uint nextAddress = uint256(
            keccak256(
                abi.encodePacked(
                    _planetTokenId,
                    price,
                    planetTokenOwner,
                    msg.sender,
                    block.timestamp
                )
            )
        );
        SharedPlanetStructs.PlanetSalesLog memory planetSalesLog = SharedPlanetStructs.PlanetSalesLog(
            price,
            planetTokenOwner,
            msg.sender,
            block.timestamp,
            nextAddress
        );
        pt.setLogInPlanetSalesMap(lastNode, planetSalesLog);
        pt.cntUpPlanetSalesCntMap(_planetTokenId);
    }

      function setForSaleRoseToken(uint256 _roseTokenId, uint256 _price) public { // 판매 등록 
        address roseTokenOwner = rt.ownerOf(_roseTokenId);

        require(roseTokenOwner == msg.sender, "Caller is not Rose token owner.");
        require(_price >= 10000000000000000, "Price is too low. Should be more than 10^16");
        require(rt.getRoseTokenPrice(_roseTokenId) == 0, "This Rose token is already on sale.");
        require(rt.isApprovedForAll(roseTokenOwner, address(this)), "Rose token owner did not approve token.");

        rt.setRosePrices(_roseTokenId, _price);
        rt.setSaleOfB612RoseMap(_roseTokenId, true);

        rt.pushOnSaleRoseTokenArray(_roseTokenId);
    }

    function discardForSaleRoseToken(uint256 _roseTokenId) public { // 판매 등록 취소
        address roseTokenOwner = rt.ownerOf(_roseTokenId);

        require(roseTokenOwner == msg.sender, "Caller is not Rose token owner.");
        require(rt.getRoseTokenPrice(_roseTokenId) != 0, "This Rose token is already not on sale.");
        require(rt.isApprovedForAll(roseTokenOwner, address(rt)), "Rose token owner did not approve token.");

        rt.setRosePrices(_roseTokenId, 0);
        rt.setSaleOfB612RoseMap(_roseTokenId, false);
        
        // 판매중인 토큰 배열 수정 
        for(uint256 i = 0; i < rt.getOnSaleRoseTokenArrayLength(); i++) {
            if(rt.getRoseTokenPrice(rt.getOnSaleRoseTokenArray(i)) == 0) {
                rt.setOnSaleRoseTokenArray(i, rt.onSaleRoseTokenArray(rt.getOnSaleRoseTokenArrayLength() - 1));
                rt.popOnSaleRoseTokenArray();
            }
        }
    }

    function purchaseRoseToken(uint256 _roseTokenId) public payable { // 구매 
        uint256 price = rt.getRoseTokenPrice(_roseTokenId);
        address roseTokenOwner = rt.ownerOf(_roseTokenId);

        require(price > 0, "msg : Rose token not sale.");
        require(price <= msg.value, "msg : Caller sent lower than price.");
        require(roseTokenOwner != msg.sender, "msg : Caller is Rose token owner.");

        payable(roseTokenOwner).transfer(msg.value);
        rt.safeTransferFrom(roseTokenOwner, msg.sender, _roseTokenId);

        rt.setRosePrices(_roseTokenId, 0);
        rt.setUserAddressOfB612RoseMap(_roseTokenId, msg.sender);
        rt.setSaleOfB612RoseMap(_roseTokenId, false);

        // 판매중인 토큰 배열 수정 
        for(uint256 i = 0; i < rt.getOnSaleRoseTokenArrayLength(); i++) {
            if(rt.getRoseTokenPrice(rt.getOnSaleRoseTokenArray(i)) == 0) {
                rt.setOnSaleRoseTokenArray(i, rt.getOnSaleRoseTokenArray(rt.getOnSaleRoseTokenArrayLength() - 1));
                rt.popOnSaleRoseTokenArray();
            }
        }

        // 판매/구매 로그에 추가
        uint lastNode = rt.findLastNode(_roseTokenId);
        uint nextAddress = uint256(keccak256(abi.encodePacked(_roseTokenId, price, roseTokenOwner, msg.sender, block.timestamp)));
        SharedRoseStructs.RoseSalesLog memory roseSalesLog = SharedRoseStructs.RoseSalesLog(price, roseTokenOwner, msg.sender, block.timestamp, nextAddress);
        rt.setLogInRoseSalesMap(lastNode, roseSalesLog);
        rt.cntUpRoseSalesCntMap(_roseTokenId);

    }

}