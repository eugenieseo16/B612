package com.god.b612.service;

import com.god.b612.dto.MemberResponseDto;
import com.god.b612.entity.Member;

public interface MemberService {
    public MemberResponseDto membersLoginOrRegist(String memberAddress);

    public MemberResponseDto memberSelectById(int memberId);

    public Boolean updateInfoByAddress(String url, String nickname, String address);
}
