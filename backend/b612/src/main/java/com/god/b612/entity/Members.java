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
@Table(name = "members")
public class Members {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private int memberId;

    @NotNull
    private String memberNickname;

    @NotNull
    private String memberAddress;

    @NotNull
    private String memberImage;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(referencedColumnName = "tier_id", name = "member_tier_id")
    private Tiers memberTierId;

    @Builder
    public Members(int memberId, String memberNickname, String memberAddress, String memberImage, Tiers memberTierId) {
        this.memberId = memberId;
        this.memberNickname = memberNickname;
        this.memberAddress = memberAddress;
        this.memberImage = memberImage;
        this.memberTierId = memberTierId;
    }
}
