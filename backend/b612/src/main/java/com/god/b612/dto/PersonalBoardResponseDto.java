package com.god.b612.dto;

import com.god.b612.entity.BaobabArticle;
import com.god.b612.entity.PersonalBoard;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class PersonalBoardResponseDto {

    int personalBoardId;

    int personalBoardOwnerId;

    int personalBoardWriterId;

    String personalBoardContent;

    Timestamp createdTime;

    LocalDateTime updatedTime;

    @Builder
    PersonalBoardResponseDto(int personalBoardId, int personalBoardOwnerId, int personalBoardWriterId, String personalBoardContent, Timestamp createdTime, LocalDateTime updatedTime) {
        this.personalBoardId = personalBoardId;
        this.personalBoardOwnerId = personalBoardOwnerId;
        this.personalBoardWriterId = personalBoardWriterId;
        this.personalBoardContent = personalBoardContent;
        this.createdTime = createdTime;
        this.updatedTime = updatedTime;
    }

    public static PersonalBoardResponseDto of(PersonalBoard personalBoard){
        PersonalBoardResponseDto dto = new PersonalBoardResponseDto();
        dto.personalBoardId = personalBoard.getPersonalBoardId();
        dto.personalBoardOwnerId = personalBoard.getPersonalBoardOwnerId().getMemberId();
        dto.personalBoardWriterId = personalBoard.getPersonalBoardWriterId().getMemberId();
        dto.personalBoardContent = personalBoard.getPersonalBoardContent();
        dto.createdTime = personalBoard.getCreatedTime();
        dto.updatedTime = personalBoard.getUpdatedTime();
        return dto;
    }

    public static PersonalBoardResponseDto from(PersonalBoard personalBoard){
        return PersonalBoardResponseDto.builder()
                .personalBoardId(personalBoard.getPersonalBoardId())
                .personalBoardOwnerId(personalBoard.getPersonalBoardOwnerId().getMemberId())
                .personalBoardWriterId(personalBoard.getPersonalBoardWriterId().getMemberId())
                .personalBoardContent(personalBoard.getPersonalBoardContent())
                .createdTime(personalBoard.getCreatedTime())
                .updatedTime(personalBoard.getUpdatedTime())
                .build();
    }

}
