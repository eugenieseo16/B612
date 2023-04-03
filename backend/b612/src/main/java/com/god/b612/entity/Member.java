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
@Table(name = "members")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private int memberId;

    @NotNull
    private String memberNickname;

    @NotNull
    private String memberAddress;

    private String memberImage;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(referencedColumnName = "tier_id", name = "member_tier_id")
    private Tier memberTierId;

    @NotNull
    @ColumnDefault("0")
    private int memberHighestScore;

    @NotNull
    @ColumnDefault("0")
    private int memberCurrentScore;

    @Builder
    public Member(int memberId, String memberNickname, String memberAddress, String memberImage, Tier memberTierId, int memberHighestScore, int memberCurrentScore) {
        this.memberId = memberId;
        this.memberNickname = memberNickname;
        this.memberAddress = memberAddress;
        this.memberImage = memberImage;
        this.memberTierId = memberTierId;
        this.memberHighestScore = memberHighestScore;
        this.memberCurrentScore = memberCurrentScore;
    }
}
