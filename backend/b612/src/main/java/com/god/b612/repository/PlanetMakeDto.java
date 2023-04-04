package com.god.b612.repository;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlanetMakeDto {

    int planetNftId;

    int planetLikesCount;

    String planetName;

    int planetType;

    int ownerMemberId;

    boolean onSale;

    String createdAt;

    @Builder
    public PlanetMakeDto(int ownerMemberId, int planetNftId, boolean onSale, String createdAt, int planetLikesCount,String planetName,int planetType){
        this.planetNftId=planetNftId;
        this.ownerMemberId=ownerMemberId;
        this.onSale=onSale;
        this.createdAt=createdAt;
        this.planetLikesCount=planetLikesCount;
        this.planetName=planetName;
        this.planetType=planetType;
    }
}
