package com.god.b612.controller;

import com.god.b612.dto.MemberResponseDto;
import com.god.b612.model.BaseResponseBody;
import com.god.b612.service.FireBaseService;
import com.god.b612.service.MemberService;
import com.google.firebase.auth.FirebaseAuthException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/member")
@Api("멤버(유저) api")
@RequiredArgsConstructor
public class MemberController {
    @Autowired
    private final MemberService memberService;

    @Autowired
    private final FireBaseService fireBaseService;

    private final Logger logger = LoggerFactory.getLogger(MemberController.class);

    @ApiOperation(value = "회원가입 하고 로그인 하거나, 로그인 한다.", notes = "해당 주소로 가입이 되어있다면 유저 정보를 보내주고, 가입되어있지 않다면 유저를 가입 시킨 후 정보를 보내준다.")
    @PostMapping()
    public ResponseEntity<?> loginOrRegist(@RequestBody @ApiParam(value = "회원 주소", required = true) Map<String, String> memberAddress) {
        MemberResponseDto memberResponseDto = memberService.membersLoginOrRegist(memberAddress.get("memberAddress"));
        BaseResponseBody baseResponseBody;
        if (memberResponseDto != null) {
            baseResponseBody = BaseResponseBody.builder().message("success").statusCode(200).responseData(memberResponseDto).build();

            return ResponseEntity.status(200).body(baseResponseBody);
        } else {
            baseResponseBody = BaseResponseBody.builder().message("fail").statusCode(400).build();

            return ResponseEntity.status(400).body(baseResponseBody);
        }
    }

    @ApiOperation(value = "회원을 회원 번호로 조회한다.", notes = "회원번호를 입력하면 회원정보로 응답한다.")
    @GetMapping("/{memberId}")
    public ResponseEntity<?> findUser(@ApiParam(value = "회원 primary Key", example = "0") @PathVariable("memberId") int memberId) {
        MemberResponseDto memberResponseDto = memberService.memberSelectById(memberId);
        BaseResponseBody baseResponseBody;

        if (memberResponseDto != null) {
            baseResponseBody = BaseResponseBody.builder().message("success").statusCode(200).responseData(memberResponseDto).build();

            return ResponseEntity.status(200).body(baseResponseBody);
        } else {
            baseResponseBody = BaseResponseBody.builder().message("fail").statusCode(400).build();

            return ResponseEntity.status(400).body(baseResponseBody);
        }

    }

    @ApiOperation(value = "회원을 회원 지갑 주소로 조회한다.", notes = "회원 지갑주소를 입력하면 회원정보로 응답한다.")
    @GetMapping("")
    public ResponseEntity<?> findUserByAddress(@ApiParam(value = "회원 지갑 주소") @RequestParam String memberAddress) {
        MemberResponseDto memberResponseDto = memberService.memberSelectByAddress(memberAddress);
        BaseResponseBody baseResponseBody;

        if (memberResponseDto != null) {
            baseResponseBody = BaseResponseBody.builder().message("success").statusCode(200).responseData(memberResponseDto).build();

            return ResponseEntity.status(200).body(baseResponseBody);
        } else {
            baseResponseBody = BaseResponseBody.builder().message("fail").statusCode(400).build();

            return ResponseEntity.status(400).body(baseResponseBody);
        }

    }

    @ApiOperation(value = "회원 정보를 수정합니다.", notes = "닉네임과 프로필 사진을 수정할 수 있습니다.")
    @PutMapping("/detail")
    public ResponseEntity<?> updateMemberInfo(@RequestParam("file") MultipartFile file, String changedNickname, String memberAddress) throws IOException, FirebaseAuthException, IOException {
        BaseResponseBody baseResponseBody;
        String url = null;
        if (!file.isEmpty()) {
            url = fireBaseService.uploadFiles(file);
        }
        if (!memberService.updateInfoByAddress(url, changedNickname, memberAddress)) {
            baseResponseBody = BaseResponseBody.builder().message("fail").statusCode(400).build();

            return ResponseEntity.status(400).body(baseResponseBody);
        }

        baseResponseBody = BaseResponseBody.builder().message("success").statusCode(200).responseData(url).build();

        return ResponseEntity.status(200).body(baseResponseBody);
    }

}
