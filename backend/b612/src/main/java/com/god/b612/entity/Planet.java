package com.god.b612.entity;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

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

    @Builder
    public Planet(int planetNftId, int planetLikesCount) {
        this.planetNftId = planetNftId;
        this.planetLikesCount = planetLikesCount;
    }

}
