package com.god.b612.service;

import com.god.b612.dto.BaobabArticleRequestDto;
import com.god.b612.dto.BaobabArticleResponseDto;
import com.god.b612.entity.BaobabArticle;
import org.springframework.stereotype.Service;

@Service
public interface BaobabArticleService {

    public BaobabArticle registBaobabArticle(BaobabArticleRequestDto.Create baobabArticleRequestDto, int memberId);

    public BaobabArticleResponseDto baobabArticleSelectById(int baobabArticleId);

    public BaobabArticleResponseDto updateBaobabArticle(BaobabArticleRequestDto.Update baobabArticleRequestDto);

    public void deleteBaobabArticle(int baobabArticleId);
}
