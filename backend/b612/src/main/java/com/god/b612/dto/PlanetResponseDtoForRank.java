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

    int memberLiked;

    boolean onSale;

    String createdAt;

    String planetName;

    int planetType;

    String memberImage;

    @Builder
    PlanetResponseDtoForRank(int planetNftId, int planetLikeCount, int memberId, String memberNickName, String memberTierName, int memberCurrentScore, Integer rank, int memberLiked, boolean onSale, String createdAt,int planetType, String planetName, String memberImage) {
        this.memberId = memberId;
        this.memberCurrentScore = memberCurrentScore;
        this.memberNickName = memberNickName;
        this.memberTierName = memberTierName;
        this.planetNftId = planetNftId;
        this.planetLikeCount = planetLikeCount;
        this.rank = rank;
        this.memberLiked=memberLiked;
        this.onSale=onSale;
        this.createdAt=createdAt;
        this.planetType=planetType;
        this.planetName=planetName;
        this.memberImage=memberImage;
    }
}
