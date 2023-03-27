// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MintPlanetToken is ERC721Enumerable {
    constructor() ERC721("find your b612", "b612") {}

    struct PlanetTokenData {
        uint256 planetTokenId; // 행성 아이디
        uint256 planetPrice; // 행성 가격
        uint256 planetColor; // 행성 색깔
        uint256 planetType; // 행성 유형(모양)
        string planetName; // 행성 이름
        uint createdAt; // 구매 시점
        address userAddress; // 해당 행성을 소유한 사용자 지갑 주소
        bool onSale; // 판매 여부
    }

    struct PlanetSalesLog {
        uint256 planetPrice; // 판매된 가격
        address planetSeller; // 판매자
        address planetBuyer; // 구매자
        uint soldAt; // 판매 시점
        uint next; // 다음 노드 주소 저장
    }

    mapping(uint256 => PlanetTokenData) public b612AddressMap;
    mapping(uint256 => PlanetSalesLog) public planetSalesMap; // 행성 아이디와 판매 로그
    mapping(uint256 => uint256) public planetSalesCntMap; // 행성 아이디와 판매 로그 개수 저장
    mapping(uint256 => uint256) public planetPrices; // 가격 매핑
    uint256[] public onSalePlanetTokenArray; // 판매중인 행성 배열

    string[] one = [
        unicode"당당한 ",
        unicode"웅장한 ",
        unicode"아름다운 ",
        unicode"쾌적한 ",
        unicode"완벽한 ",
        unicode"노란 ",
        unicode"청량한 ",
        unicode"담백한 ",
        unicode"긴박한 ",
        unicode"차분한 ",
        unicode"깨끗한 ",
        unicode"군더더기 없는 ",
        unicode"무서운 ",
        unicode"경쾌한 ",
        unicode"분명한 ",
        unicode"느릿느릿한 ",
        unicode"달콤한 ",
        unicode"짜릿한 ",
        unicode"강렬한 ",
        unicode"유쾌한 ",
        unicode"건강한 ",
        unicode"성숙한 ",
        unicode"눈부신 ",
        unicode"화려한 ",
        unicode"파란 ",
        unicode"놀라운 ",
        unicode"정확한 ",
        unicode"빨간 ",
        unicode"환상적인 ",
        unicode"매혹적인 ",
        unicode"유연한 ",
        unicode"조용한 ",
        unicode"건조한 ",
        unicode"흥미로운 ",
        unicode"확실한 ",
        unicode"장엄한 ",
        unicode"멋진 ",
        unicode"은은한 ",
        unicode"유명한 ",
        unicode"높은 ",
        unicode"편안한 ",
        unicode"귀여운 ",
        unicode"깔끔한 ",
        unicode"귀중한 ",
        unicode"부드러운 ",
        unicode"느낌있는 ",
        unicode"행복한 ",
        unicode"대담한 ",
        unicode"세련된 ",
        unicode"감동적인 ",
        unicode"끝없는 ",
        unicode"부지런한 ",
        unicode"예쁜 ",
        unicode"진실된 ",
        unicode"적극적인 ",
        unicode"따뜻한 ",
        unicode"확고한 ",
        unicode"바쁜 ",
        unicode"괴상한 ",
        unicode"조용한 ",
        unicode"안정적인 ",
        unicode"강력한 ",
        unicode"경제적인 ",
        unicode"유용한 ",
        unicode"다양한 ",
        unicode"미끄러운 ",
        unicode"규칙적인 ",
        unicode"고통스러운 ",
        unicode"편안한 ",
        unicode"냉철한 ",
        unicode"빠른 ",
        unicode"매끄러운 ",
        unicode"매우 행복한 ",
        unicode"강력한 ",
        unicode"더러운 ",
        unicode"강렬한 ",
        unicode"창의적인 ",
        unicode"다채로운 ",
        unicode"멋진 ",
        unicode"예쁜 ",
        unicode"상냥한 ",
        unicode"시원한 ",
        unicode"아름다운 ",
        unicode"슬기로운 ",
        unicode"확신하는 ",
        unicode"유익한 ",
        unicode"낭만적인 ",
        unicode"성공적인 ",
        unicode"영광스러운 "
    ];

    string[] two = [
        unicode"애교쟁이",
        unicode"고양이",
        unicode"꼬마",
        unicode"귀요미",
        unicode"기린",
        unicode"금붕어",
        unicode"나비",
        unicode"날다람쥐",
        unicode"닭새",
        unicode"대왕",
        unicode"오징어",
        unicode"도롱뇽",
        unicode"도토리",
        unicode"두더지",
        unicode"라이언",
        unicode"라쿤",
        unicode"래서팬더",
        unicode"멍멍이",
        unicode"모닝콜",
        unicode"모기",
        unicode"물개",
        unicode"미어캣",
        unicode"바나나",
        unicode"바다거북",
        unicode"바다사자",
        unicode"바다표범",
        unicode"바이올린",
        unicode"배꼽",
        unicode"배추",
        unicode"뱀파이어",
        unicode"벌새",
        unicode"복숭아",
        unicode"부엉이",
        unicode"불나방",
        unicode"불독",
        unicode"비둘기",
        unicode"비버",
        unicode"빨간모자",
        unicode"산양",
        unicode"산토끼",
        unicode"상어",
        unicode"상추",
        unicode"새우",
        unicode"샐러드",
        unicode"어린왕자",
        unicode"선인장",
        unicode"솔개",
        unicode"순록",
        unicode"딸기",
        unicode"스케이트",
        unicode"비밀가든",
        unicode"아기돼지",
        unicode"아기사자",
        unicode"폭탄머리",
        unicode"아기토끼",
        unicode"알파카",
        unicode"열대어",
        unicode"여우",
        unicode"여우비",
        unicode"염소",
        unicode"오리",
        unicode"왕관",
        unicode"왕자님",
        unicode"왕자비",
        unicode"초코비",
        unicode"용",
        unicode"우편함",
        unicode"유니콘",
        unicode"유리구슬",
        unicode"은하수",
        unicode"자동차",
        unicode"자라",
        unicode"장미",
        unicode"재규어",
        unicode"젤리",
        unicode"조랑말",
        unicode"지네",
        unicode"참새",
        unicode"천사",
        unicode"초록색",
        unicode"치타",
        unicode"카푸치노",
        unicode"케익",
        unicode"케찹",
        unicode"커피",
        unicode"컴퓨터",
        unicode"코끼리",
        unicode"코알라",
        unicode"토끼",
        unicode"토마토",
        unicode"튤립",
        unicode"파인애플",
        unicode"팬더",
        unicode"펭귄",
        unicode"폭풍우"
    ];

    string[] three = [
        unicode"유쾌한 ",
        unicode"멋진 ",
        unicode"사랑스러운 ",
        unicode"재밌는 ",
        unicode"신나는 ",
        unicode"감동적인 ",
        unicode"아름다운 ",
        unicode"쾌적한 ",
        unicode"매력적인 ",
        unicode"위대한 ",
        unicode"혁신적인 ",
        unicode"유능한 ",
        unicode"독창적인 ",
        unicode"친근한 ",
        unicode"도전적인 ",
        unicode"단순한 ",
        unicode"자신감 넘치는 ",
        unicode"충실한 ",
        unicode"다양한 ",
        unicode"창의적인 ",
        unicode"대담한 ",
        unicode"실용적인 ",
        unicode"웅장한 ",
        unicode"열정적인 ",
        unicode"공감되는 ",
        unicode"꼼꼼한 ",
        unicode"귀여운 ",
        unicode"깔끔한 ",
        unicode"깜짝 놀란 ",
        unicode"기억에 남는 ",
        unicode"기발한 ",
        unicode"꿈을 이룬 ",
        unicode"남다른 ",
        unicode"노력하는 ",
        unicode"눈부신 ",
        unicode"능력 있는 ",
        unicode"능숙한 ",
        unicode"당당한 ",
        unicode"대단한 ",
        unicode"더러운 ",
        unicode"도움이 되는 ",
        unicode"독특한 ",
        unicode"말이 많은 ",
        unicode"멋진 ",
        unicode"무대위의 ",
        unicode"바쁜 ",
        unicode"발명가적인 ",
        unicode"배려하는 ",
        unicode"밝은 ",
        unicode"박력 있는 ",
        unicode"본능적인 ",
        unicode"부지런한 ",
        unicode"말 안듣는 ",
        unicode"불규칙한 ",
        unicode"비범한 ",
        unicode"빠른 ",
        unicode"사랑하는 ",
        unicode"살아있는 ",
        unicode"생동감 있는 ",
        unicode"선명한 ",
        unicode"선실한 ",
        unicode"솔직한 ",
        unicode"수다쟁이 ",
        unicode"숨겨진 ",
        unicode"슬기로운 ",
        unicode"시크한 ",
        unicode"시원한 ",
        unicode"실력있는 ",
        unicode"신비로운 ",
        unicode"신선한 ",
        unicode"신중한 ",
        unicode"야심찬 ",
        unicode"어두운 ",
        unicode"여유로운 ",
        unicode"역동적인 ",
        unicode"열정적인 ",
        unicode"예술적인 ",
        unicode"예쁜 ",
        unicode"예의 바른 ",
        unicode"완벽한 ",
        unicode"외향적인 ",
        unicode"용감한 ",
        unicode"우아한 ",
        unicode"웃긴 ",
        unicode"유머있는 ",
        unicode"유명한 ",
        unicode"유연한 ",
        unicode"유익한 ",
        unicode"MZ세대 ",
        unicode"자랑스러운 ",
        unicode"재능 있는 ",
        unicode"재치 있는 ",
        unicode"저돌적인 ",
        unicode"조용한 ",
        unicode"존경받는 ",
        unicode"적극적인 ",
        unicode"지혜로운 ",
        unicode"착한 ",
        unicode"천재적인 ",
        unicode"치밀한 ",
        unicode"친구같은 ",
        unicode"커다란 ",
        unicode"통찰력 있는 ",
        unicode"특별한 ",
        unicode"파격적인 ",
        unicode"풍부한 ",
        unicode"피식 웃는 ",
        unicode"허세부리는 ",
        unicode"혁신적인 ",
        unicode"현명한 ",
        unicode"화려한 ",
        unicode"확실한 ",
        unicode"활기찬 ",
        unicode"아련한 "
    ];

    string[] planetName = [
        unicode"풍덩별",
        unicode"힘찬별",
        unicode"은하별",
        unicode"신비별",
        unicode"단단별",
        unicode"폭신별",
        unicode"푸른별",
        unicode"청명별",
        unicode"벚꽃별",
        unicode"고요별",
        unicode"힙합별",
        unicode"낭만별"
    ];

    function mintPlanetToken() public {
        uint256 planetTokenId = totalSupply() + 1;
        uint planetColor = uint256(
            keccak256(
                abi.encodePacked(block.timestamp, msg.sender, planetTokenId)
            )
        ) % 16777215;
        uint planetType = uint256(
            keccak256(
                abi.encodePacked(block.timestamp, msg.sender, planetTokenId)
            )
        ) % 10;
        uint length = one.length;
        uint randomOne = uint256(
            keccak256(
                abi.encodePacked(block.timestamp, msg.sender, planetTokenId)
            )
        ) % length;
        length = two.length;
        uint randomTwo = uint256(
            keccak256(
                abi.encodePacked(block.timestamp, msg.sender, planetTokenId)
            )
        ) % length;
        length = three.length;
        uint randomThree = uint256(
            keccak256(
                abi.encodePacked(block.timestamp, msg.sender, planetTokenId)
            )
        ) % length;
        string memory name;
        name = string.concat(one[randomOne], two[randomTwo]);
        name = string.concat(name, unicode"처럼 ");
        name = string.concat(name, three[randomThree]);
        name = string.concat(name, planetName[planetType]);
        PlanetTokenData memory planetTokenData = PlanetTokenData(
            planetTokenId,
            0,
            planetColor,
            planetType,
            name,
            block.timestamp,
            msg.sender,
            false
        );

        b612AddressMap[planetTokenId] = planetTokenData;

        // 로그에 초기 정보 추가
        length = uint256(
            keccak256(
                abi.encodePacked(
                    planetTokenId,
                    msg.sender,
                    msg.sender,
                    block.timestamp
                )
            )
        );
        PlanetSalesLog memory planetSalesLog = PlanetSalesLog(
            0,
            msg.sender,
            msg.sender,
            block.timestamp,
            length
        );
        planetSalesMap[planetTokenId] = planetSalesLog;
        planetSalesCntMap[planetTokenId] = 1;

        _mint(msg.sender, planetTokenId);
    }

    function getPlanetTokens(
        address _planetTokenOwner
    ) public view returns (PlanetTokenData[] memory) {
        uint256 balanceLength = balanceOf(_planetTokenOwner);

        PlanetTokenData[] memory planetTokenData = new PlanetTokenData[](
            balanceLength
        );

        for (uint256 i = 0; i < balanceLength; i++) {
            uint256 planetTokenId = tokenOfOwnerByIndex(_planetTokenOwner, i);
            uint256 planetPrice = getPlanetTokenPrice(planetTokenId);
            uint256 planetColor = b612AddressMap[planetTokenId].planetColor; // 행성 색깔
            uint256 planetType = b612AddressMap[planetTokenId].planetType; // 행성 유형(모양)
            string memory planetName = b612AddressMap[planetTokenId].planetName; // 행성 이름
            uint createdAt = b612AddressMap[planetTokenId].createdAt; // 구매 시점
            address userAddress = b612AddressMap[planetTokenId].userAddress; // 판매 올린 사용자의 지갑 주소
            bool onSale = b612AddressMap[planetTokenId].onSale; // 판매 여부
            planetTokenData[i] = PlanetTokenData(
                planetTokenId,
                planetPrice,
                planetColor,
                planetType,
                planetName,
                createdAt,
                userAddress,
                onSale
            );
        }
        return planetTokenData;
    }

    function getOnSalePlanet() public view returns (PlanetTokenData[] memory) {
        uint256[] memory saleArray = getOnSalePlanetTokenArray();
        uint256 length = saleArray.length;

        PlanetTokenData[] memory planetTokenData = new PlanetTokenData[](
            length
        );

        for (uint256 i = 0; i < length; i++) {
            uint256 planetTokenId = saleArray[i];
            uint256 planetPrice = getPlanetTokenPrice(planetTokenId);
            uint256 planetColor = b612AddressMap[planetTokenId].planetColor; // 행성 색깔
            uint256 planetType = b612AddressMap[planetTokenId].planetType; // 행성 유형(모양)
            string memory planetName = b612AddressMap[planetTokenId].planetName; // 행성 이름
            uint createdAt = b612AddressMap[planetTokenId].createdAt; // 구매 시점
            address userAddress = b612AddressMap[planetTokenId].userAddress; // 판매 올린 사용자의 지갑 주소
            bool onSale = b612AddressMap[planetTokenId].onSale; // 판매 여부
            planetTokenData[i] = PlanetTokenData(
                planetTokenId,
                planetPrice,
                planetColor,
                planetType,
                planetName,
                createdAt,
                userAddress,
                onSale
            );
        }

        return planetTokenData;
    }

    function getPlanetSalesLog(
        uint256 _planetTokenId
    ) public view returns (PlanetSalesLog[] memory) {
        uint256 length = planetSalesCntMap[_planetTokenId];
        PlanetSalesLog[] memory planetSalesLog = new PlanetSalesLog[](length);
        uint nextAddress = planetSalesMap[_planetTokenId].next;
        planetSalesLog[0] = planetSalesMap[_planetTokenId];
        uint idx = 1;
        while (planetSalesMap[nextAddress].next > 0) {
            planetSalesLog[idx] = planetSalesMap[nextAddress];
            idx++;
            nextAddress = planetSalesMap[nextAddress].next;
        }

        return planetSalesLog;
    }

    function setForSalePlanetToken(
        uint256 _planetTokenId,
        uint256 _price
    ) public {
        // 판매 등록
        address planetTokenOwner = ownerOf(_planetTokenId);

        require(
            planetTokenOwner == msg.sender,
            "Caller is not planet token owner."
        );
        require(_price > 0, "Price is zero or lower.");
        require(
            planetPrices[_planetTokenId] == 0,
            "This planet token is already on sale."
        );
        require(
            isApprovedForAll(planetTokenOwner, address(this)),
            "planet token owner did not approve token."
        );

        planetPrices[_planetTokenId] = _price;
        b612AddressMap[_planetTokenId].onSale = true;

        onSalePlanetTokenArray.push(_planetTokenId);
    }

    function discardForSalePlanetToken(uint256 _planetTokenId) public {
        // 판매 등록 취소
        address planetTokenOwner = ownerOf(_planetTokenId);

        require(
            planetTokenOwner == msg.sender,
            "Caller is not planet token owner."
        );
        require(
            planetPrices[_planetTokenId] != 0,
            "This planet token is already not on sale."
        );
        require(
            isApprovedForAll(planetTokenOwner, address(this)),
            "planet token owner did not approve token."
        );

        planetPrices[_planetTokenId] = 0;
        b612AddressMap[_planetTokenId].onSale = false;

        for (uint256 i = 0; i < onSalePlanetTokenArray.length; i++) {
            if (planetPrices[onSalePlanetTokenArray[i]] == 0) {
                onSalePlanetTokenArray[i] = onSalePlanetTokenArray[
                    onSalePlanetTokenArray.length - 1
                ];
                onSalePlanetTokenArray.pop();
            }
        }
    }

    function purchasePlanetToken(uint256 _planetTokenId) public payable {
        // 구매
        uint256 price = planetPrices[_planetTokenId];
        address planetTokenOwner = ownerOf(_planetTokenId);

        require(price > 0, "planet token not sale.");
        require(price <= msg.value, "Caller sent lower than price.");
        require(
            planetTokenOwner != msg.sender,
            "Caller is planet token owner."
        );

        payable(planetTokenOwner).transfer(msg.value);
        this.safeTransferFrom(planetTokenOwner, msg.sender, _planetTokenId);

        b612AddressMap[_planetTokenId].userAddress = msg.sender;
        b612AddressMap[_planetTokenId].onSale = false;

        planetPrices[_planetTokenId] = 0;

        for (uint256 i = 0; i < onSalePlanetTokenArray.length; i++) {
            if (planetPrices[onSalePlanetTokenArray[i]] == 0) {
                onSalePlanetTokenArray[i] = onSalePlanetTokenArray[
                    onSalePlanetTokenArray.length - 1
                ];
                onSalePlanetTokenArray.pop();
            }
        }

        // 판매/구매 로그에 추가
        uint lastNode = findLastNode(_planetTokenId);
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
        PlanetSalesLog memory planetSalesLog = PlanetSalesLog(
            price,
            planetTokenOwner,
            msg.sender,
            block.timestamp,
            nextAddress
        );
        planetSalesMap[lastNode] = planetSalesLog;
        planetSalesCntMap[_planetTokenId]++;
    }

    // 판매/구매 로그에서 마지막 노드 찾기
    function findLastNode(
        uint256 _planetTokenId
    ) public view returns (uint256) {
        uint nextAddress = planetSalesMap[_planetTokenId].next;
        while (planetSalesMap[nextAddress].next != 0) {
            nextAddress = planetSalesMap[nextAddress].next;
        }
        return nextAddress;
    }

    function getOnSalePlanetTokenArray()
        public
        view
        returns (uint256[] memory)
    {
        return onSalePlanetTokenArray;
    }

    function getOnSalePlanetTokenArrayLength() public view returns (uint256) {
        return onSalePlanetTokenArray.length;
    }

    function getPlanetTokenPrice(
        uint256 _planetTokenId
    ) public view returns (uint256) {
        return planetPrices[_planetTokenId];
    }
}
