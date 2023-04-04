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

    String memberImage;

    int planetNftId;

    int planetLikeCount;

    int memberLiked;

    boolean onSale;

    String createdAt;

    String planetName;

    int planetType;

    @Builder
    PlanetResponseDto(int planetNftId, int planetLikeCount, int memberId, int memberLiked, String memberNickName, String memberTierName, int memberCurrentScore, boolean onSale, String createdAt,int planetType, String planetName, String memberImage) {
        this.memberId = memberId;
        this.memberCurrentScore = memberCurrentScore;
        this.memberNickName = memberNickName;
        this.memberTierName = memberTierName;
        this.memberLiked=memberLiked;
        this.planetNftId = planetNftId;
        this.planetLikeCount = planetLikeCount;
        this.onSale=onSale;
        this.createdAt=createdAt;
        this.planetType=planetType;
        this.planetName=planetName;
        this.memberImage=memberImage;
    }
}
