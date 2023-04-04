package com.god.b612.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Setter
@Getter
public class PlanetRequestDto {
    @ApiModelProperty(name = "행성 nft 시퀀스 넘버")
    @NotNull(message = "행성 nft 시퀀스 넘버를 입력해주세요.")
    @Min(value = 1, message = "행성 nft 시퀀스 넘버를 다시 확인해주세요.")
    int planetNftId;

    @ApiModelProperty(name = "행성에 좋아요 누른 사용자의 시퀀스 넘버")
    @NotNull(message = "행성에 좋아요 누른 사용자의 시퀀스 넘버를 입력해주세요.")
    @Min(value = 1, message = "행성에 좋아요 누른 사용자의 시퀀스 넘버를 다시 확인해주세요.")
    int planetLikeMemberId;



    //토글 방식으로 할거라서 이미 좋아요가 된 상태에서 한번 더 오면 삭제시킴

    @Builder
    PlanetRequestDto(int planetNftId, int planetLikeMemberId) {
        this.planetNftId = planetNftId;
        this.planetLikeMemberId = planetLikeMemberId;
    }
}
