package com.god.b612.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "planets")
public class Planets {

    @Id
    private int planetNftId;

    @NonNull
    @ColumnDefault("0")
    private int planetLikesCount;

    @Builder
    public Planets(int planetNftId, int planetLikesCount){
        this.planetNftId = planetNftId;
        this.planetLikesCount = planetLikesCount;
    }

}
