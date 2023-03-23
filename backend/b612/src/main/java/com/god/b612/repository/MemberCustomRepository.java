package com.god.b612.repository;

import com.god.b612.dto.MemberResponseDto;
import com.god.b612.dto.MemberResponseDtoForRank;
import com.god.b612.entity.Member;

public interface MemberCustomRepository {
    MemberResponseDto createMemberResponseDtoByEntity(Member member);

    public String makeRandomNickName();

    Boolean updateMember(String url, String address);

    MemberResponseDtoForRank makeMemberDtoForRank(Member member);
}
