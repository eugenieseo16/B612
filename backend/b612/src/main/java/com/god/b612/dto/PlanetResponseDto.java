package com.god.b612.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlanetResponseDto {


    int memberId;

    String memberNickName;

    String memberTierName;

    int memberCurrentScore;

    int planetNftId;

    int planetLikeCount;

    int memberLiked;

    @Builder
    PlanetResponseDto(int planetNftId, int planetLikeCount, int memberId, int memberLiked, String memberNickName, String memberTierName, int memberCurrentScore) {
        this.memberId = memberId;
        this.memberCurrentScore = memberCurrentScore;
        this.memberNickName = memberNickName;
        this.memberTierName = memberTierName;
        this.memberLiked=memberLiked;
        this.planetNftId = planetNftId;
        this.planetLikeCount = planetLikeCount;
    }
}
