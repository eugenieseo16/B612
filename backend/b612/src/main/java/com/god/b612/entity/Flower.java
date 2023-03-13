package com.god.b612.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "flowers")
public class Flower {
    @Id
    @Column(name = "flower_nft_id")
    private int flowerNftId;

    private boolean flowerPlanted;

    @Builder
    public Flower(int flowerNftId, boolean flowerPlanted){
        this.flowerNftId=flowerNftId;
        this.flowerPlanted=flowerPlanted;
    }

}
