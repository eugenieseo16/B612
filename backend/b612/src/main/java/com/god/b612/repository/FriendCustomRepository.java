package com.god.b612.repository;

import com.god.b612.dto.FriendRequestDto;
import com.god.b612.dto.FriendResponseDto;
import com.god.b612.entity.Friend;

public interface FriendCustomRepository {
    Friend makeFriendEntity(FriendRequestDto friendRequestDto);

    FriendResponseDto makeDto(Friend friend);
}
