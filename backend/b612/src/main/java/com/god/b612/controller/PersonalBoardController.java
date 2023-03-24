package com.god.b612.controller;

import com.god.b612.dto.*;
import com.god.b612.entity.PersonalBoard;
import com.god.b612.model.BaseResponseBody;
import com.god.b612.service.PersonalBoardService;
import com.god.b612.service.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/board")
@Api("보드 api")
@RequiredArgsConstructor
public class PersonalBoardController {
    @Autowired
    private final PersonalBoardService personalBoardService;

    @Autowired
    private final MemberService memberService;

    private final Logger logger = LoggerFactory.getLogger(MemberController.class);

    @ApiOperation(value = "보드에 글을 작성합니다.", notes = "")
    @PostMapping()
    public ResponseEntity<?> saveBoardArticle(@RequestBody @ApiParam(value = "글 내용", required = true) PersonalBoardRequestDto.Create personalBoardRequestDto) {

        BaseResponseBody baseResponseBody;
        MemberResponseDto owner = memberService.memberSelectByAddress(personalBoardRequestDto.getOwnerAddress());
        MemberResponseDto writer = memberService.memberSelectByAddress(personalBoardRequestDto.getWriterAddress());
        if (owner == null || writer == null) {
            baseResponseBody = BaseResponseBody.builder().message("지갑 주소에 해당하는 유저가 없습니다.").statusCode(400).build();
            return ResponseEntity.status(400).body(baseResponseBody);
        }

        PersonalBoard personalBoard = personalBoardService.registPersonalBoard(personalBoardRequestDto, owner.getMemberId(), writer.getMemberId());
        if (personalBoard != null) {
            baseResponseBody = BaseResponseBody.builder().message("success").statusCode(200).responseData(PersonalBoardResponseDto.of(personalBoard)).build();
            return ResponseEntity.status(200).body(baseResponseBody);
        } else {
            baseResponseBody = BaseResponseBody.builder().message("fail").statusCode(400).build();
            return ResponseEntity.status(400).body(baseResponseBody);
        }

    }

    @ApiOperation(value = "방명록에 있는 글 1개를 상세 조회 합니다.", notes = "")
    @GetMapping("/detail/{personalBoardId}")
    public ResponseEntity<?> showOneBoardArticle(@ApiParam(value = "방명록 게시글 primary Key", example = "0") @PathVariable("personalBoardId") int personalBoardId) {

        BaseResponseBody baseResponseBody;
        PersonalBoardResponseDto personalBoardResponseDto = personalBoardService.personalBoardSelectById(personalBoardId);
        if (personalBoardResponseDto != null) {
            baseResponseBody = BaseResponseBody.builder().message("success").statusCode(200).responseData(personalBoardResponseDto).build();

            return ResponseEntity.status(200).body(baseResponseBody);
        } else {
            baseResponseBody = BaseResponseBody.builder().message("fail").statusCode(400).build();

            return ResponseEntity.status(400).body(baseResponseBody);
        }

    }

    @ApiOperation(value = "방명록리스트 멤버 아이디로 최신순 조회, 페이징하기", notes = "")
    @GetMapping("/received/{memberId}")
    public ResponseEntity<?> showMyPersonalBoard(Pageable pageable) {
        BaseResponseBody baseResponseBody;

        Page<PersonalBoardResponseDto> personalBoardResponseDtoPage = personalBoardService.findAll(pageable);
        if (personalBoardResponseDtoPage != null) {
            baseResponseBody = BaseResponseBody.builder().message("success").statusCode(200).responseData(personalBoardResponseDtoPage).build();

            return ResponseEntity.status(200).body(baseResponseBody);
        } else {
            baseResponseBody = BaseResponseBody.builder().message("fail").statusCode(400).build();

            return ResponseEntity.status(400).body(baseResponseBody);
        }
    }

    @ApiOperation(value = "내가 쓴 보드 글 1개 수정하기", notes = "")
    @PutMapping()
    public ResponseEntity<?> updateOnePersonalBoard(@RequestBody @ApiParam(value = "글 내용", required = true) PersonalBoardRequestDto.Update personalBoardRequestDto) {

        BaseResponseBody baseResponseBody;
        MemberResponseDto writer = memberService.memberSelectByAddress(personalBoardRequestDto.getWriterAddress());
        PersonalBoardResponseDto article = personalBoardService.personalBoardSelectById(personalBoardRequestDto.getPersonalBoardId());
        if (writer == null || (writer.getMemberId() != article.getPersonalBoardWriterId())) {
            baseResponseBody = BaseResponseBody.builder().message("글 작성자가 아닙니다.").statusCode(400).build();
            return ResponseEntity.status(400).body(baseResponseBody);
        }

        PersonalBoardResponseDto personalBoardResponseDto = personalBoardService.updatePersonalBoard(personalBoardRequestDto);
        if (personalBoardResponseDto != null) {
            baseResponseBody = BaseResponseBody.builder().message("success").statusCode(200).responseData(personalBoardResponseDto).build();
            return ResponseEntity.status(200).body(baseResponseBody);
        } else {
            baseResponseBody = BaseResponseBody.builder().message("fail").statusCode(400).build();
            return ResponseEntity.status(400).body(baseResponseBody);
        }

    }

    @ApiOperation(value = "방명록 글 1개 삭제하기", notes = "")
    @DeleteMapping("/{personalBoardId}")
    public ResponseEntity<?> deletePersonalBoard(@ApiParam(value = "방명록 게시글 primary Key", example = "0") @PathVariable("personalBoardId") int personalBoardId,
                                                 @RequestParam @ApiParam(value = "삭제 요청 회원 주소", required = true) String memberAddress) {
        BaseResponseBody baseResponseBody;
        PersonalBoardResponseDto personalBoardResponseDto = personalBoardService.personalBoardSelectById(personalBoardId);
        MemberResponseDto writer = memberService.memberSelectById(personalBoardResponseDto.getPersonalBoardWriterId());
        if (!memberAddress.equals(writer.getMemberAddress())) {
            baseResponseBody = BaseResponseBody.builder().message("글쓴이가 아닙니다.").statusCode(400).build();
            return ResponseEntity.status(400).body(baseResponseBody);
        }

        personalBoardService.deletePersonalBoard(personalBoardId);
        baseResponseBody = BaseResponseBody.builder().message("success").statusCode(200).build();
        return ResponseEntity.status(200).body(baseResponseBody);
    }
}
