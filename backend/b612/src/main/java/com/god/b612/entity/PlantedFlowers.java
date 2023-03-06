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
@Table(name = "planetFlowers")
public class PlantedFlowers {

    @Id
    private int flowerNftId;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name="planet_nft_id")
    private Planets planetNftId;

    @NotNull
    private int flowerLocationX;

    @NotNull
    private int flowerLocationY;

    @NotNull
    private int flowerLocationZ;

    @Builder
    public PlantedFlowers(int flowerNftId, Planets planetNftId, int flowerLocationX, int flowerLocationY, int flowerLocationZ){
        this.flowerNftId = flowerNftId;
        this.planetNftId = planetNftId;
        this.flowerLocationX = flowerLocationX;
        this.flowerLocationY = flowerLocationY;
        this.flowerLocationZ = flowerLocationZ;
    }

}
