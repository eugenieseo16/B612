package com.god.b612.controller;

import com.god.b612.dto.FlowerRequestDto;
import com.god.b612.dto.FlowerResponseDto;
import com.god.b612.dto.FlowerSellRequestDto;
import com.god.b612.dto.PlantRequestDto;
import com.god.b612.model.BaseResponseBody;
import com.god.b612.service.FlowerService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/flower")
@Api("꽃(flower) api")
@RequiredArgsConstructor
public class FlowerController {

    @Autowired
    FlowerService flowerService;

    @ApiOperation(value = "꽃 등록(생성)", notes = "유저가 꽃을 뽑을 경우 이함수를 통해 db에 등록됩니다.")
    @PostMapping()
    public ResponseEntity<BaseResponseBody> registFlower(@RequestBody @Valid FlowerRequestDto flowerRequestDto) {
        FlowerResponseDto flowerResponseDto = flowerService.createFlower(flowerRequestDto.getFlowerNftId(), flowerRequestDto.getOwnerMemberId());

        BaseResponseBody baseResponseBody =
                BaseResponseBody.builder()
                        .message("success")
                        .statusCode(200)
                        .responseData(flowerResponseDto)
                        .build();


        return ResponseEntity.status(200).body(baseResponseBody);
    }


    @ApiOperation(value = "꽃 심어졌는지 확인", notes = "꽃이 심어져있을 경우 true 반환 아닐경우 false반환, 꽃이 없을경우 오류")
    @GetMapping("/{flowerNftId}")
    public ResponseEntity<BaseResponseBody> isItPlanted(@PathVariable("flowerNftId") int flowerId){
        Boolean check=flowerService.isItPlanted(flowerId);

        if(check==null){
            BaseResponseBody baseResponseBody =
                    BaseResponseBody.builder()
                            .message("fail")
                            .statusCode(400)
                            .build();


            return ResponseEntity.status(400).body(baseResponseBody);

        }

        BaseResponseBody baseResponseBody =
                BaseResponseBody.builder()
                        .message("success")
                        .statusCode(200)
                        .responseData(check)
                        .build();


        return ResponseEntity.status(200).body(baseResponseBody);
    }


    @Transactional
    @ApiOperation(value = "꽃을 유저 필드에 심는다.", notes = "꽃의 nft id, 필드내 꽃의 위치 좌표를 입력해 꽃을 심는다.")
    @PostMapping("/plant")
    public ResponseEntity<BaseResponseBody> plantFlower(@RequestBody @Valid PlantRequestDto plantRequestDto) {
        FlowerResponseDto flowerResponseDto = flowerService.plantFlower(plantRequestDto);

        BaseResponseBody baseResponseBody =
                BaseResponseBody.builder()
                        .message("success")
                        .statusCode(200)
                        .responseData(flowerResponseDto)
                        .build();

        return ResponseEntity.status(200).body(baseResponseBody);
    }


    @Transactional
    @ApiOperation(value = "꽃을 필드에서 뽑는다.", notes = "꽃의 NFT 아이디를 입력한다.")
    @DeleteMapping("/{flowerNftId}")
    public ResponseEntity<BaseResponseBody> deleteFlower(@PathVariable("flowerNftId") int flowerId) {

        if (flowerService.deleteFlower(flowerId)) {
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
    @ApiOperation(value = "특정 유저 필드에 있는 꽃들을 찾는다.", notes = "유저의 아이디를 입력한다.")
    @GetMapping("/field/{memberId}")
    public ResponseEntity<BaseResponseBody> selectFlowersInPlanet(@PathVariable("memberId") int memberId) {
        List<FlowerResponseDto> flowerResponseDtos=flowerService.selectFlowersInMember(memberId);

        BaseResponseBody baseResponseBody =
                BaseResponseBody.builder()
                        .message("success")
                        .statusCode(200)
                        .responseData(flowerResponseDtos)
                        .build();

        return ResponseEntity.status(200).body(baseResponseBody);
    }



    @Transactional
    @ApiOperation(value = "꽃의 주인을 변경한다.", notes = "주인이 될 유저 Id와 꽃의 NFTID를 입력한다.")
    @PostMapping("/sell")
    public ResponseEntity<BaseResponseBody> sellFlower(@RequestBody @Valid FlowerSellRequestDto flowerSellRequestDto){
        FlowerResponseDto flowerResponseDto=flowerService.sellFlower(flowerSellRequestDto.getBuyerId(), flowerSellRequestDto.getFlowerNftId());

        BaseResponseBody baseResponseBody =
                BaseResponseBody.builder()
                        .message("success")
                        .statusCode(200)
                        .responseData(flowerResponseDto)
                        .build();

        return ResponseEntity.status(200).body(baseResponseBody);
    }

}
