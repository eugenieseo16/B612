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
@Table(name = "likes")
public class Likes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id")
    private int likeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
//    @JoinColumn(name = "planet_id")
    @JoinColumn(referencedColumnName = "planet_nft_id", name = "like_planet_nft_id")
    private Planets likePlanetNftId;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
//    @JoinColumn(name = "member_id")
    @JoinColumn(referencedColumnName = "member_id", name = "like_member_id")
    private Members likeMemberId;

    @Builder
    public Likes(Planets likePlanetNftId, Members likeMemberId){
        this.likePlanetNftId = likePlanetNftId;
        this.likeMemberId = likeMemberId;
    }

}
