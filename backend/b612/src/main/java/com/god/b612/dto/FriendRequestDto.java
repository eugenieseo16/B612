package com.god.b612.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Setter
@Getter
public class FriendRequestDto{
    @ApiModelProperty(name = "요청을 보낸 사용자 시퀀스 넘버")
    @NotNull(message = "요청을 보낸 사용자 시퀀스 넘버를 입력해주세요.")
    @Min(value = 1, message = "요청을 보낸 사용자 시퀀스 넘버를 다시 확인해주세요.")
    int friendRequestMemberId;

    @ApiModelProperty(name = "요청을 받는 사용자 시퀀스 넘버")
    @NotNull(message = "요청을 받는 사용자 시퀀스 넘버를 입력해주세요.")
    @Min(value = 1, message = "요청을 받는 사용자 시퀀스 넘버를 다시 확인해주세요.")
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
