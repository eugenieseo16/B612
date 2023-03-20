package com.god.b612.service;

import com.god.b612.dto.FriendRequestDto;
import com.god.b612.dto.FriendResponseDto;
import com.god.b612.dto.MemberResponseDto;
import com.god.b612.entity.Friend;
import com.god.b612.entity.Member;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface FriendService {
    public Friend registFriend(FriendRequestDto friendRequestDto);

    public FriendResponseDto findFriend(int requestId, int responseId);

    public List<MemberResponseDto> findFriendList(int memberId, Pageable pageable);

    public List<MemberResponseDto> findMyUnaccpetedFriendList(int memberId, Pageable pageable);

    public List<MemberResponseDto> findMyRequestedFriendList(int memberId, Pageable pageable);
}
