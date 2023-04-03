package com.god.b612.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
public class PlantRequestDto {
    @ApiModelProperty(name = "꽃 nft 시퀀스 넘버")
    @NotNull(message = "꽃 nft 시퀀스 넘버를 입력해주세요.")
    @Min(value = 1, message = "꽃 nft 시퀀스 넘버를 다시 확인해주세요.")
    int flowerId;

    @ApiModelProperty(name = "꽃의 x좌표")
    @NotNull(message = "꽃의 x좌표를 입력해주세요.")
    double x;

    @ApiModelProperty(name = "꽃의 y좌표")
    @NotNull(message = "꽃의 y좌표")
    double y;

    @ApiModelProperty(name = "꽃의 z좌표")
    @NotNull(message = "꽃의 z좌표")
    double z;

}
