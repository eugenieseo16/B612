package com.god.b612.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
public class PlanetBuyDto {
    @ApiModelProperty(name = "행성 nft 시퀀스 넘버")
    @NotNull(message = "행성 nft 시퀀스 넘버를 입력해주세요.")
    @Min(value = 1, message = "행성 nft 시퀀스 넘버를 다시 확인해주세요.")
    int planetId;
    @ApiModelProperty(name = "사용자 시퀀스 넘버")
    @NotNull(message = "사용자 시퀀스 넘버를 입력해주세요.")
    @Min(value = 1, message = "사용자 시퀀스 넘버를 다시 확인해주세요.")
    int memberId;

}
