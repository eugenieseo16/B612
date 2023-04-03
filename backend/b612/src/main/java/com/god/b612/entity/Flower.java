package com.god.b612.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "flowers")
public class Flower {
    @Id
    @Column(name = "flower_nft_id")
    private int flowerNftId;


    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(referencedColumnName = "member_id", name = "flower_owner_id")
    private Member flowerOwnerId;

    private boolean flowerPlanted;

    @Builder
    public Flower(int flowerNftId, boolean flowerPlanted, Member flowerOwnerId){
        this.flowerNftId=flowerNftId;
        this.flowerPlanted=flowerPlanted;
        this.flowerOwnerId=flowerOwnerId;
    }

}
