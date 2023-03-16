package com.god.b612.service;

import com.god.b612.dto.FriendRequestDto;
import com.god.b612.entity.Friend;

public interface FriendService {
    public Friend registFriend(FriendRequestDto friendRequestDto);
}
