package com.god.b612.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FlowerResponseDto {
    int flowerNftId;

    int ownerId;

    boolean flowerPlanted;

    String ownerTierName;

    String ownerNickName;

    int planetId;

    double flowerLocationX;

    double flowerLocationY;

    double flowerLocationZ;

    @Builder
    FlowerResponseDto(int flowerNftId, int ownerId, boolean flowerPlanted, String ownerNickName, String ownerTierName, int planetId, double flowerLocationX, double flowerLocationY, double flowerLocationZ) {
        this.flowerNftId = flowerNftId;
        this.ownerId = ownerId;
        this.flowerPlanted = flowerPlanted;
        this.ownerNickName = ownerNickName;
        this.ownerTierName = ownerTierName;
        this.planetId = planetId;
        this.flowerLocationX = flowerLocationX;
        this.flowerLocationY = flowerLocationY;
        this.flowerLocationZ = flowerLocationZ;
    }

}
