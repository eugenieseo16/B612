package com.god.b612.controller;

import com.god.b612.dto.FlowerResponseDto;
import com.god.b612.dto.MemberNicknameChangeDto;
import com.god.b612.dto.MemberResponseDto;
import com.god.b612.dto.MemberResponseDtoForRank;
import com.god.b612.model.BaseResponseBody;
import com.god.b612.service.FireBaseService;
import com.god.b612.service.FlowerService;
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
import java.util.List;
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

    @Autowired
    private final FlowerService flowerService;

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
    public ResponseEntity<?> findUser(@ApiParam(value = "회원 primary Key") @PathVariable("memberId") int memberId) {
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

    @ApiOperation(value = "회원 프로필 사진을 수정합니다.", notes = "회원의 프로필 사진을 수정할 수 있습니다.")
    @PutMapping("/detail")
    public ResponseEntity<?> updateMemberInfo(@RequestParam("file") MultipartFile file, String memberAddress) throws IOException, FirebaseAuthException, IOException {
        BaseResponseBody baseResponseBody;
        String url = null;
        if (!file.isEmpty()) {
            url = fireBaseService.uploadFiles(file);
        }
        if (!memberService.updateInfoByAddress(url, memberAddress)) {
            baseResponseBody = BaseResponseBody.builder().message("fail").statusCode(400).build();

            return ResponseEntity.status(400).body(baseResponseBody);
        }

        baseResponseBody = BaseResponseBody.builder().message("success").statusCode(200).responseData(url).build();

        return ResponseEntity.status(200).body(baseResponseBody);
    }


    @ApiOperation(value = "멤버 닉네임 중복 체크.", notes = "회원 닉네임이 이미 존재하면 false (true여야 변경 가능).")
    @GetMapping("/check/{memberNickname}")
    public ResponseEntity<BaseResponseBody> checkNickname(@ApiParam(value = "변경하고 싶어하는 닉네임") @PathVariable("memberNickname") String memberNickname) {
        Boolean check = memberService.checkNickname(memberNickname);

        BaseResponseBody baseResponseBody = BaseResponseBody.builder().message("success").statusCode(200).responseData(check).build();

        return ResponseEntity.status(200).body(baseResponseBody);
    }

    @ApiOperation(value = "회원 닉네임을 수정합니다.", notes = "회원의 닉네임을 수정할 수 있습니다.")
    @PutMapping("/nickname")
    public ResponseEntity<BaseResponseBody> changeMemberNickname(@RequestBody @ApiParam(value = "바뀔 유저 id와 바꿀 닉네임을 입력한다.", required = true) MemberNicknameChangeDto memberNicknameChangeDto) {
        Boolean check = memberService.checkNickname(memberNicknameChangeDto.getChangedNickname());
        if (check) {
            MemberResponseDto memberResponseDto = memberService.changeNickname(memberNicknameChangeDto.getMemberId(), memberNicknameChangeDto.getChangedNickname());

            BaseResponseBody baseResponseBody = BaseResponseBody.builder().message("success").statusCode(200).responseData(memberResponseDto).build();

            return ResponseEntity.status(200).body(baseResponseBody);
        } else {
            BaseResponseBody baseResponseBody = BaseResponseBody.builder().message("fail.").statusCode(400).responseData("닉네임이 이미 존재합니다").build();

            return ResponseEntity.status(400).body(baseResponseBody);
        }
    }


    @ApiOperation(value = "유저 검색", notes = "닉네임에 string이 포함된 유저들을 찾아줌.")
    @GetMapping("/search/{string}")
    public ResponseEntity<BaseResponseBody> selectFriendList(@ApiParam(value = "닉네임 검색할 문자열 입력") @PathVariable("string") String string) {
        List<MemberResponseDto> memberResponseDtos = memberService.searchMember(string);

        BaseResponseBody baseResponseBody = BaseResponseBody.builder().message("success").statusCode(200).responseData(memberResponseDtos).build();

        return ResponseEntity.status(200).body(baseResponseBody);

    }



    @ApiOperation(value = "유저 랭킹조회", notes = "유저의 랭킹들을 보여줍니다. 페이지와 사이즈 입력 페이지는 0부터시작")
    @GetMapping("/ranking/{page}&{size}")
    public ResponseEntity<BaseResponseBody> viewRanking(@PathVariable("page") int page, @PathVariable("size") int size) {
        List<MemberResponseDtoForRank> memberResponseDtoForRanks=memberService.viewRank(page,size);

        BaseResponseBody baseResponseBody = BaseResponseBody.builder().message("success").statusCode(200).responseData(memberResponseDtoForRanks).build();

        return ResponseEntity.status(200).body(baseResponseBody);
    }
    
    @ApiOperation(value = "유저 인벤토리 보기", notes = "유저의 안심어진 꽃들을 보여줍니다.")
    @GetMapping("/{memberId}/inventory")
    public ResponseEntity<BaseResponseBody> memberInventory(@PathVariable("memberId") int memberId) {

        List<FlowerResponseDto> flowerResponseDtos = flowerService.selectMemberInventory(memberId);

        BaseResponseBody baseResponseBody = BaseResponseBody.builder().message("success").statusCode(200).responseData(flowerResponseDtos).build();

        return ResponseEntity.status(200).body(baseResponseBody);

    }

}
