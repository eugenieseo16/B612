package com.god.b612.entity;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "planets")
public class Planet {

    @Id
    @Column(name = "planet_nft_id")
    private int planetNftId;

    @NotNull
    @ColumnDefault("0")
    private int planetLikesCount;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(referencedColumnName = "member_id", name = "planet_member_id")
    private Member planetMemberId;

    boolean onSale;

    String createdAt;

    String planetName;

    int planetType;



    @Builder
    public Planet(int planetNftId, int planetLikesCount, Member planetMemberId, boolean onSale, String createdAt,int planetType, String planetName) {
        this.planetNftId = planetNftId;
        this.planetLikesCount = planetLikesCount;
        this.planetMemberId = planetMemberId;
        this.onSale=onSale;
        this.createdAt=createdAt;
        this.planetType=planetType;
        this.planetName=planetName;
    }

}
