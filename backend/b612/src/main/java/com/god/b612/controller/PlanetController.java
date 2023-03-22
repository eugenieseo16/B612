package com.god.b612.controller;

import com.god.b612.dto.FriendRequestDto;
import com.god.b612.dto.PlanetRequestDto;
import com.god.b612.dto.PlanetResponseDto;
import com.god.b612.model.BaseResponseBody;
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


    @Transactional
    @ApiOperation(value = "행성 좋아요를 생성하거나 삭제한다.", notes = "좋아요가 있는 사람이 누르면 삭제, 없는 사람이 누르면 생성")
    @PostMapping("/like")
    public ResponseEntity<BaseResponseBody> createOrDeleteLike(@RequestBody @ApiParam(value = "좋아요 하는 유저와 행성 id 입력", required = true)PlanetRequestDto planetRequestDto){

        if(planetService.createAndDeleteLike(planetRequestDto.getPlanetNftId(),planetRequestDto.getPlanetLikeMemberId())){

            BaseResponseBody baseResponseBody=
                    BaseResponseBody.builder()
                            .message("success")
                            .statusCode(200)
                            .build();

            return ResponseEntity.status(200).body(baseResponseBody);
        }
        else{
            BaseResponseBody baseResponseBody=
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
    public ResponseEntity<BaseResponseBody> findPlanetLike(@PathVariable("planetNftId") @ApiParam("행성 nft 아이디") int planetNftId){
        PlanetResponseDto planetResponseDto=planetService.findPlanetLike(planetNftId);

        BaseResponseBody baseResponseBody=
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
    public ResponseEntity<BaseResponseBody> getRanking(@PathVariable("page") int page,@PathVariable("size") int size){
        List<PlanetResponseDto> planetResponseDtos= planetService.viewPlanetRanking(page,size);

        BaseResponseBody baseResponseBody=
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
    public ResponseEntity<BaseResponseBody> getMemberLikePlanets(@PathVariable("memberId")int memberId,@PathVariable("page") int page,@PathVariable("size") int size){
        List<PlanetResponseDto> planetResponseDtos= planetService.viewLikedPlanet(memberId,page,size);

        BaseResponseBody baseResponseBody=
                BaseResponseBody.builder()
                        .message("success")
                        .statusCode(200)
                        .responseData(planetResponseDtos)
                        .build();

        return ResponseEntity.status(200).body(baseResponseBody);
    }



}
