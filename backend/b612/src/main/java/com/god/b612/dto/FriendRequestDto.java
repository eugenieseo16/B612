package com.god.b612.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FriendRequestDto{
    int friendRequestMemberId;

    int friendResponseMemberId;

    public FriendRequestDto() {
        // 매개 변수가 없는 생성자 추가
    }
    @Builder
    public FriendRequestDto(int friendRequestMemberId, int friendResponseMemberId){
        this.friendRequestMemberId=friendRequestMemberId;
        this.friendResponseMemberId=friendResponseMemberId;
    }

}
