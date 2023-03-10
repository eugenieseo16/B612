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
    private String memberNickname;

    private String memberAddress;

    private String memberImage;

    private String memberTierName;

    private int memberCurrentScore;

    @Builder
    public MemberResponseDto(String memberAddress, String memberNickname, String memberImage, String memberTierName, int memberCurrentScore){
        memberAddress=this.memberAddress;
        memberNickname=this.memberNickname;
        memberImage=this.memberImage;
        memberTierName=this.memberTierName;
        memberCurrentScore=this.memberCurrentScore;
    }
}
