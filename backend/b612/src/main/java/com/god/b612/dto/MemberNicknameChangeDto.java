package com.god.b612.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
public class MemberNicknameChangeDto {
    @ApiModelProperty(name = "사용자 시퀀스 넘버")
    @NotNull(message = "사용자 시퀀스 넘버를 입력해주세요.")
    @Min(value = 1, message = "사용자 시퀀스 넘버를 다시 확인해주세요.")
    int memberId;
    @ApiModelProperty(name = "바뀐 사용자 닉네임", example = "불멸의 대마왕")
    @NotBlank(message = "바뀐 사용자 닉네임을 입력해주세요.")
    String changedNickname;
}
