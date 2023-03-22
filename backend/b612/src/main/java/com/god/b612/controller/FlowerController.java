package com.god.b612.controller;

import com.god.b612.dto.FlowerRequestDto;
import com.god.b612.dto.FlowerResponseDto;
import com.god.b612.model.BaseResponseBody;
import com.god.b612.service.FlowerService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/flower")
@Api("꽃(flower) api")
@RequiredArgsConstructor
public class FlowerController {

    @Autowired
    FlowerService flowerService;

    @ApiOperation(value = "꽃 등록(생성)", notes = "유저가 꽃을 뽑을 경우 이함수를 통해 db에 등록됩니다.")
    @PostMapping()
    public ResponseEntity<BaseResponseBody> registFlower(@RequestBody FlowerRequestDto flowerRequestDto) {
        FlowerResponseDto flowerResponseDto = flowerService.createFlower(flowerRequestDto.getFlowerNftId(), flowerRequestDto.getOwnerMemberId());

        BaseResponseBody baseResponseBody =
                BaseResponseBody.builder()
                        .message("success")
                        .statusCode(200)
                        .responseData(flowerResponseDto)
                        .build();


        return ResponseEntity.status(200).body(baseResponseBody);
    }

}
