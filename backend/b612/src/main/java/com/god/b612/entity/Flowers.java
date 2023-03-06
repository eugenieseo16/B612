package com.god.b612.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "flowers")
public class Flowers {
    @Id
    private int flowerNftId;

    private boolean flowerPlanted;

    @Builder
    public Flowers(int flowerNftId, boolean flowerPlanted){
        this.flowerNftId=flowerNftId;
        this.flowerPlanted=flowerPlanted;
    }

}
