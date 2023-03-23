package com.god.b612.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PlanetRequestDto {
    int planetNftId;

    int planetLikeMemberId;

    //토글 방식으로 할거라서 이미 좋아요가 된 상태에서 한번 더 오면 삭제시킴

    @Builder
    PlanetRequestDto(int planetNftId, int planetLikeMemberId) {
        this.planetNftId = planetNftId;
        this.planetLikeMemberId = planetLikeMemberId;
    }
}
