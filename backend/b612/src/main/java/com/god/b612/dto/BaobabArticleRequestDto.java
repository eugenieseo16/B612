package com.god.b612.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@NoArgsConstructor
public class BaobabArticleRequestDto {

    @Getter
    @Setter
    @ApiModel("BaobabArticleCreateInfo")
    public static class Create {

        @ApiModelProperty(name = "사용자 지갑 주소", example = "0x2903A62A11ecAC2F58d0a...")
        @NotBlank(message = "사용자 지갑 주소를 입력해주세요.")
        String memberAddress;
        @ApiModelProperty(name = "바오밥 게시글 내용", example = "하이 ㅎ")
        @NotBlank(message = "바오밥 게시글 내용을 입력해주세요.")
        String baobabArticleContent;
    }

    @Getter
    @Setter
    @ApiModel("BaobabArticleUpdateInfo")
    public static class Update {
        @ApiModelProperty(name = "바오밥 게시글 시퀀스 넘버")
        @NotNull(message = "바오밥 게시글 시퀀스 넘버를 입력해주세요.")
        @Min(value = 1, message = "시퀀스 넘버를 다시 확인해주세요.")
        int baobabArticleId;
        @ApiModelProperty(name = "사용자 지갑 주소", example = "0x2903A62A11ecAC2F58d0a...")
        @NotBlank(message = "사용자 지갑 주소를 입력해주세요.")
        String memberAddress;
        @ApiModelProperty(name = "바오밥 게시글 내용", example = "하이 ㅎ")
        @NotBlank(message = "바오밥 게시글 내용을 입력해주세요.")
        String baobabArticleContent;
    }

}
