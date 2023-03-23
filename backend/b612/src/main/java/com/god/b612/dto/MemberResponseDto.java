package com.god.b612.dto;

import com.god.b612.entity.Tier;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Column;

@Getter
@Setter
public class MemberResponseDto {

    private int memberId;
    private String memberNickname;

    private String memberAddress;

    private String memberImage;

    private String memberTierName;

    private int memberCurrentScore;

    private int memberLiked;

    @Builder
    public MemberResponseDto(int memberId, String memberAddress, String memberNickname, String memberImage, String memberTierName, int memberCurrentScore, int memberLiked){
        this.memberId=memberId;
        this.memberAddress=memberAddress;
        this.memberNickname=memberNickname;
        this.memberImage=memberImage;
        this.memberTierName=memberTierName;
        this.memberCurrentScore=memberCurrentScore;
        this.memberLiked=memberLiked;
    }
}
