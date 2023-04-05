package com.god.b612.controller;

import com.god.b612.dto.*;
import com.god.b612.model.BaseResponseBody;
import com.god.b612.repository.MemberRepository;
import com.god.b612.service.FireBaseService;
import com.god.b612.service.FlowerService;
import com.god.b612.service.MemberService;
import com.god.b612.service.PlanetService;
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

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/member")
@Api("멤버(유저) api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", methods = {RequestMethod.GET , RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class MemberController {
    @Autowired
    private final MemberService memberService;

    @Autowired
    private final FireBaseService fireBaseService;

    @Autowired
    private final FlowerService flowerService;

    @Autowired
    private final PlanetService planetService;

    private final Logger logger = LoggerFactory.getLogger(MemberController.class);
    @Autowired
    private MemberRepository memberRepository;

    @ApiOperation(value = "회원가입 하고 로그인 하거나, 로그인 한다.", notes = "해당 주소로 가입이 되어있다면 유저 정보를 보내주고, 가입되어있지 않다면 유저를 가입 시킨 후 정보를 보내준다.")
    @PostMapping()
    public ResponseEntity<?> loginOrRegist(@RequestBody @Valid @ApiParam(value = "회원 주소", required = true) MemberRequestDto.Create memberRequestDto) {
        MemberResponseDto memberResponseDto = memberService.membersLoginOrRegist(memberRequestDto.getMemberAddress());
        BaseResponseBody baseResponseBody;
        if (memberResponseDto != null) {
            baseResponseBody = BaseResponseBody.builder().message("success").statusCode(200).responseData(memberResponseDto).build();

            return ResponseEntity.status(200).body(baseResponseBody);
        } else {
            baseResponseBody = BaseResponseBody.builder().message("fail").statusCode(400).build();

            return ResponseEntity.status(400).body(baseResponseBody);
        }
    }

    @ApiOperation(value = "유저의 보유 행성을 갱신한다.", notes = "유저가 행성을 팔거나 사면 좋아요 숫자나 티어 등이 수정됨")
    @PostMapping("/reload/{memberId}")
    public ResponseEntity<?> reloadMember(@RequestBody @Valid @ApiParam(value = "회원이 가진 행성정보를 리스트로 줘라", required = true) List<PlanetMakeDto> planetMakeDtos, @PathVariable("memberId") int memberId) {
        MemberResponseDto memberResponseDto=memberService.reloadUser(planetMakeDtos,memberId);
        BaseResponseBody baseResponseBody;
        if(memberResponseDto==null){
            baseResponseBody = BaseResponseBody.builder().message("fail").statusCode(400).build();
            return ResponseEntity.status(400).body(baseResponseBody);
        }
        else{
            baseResponseBody = BaseResponseBody.builder().message("success").statusCode(200).responseData(memberResponseDto).build();
            return ResponseEntity.status(200).body(baseResponseBody);
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
    public ResponseEntity<BaseResponseBody> changeMemberNickname(@RequestBody @Valid @ApiParam(value = "바뀔 유저 id와 바꿀 닉네임을 입력한다.", required = true) MemberNicknameChangeDto memberNicknameChangeDto) {
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
    @GetMapping("/ranking")
    public ResponseEntity<BaseResponseBody> viewRanking(@RequestParam int page, @RequestParam int size) {
        List<MemberResponseDtoForRank> memberResponseDtoForRanks=memberService.viewRank(page,size);

        BaseResponseBody baseResponseBody = BaseResponseBody.builder().message("success").statusCode(200).responseData(memberResponseDtoForRanks).build();

        return ResponseEntity.status(200).body(baseResponseBody);
    }
    
    @ApiOperation(value = "유저 인벤토리 보기", notes = "유저의 안심어진 꽃들을 보여줍니다.")
    @GetMapping("/{memberId}/inventory")
    public ResponseEntity<BaseResponseBody> memberInventory(@PathVariable("memberId") int memberId) {

        List<FlowerResponseDto> flowerResponseDtos = flowerService.selectMemberInventory(memberId);

        if(flowerResponseDtos==null){
            BaseResponseBody baseResponseBody = BaseResponseBody.builder().message("fail").statusCode(400).build();
            return ResponseEntity.status(400).body(baseResponseBody);
        }

        BaseResponseBody baseResponseBody = BaseResponseBody.builder().message("success").statusCode(200).responseData(flowerResponseDtos).build();

        return ResponseEntity.status(200).body(baseResponseBody);

    }


    @ApiOperation(value = "유저 별목록 보기", notes = "유저의 별들을 보여줍니다.")
    @GetMapping("/{memberId}/star")
    public ResponseEntity<BaseResponseBody> memberStars(@PathVariable("memberId") int memberId) {

        if (memberRepository.findMemberByMemberId(memberId)==null){
            BaseResponseBody baseResponseBody = BaseResponseBody.builder().message("fail").statusCode(400).build();
            return ResponseEntity.status(400).body(baseResponseBody);
        }

        List<PlanetResponseDto> planetResponseDtos=planetService.viewMemberStar(memberId);

        BaseResponseBody baseResponseBody = BaseResponseBody.builder().message("success").statusCode(200).responseData(planetResponseDtos).build();
        return ResponseEntity.status(200).body(baseResponseBody);
        
    }



    @ApiOperation(value = "랜덤 회원 불러오기.", notes = "내 멤버 id를 입력하면, 내가 아닌 유저를 줍니다.")
    @GetMapping("/random/{memberId}")
    public ResponseEntity<BaseResponseBody> randomUser(@PathVariable("memberId") int memberId){
        MemberResponseDto memberResponseDto=memberService.randomUser(memberId);

        BaseResponseBody baseResponseBody = BaseResponseBody.builder().message("success").statusCode(200).responseData(memberResponseDto).build();
        return ResponseEntity.status(200).body(baseResponseBody);
    }


    @ApiOperation(value = "나의 랜덤 행성 불러오기.", notes = "내 멤버 id를 입력하면, 내가 아닌 유저를 줍니다.")
    @GetMapping("/{memberId}/planet/random")
    public ResponseEntity<BaseResponseBody> myRandomPlanet(@PathVariable("memberId") int memberId){
        PlanetResponseDto planetResponseDto=planetService.randomMyPlanet(memberId);

        if(planetResponseDto==null){
            BaseResponseBody baseResponseBody = BaseResponseBody.builder().message("success").statusCode(200).responseData(planetResponseDto).build();
            return ResponseEntity.status(200).body(baseResponseBody);
        }
        else if(planetResponseDto.getMemberId()==0){
            BaseResponseBody baseResponseBody = BaseResponseBody.builder().message("success").statusCode(200).responseData(planetResponseDto).build();
            return ResponseEntity.status(200).body(baseResponseBody);
        }
        else{
            BaseResponseBody baseResponseBody = BaseResponseBody.builder().message("success").statusCode(200).responseData(planetResponseDto).build();
            return ResponseEntity.status(200).body(baseResponseBody);
        }
    }


    @ApiOperation(value = "유저 꽃 모두 조회", notes = "심어졌든 안심어졌든 유저가 가진 꽃을 모두 보여줍니다.")
    @GetMapping("/{memberId}/flowers")
    public ResponseEntity<BaseResponseBody> memberFlowers(@PathVariable("memberId") int memberId) {

        List<FlowerResponseDto> flowerResponseDtos = flowerService.selectMemberFlowers(memberId);

        if(flowerResponseDtos==null){
            BaseResponseBody baseResponseBody = BaseResponseBody.builder().message("fail").statusCode(400).build();
            return ResponseEntity.status(400).body(baseResponseBody);
        }

        BaseResponseBody baseResponseBody = BaseResponseBody.builder().message("success").statusCode(200).responseData(flowerResponseDtos).build();

        return ResponseEntity.status(200).body(baseResponseBody);

    }

}
