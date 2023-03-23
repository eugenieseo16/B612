package com.god.b612.dto;

import com.god.b612.entity.BaobabArticle;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.LastModifiedDate;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class BaobabArticleResponseDto {

    int baobabArticleId;

    int baobabArticleMemberId;

    String baobabArticleContent;

    Timestamp createdTime;

    LocalDateTime updatedTime;

    @Builder
    BaobabArticleResponseDto(int baobabArticleId, int baobabArticleMemberId, String baobabArticleContent, Timestamp createdTime, LocalDateTime updatedTime) {
        this.baobabArticleId = baobabArticleId;
        this.baobabArticleMemberId = baobabArticleMemberId;
        this.baobabArticleContent = baobabArticleContent;
        this.createdTime = createdTime;
        this.updatedTime = updatedTime;
    }

    public static BaobabArticleResponseDto of(BaobabArticle baobabArticle){
        BaobabArticleResponseDto dto = new BaobabArticleResponseDto();
        dto.baobabArticleId = baobabArticle.getBaobabArticleId();
        dto.baobabArticleMemberId = baobabArticle.getBaobabArticleMemberId().getMemberId();
        dto.baobabArticleContent = baobabArticle.getBaobabArticleContent();
        return dto;
    }

    public static BaobabArticleResponseDto from(BaobabArticle baobabArticle){
        return BaobabArticleResponseDto.builder()
                .baobabArticleId(baobabArticle.getBaobabArticleId())
                .baobabArticleMemberId(baobabArticle.getBaobabArticleId())
                .baobabArticleContent(baobabArticle.getBaobabArticleContent())
                .createdTime(baobabArticle.getCreatedTime())
                .updatedTime(baobabArticle.getUpdatedTime())
                .build();
    }

}
