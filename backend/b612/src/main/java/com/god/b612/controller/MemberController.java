package com.god.b612.controller;

import com.god.b612.dto.MemberResponseDto;
import com.god.b612.model.BaseResponseBody;
import com.god.b612.service.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/member")
@Api("멤버(유저) api")
@RequiredArgsConstructor
public class MemberController {
    @Autowired
    private final MemberService memberService;

    private final Logger logger = LoggerFactory.getLogger(MemberController.class);

    @Transactional
    @ApiOperation(value = "회원가입 하고 로그인 하거나, 로그인 한다.", notes = "해당 주소로 가입이 되어있다면 유저 정보를 보내주고, 가입되어있지 않다면 유저를 가입 시킨 후 정보를 보내준다.")
    @PostMapping()
    public ResponseEntity<?> loginOrRegist(@RequestBody @ApiParam(value = "회원 주소", required = true) String memberAddress){
        MemberResponseDto memberResponseDto=memberService.membersLoginOrRegist(memberAddress);
        BaseResponseBody baseResponseBody;
        if(memberResponseDto!=null){
            baseResponseBody= BaseResponseBody.builder()
                    .message("success")
                    .statusCode(200)
                    .responseData(memberResponseDto)
                    .build();

            return ResponseEntity.status(200).body(baseResponseBody);
        }
        else{
            baseResponseBody= BaseResponseBody.builder()
                    .message("fail")
                    .statusCode(400)
                    .build();

            return ResponseEntity.status(400).body(baseResponseBody);
        }
    }

    @Transactional
    @ApiOperation(value = "회원을 회원 번호로 조회한다.", notes = "회원번호를 입력하면 회원정보로 응답한다.")
    @GetMapping("/{memberId}")
    public ResponseEntity<?> findUser(@ApiParam(value = "회원 primary Key") @PathVariable("memberId")int memberId){
        MemberResponseDto memberResponseDto=memberService.memberSelectById(memberId);
        BaseResponseBody baseResponseBody;

        if(memberResponseDto!=null){
            baseResponseBody= BaseResponseBody.builder()
                    .message("success")
                    .statusCode(200)
                    .responseData(memberResponseDto)
                    .build();

            return ResponseEntity.status(200).body(baseResponseBody);
        }
        else{
            baseResponseBody= BaseResponseBody.builder()
                    .message("fail")
                    .statusCode(400)
                    .build();

            return ResponseEntity.status(400).body(baseResponseBody);
        }

    }



}
