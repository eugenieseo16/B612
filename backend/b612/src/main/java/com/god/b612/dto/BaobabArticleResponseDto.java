package com.god.b612.dto;

import com.god.b612.entity.BaobabArticle;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BaobabArticleResponseDto {

    int baobabArticleId;

    int baobabArticleMemberId;

    String baobabArticleContent;

    @Builder
    BaobabArticleResponseDto(int baobabArticleId, int baobabArticleMemberId, String baobabArticleContent) {
        this.baobabArticleId = baobabArticleId;
        this.baobabArticleMemberId = baobabArticleMemberId;
        this.baobabArticleContent = baobabArticleContent;
    }

    public static BaobabArticleResponseDto of(BaobabArticle baobabArticle){
        BaobabArticleResponseDto dto = new BaobabArticleResponseDto();
        dto.baobabArticleId = baobabArticle.getBaobabArticleId();
        dto.baobabArticleMemberId = baobabArticle.getBaobabArticleMemberId().getMemberId();
        dto.baobabArticleContent = baobabArticle.getBaobabArticleContent();
        return dto;
    }

}
