package com.god.b612.controller;

import com.god.b612.dto.MemberResponseDto;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<MemberResponseDto> loginOrRegist(@ApiParam(value = "회원 주소", required = true) String memberAddress){
        MemberResponseDto memberResponseDto=memberService.MembersLoginOrRegist(memberAddress);
        if(memberResponseDto!=null){
            return new ResponseEntity<MemberResponseDto>(memberResponseDto, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<MemberResponseDto>(memberResponseDto, HttpStatus.NO_CONTENT);
        }
    }
}
