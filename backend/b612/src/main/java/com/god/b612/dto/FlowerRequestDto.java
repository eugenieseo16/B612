package com.god.b612.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
public class FlowerRequestDto {
    //뽑는 순간 소지품에 생성됨
    @ApiModelProperty(name = "꽃 nft 시퀀스 넘버")
    @NotNull(message = "꽃 nft 시퀀스 넘버를 입력해주세요.")
    @Min(value = 1, message = "꽃 nft 시퀀스 넘버를 다시 확인해주세요.")
    int flowerNftId;

    @ApiModelProperty(name = "소유자 시퀀스 넘버")
    @NotNull(message = "소유자 시퀀스 넘버를 입력해주세요.")
    @Min(value = 1, message = "소유자 시퀀스 넘버를 다시 확인해주세요.")
    int ownerMemberId;

    String createdAt;

    boolean onSale;

    int flowerType;

}
