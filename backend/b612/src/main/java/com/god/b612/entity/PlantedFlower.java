package com.god.b612.entity;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "plantedFlowers")
public class PlantedFlower {

    @Id
    private int flowerNftId;

    @NotNull
    private double flowerLocationX;

    @NotNull
    private double flowerLocationY;

    @NotNull
    private double flowerLocationZ;

    @Builder
    public PlantedFlower(int flowerNftId, double flowerLocationX, double flowerLocationY, double flowerLocationZ) {
        this.flowerNftId = flowerNftId;
        this.flowerLocationX = flowerLocationX;
        this.flowerLocationY = flowerLocationY;
        this.flowerLocationZ = flowerLocationZ;
    }

}
