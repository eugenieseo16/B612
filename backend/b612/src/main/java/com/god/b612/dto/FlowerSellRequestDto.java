package com.god.b612.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
public class FlowerSellRequestDto {
    @ApiModelProperty(name = "구매자 시퀀스 넘버")
    @NotNull(message = "구매자 시퀀스 넘버를 입력해주세요.")
    @Min(value = 1, message = "구매자 시퀀스 넘버를 다시 확인해주세요.")
    int buyerId;
    @ApiModelProperty(name = "꽃 nft 시퀀스 넘버")
    @NotNull(message = "꽃 nft 시퀀스 넘버를 입력해주세요.")
    @Min(value = 1, message = "꽃 nft 시퀀스 넘버를 다시 확인해주세요.")
    int flowerNftId;
}
