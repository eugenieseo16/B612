package com.god.b612.service;

import com.god.b612.dto.MemberResponseDto;

public interface MemberService {
    public MemberResponseDto membersLoginOrRegist(String memberAddress);

    public MemberResponseDto memberSelectById(int memberId);

    public MemberResponseDto memberSelectByAddress(String memberAddress);

    public Boolean updateInfoByAddress(String url, String nickname, String address);
}
