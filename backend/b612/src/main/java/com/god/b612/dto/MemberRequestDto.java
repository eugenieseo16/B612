package com.god.b612.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@NoArgsConstructor
public class MemberRequestDto {

    @Getter
    @Setter
    public static class Create {
        @ApiModelProperty(name = "사용자 지갑 주소", example = "0x2903A62A11ecAC2F58d0...")
        @NotBlank(message = "사용자 지갑 주소를 입력해주세요.")
        @Size(min=20, message = "사용자 지갑 주소가 너무 짧아요.")
        String memberAddress;
    }

}
