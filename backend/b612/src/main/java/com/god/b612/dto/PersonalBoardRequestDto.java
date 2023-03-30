package com.god.b612.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@NoArgsConstructor
public class PersonalBoardRequestDto {

    @Getter
    @Setter
    public static class Create {
        @ApiModelProperty(name = "게시판 소유자 지갑 주소", example = "불멸의 대마왕")
        @NotBlank(message = "게시판 소유자 지갑 주소를 입력해주세요.")
        String ownerAddress;
        @ApiModelProperty(name = "작성자 지갑 주소", example = "나는야 천사")
        @NotBlank(message = "작성자 지갑 주소를 입력해주세요.")
        String writerAddress;
        @ApiModelProperty(name = "작성 내용", example = "행성 많아서 부러워여")
        @NotBlank(message = "작성 내용을 입력해주세요.")
        String personalBoardContent;
    }

    @Getter
    @Setter
    public static class Update {
        int personalBoardId;
        String writerAddress;
        String personalBoardContent;
    }

}
