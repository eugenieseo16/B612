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
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id")
    private int likeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(referencedColumnName = "planet_nft_id", name = "like_planet_nft_id")
    private Planet likePlanetNftId;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(referencedColumnName = "member_id", name = "like_member_id")
    private Member likeMemberId;

    @Builder
    public Like(Planet likePlanetNftId, Member likeMemberId){
        this.likePlanetNftId = likePlanetNftId;
        this.likeMemberId = likeMemberId;
    }

}
