package com.god.b612.entity;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "plantedFlowers")
public class PlantedFlower {

    @Id
    private int flowerNftId;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(referencedColumnName = "planet_nft_id", name = "planet_nft_id")
    private Planet planetNftId;

    @NotNull
    private double flowerLocationX;

    @NotNull
    private double flowerLocationY;

    @NotNull
    private double flowerLocationZ;

    @Builder
    public PlantedFlower(int flowerNftId, Planet planetNftId, double flowerLocationX, double flowerLocationY, double flowerLocationZ) {
        this.flowerNftId = flowerNftId;
        this.planetNftId = planetNftId;
        this.flowerLocationX = flowerLocationX;
        this.flowerLocationY = flowerLocationY;
        this.flowerLocationZ = flowerLocationZ;
    }

}
