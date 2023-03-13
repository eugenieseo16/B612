package com.god.b612.service;

import com.god.b612.dto.MemberResponseDto;
import com.god.b612.entity.Member;

public interface MemberService {
    public MemberResponseDto MembersLoginOrRegist(String memberAddress);
}
