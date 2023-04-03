package com.god.b612.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FriendResponseDto {

    int friendRequestMemberId;

    int friendResponseMemberId;

    byte friendAccepted;

    String friendRequestNickname;

    String friendRequestImage;

    @Builder
    public FriendResponseDto(int friendRequestMemberId, int friendResponseMemberId, byte friendAccepted, String friendRequestImage, String friendRequestNickname){
        this.friendRequestMemberId=friendRequestMemberId;
        this.friendResponseMemberId=friendResponseMemberId;
        this.friendAccepted=friendAccepted;
        this.friendRequestNickname=friendRequestNickname;
        this.friendRequestImage=friendRequestImage;
    }



}
