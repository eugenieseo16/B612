package com.god.b612.service;

import com.god.b612.dto.MemberResponseDto;
import com.god.b612.dto.MemberResponseDtoForRank;
import com.god.b612.dto.PlanetMakeDto;
import com.god.b612.dto.PlanetResponseDto;

import java.util.List;

public interface MemberService {
    public MemberResponseDto membersLoginOrRegist(String memberAddress);

    MemberResponseDto reloadUser(List<PlanetMakeDto> planetMakeDtos,int memberId);

    public MemberResponseDto memberSelectById(int memberId);

    public MemberResponseDto memberSelectByAddress(String memberAddress);

    public Boolean updateInfoByAddress(String url, String address);

    public Boolean checkNickname(String nickname);

    public MemberResponseDto changeNickname(int memberId, String nickname);

    public List<MemberResponseDto> searchMember(String string);

    List<MemberResponseDtoForRank> viewRank(int page, int size);

    MemberResponseDto randomUser(int myId);

}
