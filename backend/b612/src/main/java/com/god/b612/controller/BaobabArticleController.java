package com.god.b612.controller;

import com.god.b612.dto.BaobabArticleRequestDto;
import com.god.b612.dto.BaobabArticleResponseDto;
import com.god.b612.dto.MemberResponseDto;
import com.god.b612.entity.BaobabArticle;
import com.god.b612.model.BaseResponseBody;
import com.god.b612.service.BaobabArticleService;
import com.god.b612.service.MemberService;
import com.google.firebase.auth.FirebaseAuthException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/baobab")
@Api("바오밥 게시판 api")
@RequiredArgsConstructor
public class BaobabArticleController {
    @Autowired
    private final BaobabArticleService baobabArticleService;

    @Autowired
    private final MemberService memberService;

    private final Logger logger = LoggerFactory.getLogger(MemberController.class);

    @ApiOperation(value = "바오밥나무에 글을 작성합니다.", notes = "")
    @PostMapping()
    public ResponseEntity<?> saveBaobabArticle(@RequestBody @ApiParam(value = "글 내용", required = true) BaobabArticleRequestDto.Create baobabArticleRequestDto) {

        BaseResponseBody baseResponseBody;
        MemberResponseDto writer = memberService.memberSelectByAddress(baobabArticleRequestDto.getMemberAddress());
        if (writer == null) {
            baseResponseBody = BaseResponseBody.builder().message("지갑 주소에 해당하는 유저가 없습니다.").statusCode(400).build();
            return ResponseEntity.status(400).body(baseResponseBody);
        }

        BaobabArticle baobabArticle = baobabArticleService.registBaobabArticle(baobabArticleRequestDto, writer.getMemberId());
        if (baobabArticle != null) {
            baseResponseBody = BaseResponseBody.builder().message("success").statusCode(200).responseData(BaobabArticleResponseDto.of(baobabArticle)).build();
            return ResponseEntity.status(200).body(baseResponseBody);
        } else {
            baseResponseBody = BaseResponseBody.builder().message("fail").statusCode(400).build();
            return ResponseEntity.status(400).body(baseResponseBody);
        }

    }

    @ApiOperation(value = "바오밥 나무에 있는 글 1개를 상세 조회 합니다.", notes = "")
    @GetMapping("/detail/{baobabArticleId}")
    public ResponseEntity<?> showOneBaobabArticle(@ApiParam(value = "바오밥 게시글 primary Key", example = "0") @PathVariable("baobabArticleId") int baobabArticleId) {

        BaseResponseBody baseResponseBody;
        BaobabArticleResponseDto baobabArticleResponseDto = baobabArticleService.baobabArticleSelectById(baobabArticleId);
        if (baobabArticleResponseDto != null) {
            baseResponseBody = BaseResponseBody.builder().message("success").statusCode(200).responseData(baobabArticleResponseDto).build();

            return ResponseEntity.status(200).body(baseResponseBody);
        } else {
            baseResponseBody = BaseResponseBody.builder().message("fail").statusCode(400).build();

            return ResponseEntity.status(400).body(baseResponseBody);
        }

    }

    @ApiOperation(value = "바오밥나무 글 최신 순으로 조회, 페이징하기", notes = "")
    @GetMapping("/list")
    public ResponseEntity<?> showBaobabArticles(Pageable pageable) {
        BaseResponseBody baseResponseBody;

        Page<BaobabArticleResponseDto> baobabArticleResponseDtoPage = baobabArticleService.findAll(pageable);
        if (baobabArticleResponseDtoPage != null) {
            baseResponseBody = BaseResponseBody.builder().message("success").statusCode(200).responseData(baobabArticleResponseDtoPage).build();

            return ResponseEntity.status(200).body(baseResponseBody);
        } else {
            baseResponseBody = BaseResponseBody.builder().message("fail").statusCode(400).build();

            return ResponseEntity.status(400).body(baseResponseBody);
        }
    }

    @ApiOperation(value = "바오밥나무 글 1개 수정하기", notes = "")
    @PutMapping("")
    public ResponseEntity<?> updateOneBaobabArticle(@RequestBody @ApiParam(value = "글 내용", required = true) BaobabArticleRequestDto.Update baobabArticleRequestDto) {

        BaseResponseBody baseResponseBody;
        MemberResponseDto writer = memberService.memberSelectByAddress(baobabArticleRequestDto.getMemberAddress());
        BaobabArticleResponseDto article = baobabArticleService.baobabArticleSelectById(baobabArticleRequestDto.getBaobabArticleId());
        if (writer == null || (writer.getMemberId() != article.getBaobabArticleMemberId())) {
            baseResponseBody = BaseResponseBody.builder().message("글 작성자가 아닙니다.").statusCode(400).build();
            return ResponseEntity.status(400).body(baseResponseBody);
        }

        BaobabArticleResponseDto baobabArticleResponseDto = baobabArticleService.updateBaobabArticle(baobabArticleRequestDto);
        if (baobabArticleResponseDto != null) {
            baseResponseBody = BaseResponseBody.builder().message("success").statusCode(200).responseData(baobabArticleResponseDto).build();
            return ResponseEntity.status(200).body(baseResponseBody);
        } else {
            baseResponseBody = BaseResponseBody.builder().message("fail").statusCode(400).build();
            return ResponseEntity.status(400).body(baseResponseBody);
        }

    }

    @ApiOperation(value = "바오밥나무 글 1개 삭제하기", notes = "")
    @DeleteMapping("/detail/{baobabArticleId}")
    public ResponseEntity<?> deleteMemberInfo(@ApiParam(value = "바오밥 게시글 primary Key", example = "0") @PathVariable("baobabArticleId") int baobabArticleId,
                                              @RequestParam @ApiParam(value = "삭제 요청 회원 주소", required = true) String memberAddress) {
        BaseResponseBody baseResponseBody;
        BaobabArticleResponseDto baobabArticleResponseDto = baobabArticleService.baobabArticleSelectById(baobabArticleId);
        MemberResponseDto writer = memberService.memberSelectById(baobabArticleResponseDto.getBaobabArticleMemberId());
        if (!memberAddress.equals(writer.getMemberAddress())) {
            baseResponseBody = BaseResponseBody.builder().message("글쓴이가 아닙니다.").statusCode(400).build();
            return ResponseEntity.status(400).body(baseResponseBody);
        }

        baobabArticleService.deleteBaobabArticle(baobabArticleId);
        baseResponseBody = BaseResponseBody.builder().message("success").statusCode(200).build();
        return ResponseEntity.status(200).body(baseResponseBody);
    }
}
