// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./PlanetToken.sol";
import "./RoseToken.sol";

contract SaleToken {

    PlanetToken pt;
    RoseToken rt;

    constructor(address _planetAddress) {
        // pt = planetToken;
        pt = PlanetToken(_planetAddress);
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
        require(_price > 0, "Price is zero or lower.");
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
        SharedStructs.PlanetSalesLog memory planetSalesLog = SharedStructs.PlanetSalesLog(
            price,
            planetTokenOwner,
            msg.sender,
            block.timestamp,
            nextAddress
        );
        pt.setLogInPlanetSalesMap(lastNode, planetSalesLog);
        pt.cntUpPlanetSalesCntMap(_planetTokenId);
    }
}