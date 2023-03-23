package com.god.b612.service;

import com.god.b612.dto.BaobabArticleRequestDto;
import com.god.b612.dto.BaobabArticleResponseDto;
import com.god.b612.entity.BaobabArticle;
import com.god.b612.entity.Member;
import com.god.b612.repository.BaobabArticleRepository;
import com.god.b612.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BaobabArticleServiceImpl implements BaobabArticleService{
    @Autowired
    private final MemberRepository memberRepository;
    @Autowired
    private final BaobabArticleRepository baobabArticleRepository;

    @Override
    public BaobabArticle registBaobabArticle(BaobabArticleRequestDto.Create baobabArticleRequestDto, int memberId) {
        Member writer = memberRepository.findMemberByMemberId(memberId);
        BaobabArticle baobabArticle = BaobabArticle.builder()
                .baobabArticleMemberId(writer)
                .baobabArticleContent(baobabArticleRequestDto.getBaobabArticleContent())
                .build();
        return baobabArticleRepository.save(baobabArticle);
    }

    @Override
    public BaobabArticleResponseDto baobabArticleSelectById(int baobabArticleId) {
        BaobabArticleResponseDto baobabArticleResponseDto = BaobabArticleResponseDto.of(baobabArticleRepository.findById(baobabArticleId).get());
        return baobabArticleResponseDto;
    }

    @Override
    public BaobabArticleResponseDto updateBaobabArticle(BaobabArticleRequestDto.Update baobabArticleRequestDto) {

        BaobabArticle baobabArticle = baobabArticleRepository.findById(baobabArticleRequestDto.getBaobabArticleId()).get();
        Member writer = memberRepository.findMemberByMemberId(baobabArticle.getBaobabArticleMemberId().getMemberId());

        BaobabArticle changedBaobabArticle = BaobabArticle.builder()
                .baobabArticleId(baobabArticleRequestDto.getBaobabArticleId())
                .baobabArticleMemberId(writer)
                .baobabArticleContent(baobabArticleRequestDto.getBaobabArticleContent())
                .build();

        return BaobabArticleResponseDto.of(baobabArticleRepository.save(changedBaobabArticle));

    }

    @Override
    public void deleteBaobabArticle(int baobabArticleId) {
        baobabArticleRepository.deleteById(baobabArticleId);
    }
}
