package com.god.b612.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberResponseDtoForRank {
    private int memberId;

    private int rank;
    private String memberNickname;

    private String memberAddress;

    private String memberImage;

    private String memberTierName;

    private int memberCurrentScore;

    private int memberLiked;

    private int memberCharacter;

    @Builder
    public MemberResponseDtoForRank(int memberId, String memberAddress, String memberNickname, String memberImage, String memberTierName, int memberCurrentScore, int rank,int memberLiked,int memberCharacter) {
        this.memberId = memberId;
        this.memberAddress = memberAddress;
        this.memberNickname = memberNickname;
        this.memberImage = memberImage;
        this.memberTierName = memberTierName;
        this.memberCurrentScore = memberCurrentScore;
        this.rank = rank;
        this.memberLiked=memberLiked;
        this.memberCharacter=memberCharacter;
    }
}
