package com.god.b612.repository;

import com.god.b612.dto.FriendRequestDto;
import com.god.b612.entity.Friend;

public interface FriendCustomRepository {
    Friend makeFriendEntity(FriendRequestDto friendRequestDto);
}
