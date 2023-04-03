package com.god.b612.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlanetResponseDtoForRank {
    Integer rank;

    int memberId;

    String memberNickName;

    String memberTierName;

    int memberCurrentScore;

    int planetNftId;

    int planetLikeCount;

    @Builder
    PlanetResponseDtoForRank(int planetNftId, int planetLikeCount, int memberId, String memberNickName, String memberTierName, int memberCurrentScore, Integer rank) {
        this.memberId = memberId;
        this.memberCurrentScore = memberCurrentScore;
        this.memberNickName = memberNickName;
        this.memberTierName = memberTierName;
        this.planetNftId = planetNftId;
        this.planetLikeCount = planetLikeCount;
        this.rank = rank;
    }
}
