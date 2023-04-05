package com.god.b612.repository;

import com.god.b612.dto.MemberResponseDto;
import com.god.b612.dto.MemberResponseDtoForRank;
import com.god.b612.entity.Member;

import java.util.Map;

public interface MemberCustomRepository {
    MemberResponseDto createMemberResponseDtoByEntity(Member member);

    public Map<String, Object> makeRandomNickName();

    Boolean updateMember(String url, String address);

    MemberResponseDtoForRank makeMemberDtoForRank(Member member, int rank);

    MemberResponseDto makeMemberDto(Member member);
}
