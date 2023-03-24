package com.god.b612.controller;

import com.god.b612.dto.*;
import com.god.b612.model.BaseResponseBody;
import com.god.b612.service.FlowerService;
import com.god.b612.service.PlanetService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/planet")
@Api("플래닛(행성) api")
@RequiredArgsConstructor
public class PlanetController {
    @Autowired
    private final PlanetService planetService;

    @Autowired
    private final FlowerService flowerService;


    @Transactional
    @ApiOperation(value = "행성 좋아요를 생성하거나 삭제한다.", notes = "좋아요가 있는 사람이 누르면 삭제, 없는 사람이 누르면 생성")
    @PostMapping("/like")
    public ResponseEntity<BaseResponseBody> createOrDeleteLike(@RequestBody @ApiParam(value = "좋아요 하는 유저와 행성 id 입력", required = true) PlanetRequestDto planetRequestDto) {

        if (planetService.createAndDeleteLike(planetRequestDto.getPlanetNftId(), planetRequestDto.getPlanetLikeMemberId())) {

            BaseResponseBody baseResponseBody =
                    BaseResponseBody.builder()
                            .message("success")
                            .statusCode(200)
                            .build();

            return ResponseEntity.status(200).body(baseResponseBody);
        } else {
            BaseResponseBody baseResponseBody =
                    BaseResponseBody.builder()
                            .message("fail")
                            .statusCode(400)
                            .build();

            return ResponseEntity.status(400).body(baseResponseBody);
        }

    }


    @Transactional
    @ApiOperation(value = "행성의 좋아요 수를 확인한다.", notes = "행성 NFTID를 받아 좋아요 확인")
    @GetMapping("/like/{planetNftId}")
    public ResponseEntity<BaseResponseBody> findPlanetLike(@PathVariable("planetNftId") @ApiParam(value = "행성 nft 아이디", example = "0") int planetNftId) {
        PlanetResponseDto planetResponseDto = planetService.findPlanetLike(planetNftId);

        BaseResponseBody baseResponseBody =
                BaseResponseBody.builder()
                        .message("success")
                        .statusCode(200)
                        .responseData(planetResponseDto)
                        .build();

        return ResponseEntity.status(200).body(baseResponseBody);
    }

    @Transactional
    @ApiOperation(value = "행성의 좋아요 수 랭킹을 가져온다.", notes = "페이지와 사이즈를 입력하면 된다 페이지는 0부터 시작")
    @GetMapping("/ranking/{page}&{size}")
    public ResponseEntity<BaseResponseBody> getRanking(@PathVariable("page") int page, @PathVariable("size") int size) {
        List<PlanetResponseDtoForRank> planetResponseDtos = planetService.viewPlanetRanking(page, size);

        BaseResponseBody baseResponseBody =
                BaseResponseBody.builder()
                        .message("success")
                        .statusCode(200)
                        .responseData(planetResponseDtos)
                        .build();

        return ResponseEntity.status(200).body(baseResponseBody);

    }


    @Transactional
    @ApiOperation(value = "어떤 유저가 좋아요 한 행성을 확인한다.", notes = "유저 아이디와 페이지와 사이즈를 입력하면 된다 페이지는 0부터 시작")
    @GetMapping("{memberId}/like/{page}&{size}")
    public ResponseEntity<BaseResponseBody> getMemberLikePlanets(@PathVariable("memberId") int memberId, @PathVariable("page") int page, @PathVariable("size") int size) {
        List<PlanetResponseDto> planetResponseDtos = planetService.viewLikedPlanet(memberId, page, size);

        BaseResponseBody baseResponseBody =
                BaseResponseBody.builder()
                        .message("success")
                        .statusCode(200)
                        .responseData(planetResponseDtos)
                        .build();

        return ResponseEntity.status(200).body(baseResponseBody);
    }


    @Transactional
    @ApiOperation(value = "멤버가 특정 행성을 좋아요 했는지 행성을 확인한다.", notes = "유저 아이디와 행성 아이디를 입력한다")
    @GetMapping("/{memberId}&{planetId}")
    public ResponseEntity<BaseResponseBody> doesMemberLikeThatPlanet(@PathVariable("memberId") int memberId, @PathVariable("planetId") int planetId) {
        boolean check = planetService.checkSomeoneLiked(memberId, planetId);

        BaseResponseBody baseResponseBody =
                BaseResponseBody.builder()
                        .message("success")
                        .statusCode(200)
                        .responseData(check)
                        .build();

        return ResponseEntity.status(200).body(baseResponseBody);
    }


    @Transactional
    @ApiOperation(value = "행성의 주인을 변경한다(행성을 구매한다.)", notes = "바뀐 주인 유저 아이디와 행성 아이디를 입력한다")
    @PostMapping("/buy")
    public ResponseEntity<BaseResponseBody> buyPlanet(@RequestBody @ApiParam(value = "바뀔 주인 유저 id와 행성 nft Id를 입력한다.", required = true) PlanetBuyDto planetBuyDto) {
        PlanetResponseDto planetResponseDto = planetService.buyPlanet(planetBuyDto.getMemberId(), planetBuyDto.getPlanetId());

        if (planetResponseDto != null) {

            BaseResponseBody baseResponseBody =
                    BaseResponseBody.builder()
                            .message("success")
                            .statusCode(200)
                            .responseData(planetResponseDto)
                            .build();

            return ResponseEntity.status(200).body(baseResponseBody);
        } else {
            BaseResponseBody baseResponseBody =
                    BaseResponseBody.builder()
                            .message("fail")
                            .statusCode(400)
                            .build();

            return ResponseEntity.status(400).body(baseResponseBody);
        }

    }






}
