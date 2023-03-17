package com.god.b612.controller;

import com.god.b612.dto.FriendRequestDto;
import com.god.b612.dto.FriendResponseDto;
import com.god.b612.dto.MemberResponseDto;
import com.god.b612.entity.Friend;
import com.god.b612.model.BaseResponseBody;
import com.god.b612.repository.FriendRepository;
import com.god.b612.service.FriendService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/friend")
@Api("친구 api")
@RequiredArgsConstructor
public class FriendController {
    @Autowired
    private final FriendService friendService;

    @Autowired
    private final FriendRepository friendRepository;

    @Transactional
    @ApiOperation(value = "친구 요청 생성", notes = "친구 신청이 온 친구에게 친구 요청을 할 경우 서로 친구가 되고, 아니면 친구 요청이 생성됨.")
    @PostMapping()
    public ResponseEntity<?> makeFriendRequest(@RequestBody @ApiParam(value = "친구 요청 생성 Dto 입력", required = true)FriendRequestDto friendRequestDto){
        Friend friend = friendService.registFriend(friendRequestDto);


        BaseResponseBody baseResponseBody=
                BaseResponseBody.builder()
                        .message("success")
                        .statusCode(200)
                        .build();


        friendRepository.save(friend);
        return ResponseEntity.status(200).body(baseResponseBody);
    }

    @Transactional
    @ApiOperation(value = "member의 친구 목록을 가져옵니다.", notes = "멤버 id를 입력하면, 해당 멤버의 친구목록을 받아옵니다.")
    @GetMapping("/{memberId}")
    public ResponseEntity<?>  getFriends(@ApiParam(value = "친구목록을 조회할 멤버 아이디") @PathVariable("memberId")int memberId){
        List<MemberResponseDto> memberResponseDtos=friendService.findFriendList(memberId);

        if(memberResponseDtos.size()!=0){
            BaseResponseBody baseResponseBody=
                    BaseResponseBody.builder()
                            .message("success")
                            .statusCode(200)
                            .responseData(memberResponseDtos)
                            .build();
            return ResponseEntity.status(200).body(baseResponseBody);
        }

        else{
            BaseResponseBody baseResponseBody= BaseResponseBody.builder()
                    .message("fail")
                    .statusCode(400)
                    .build();

            return ResponseEntity.status(400).body(baseResponseBody);
        }
    }


    @Transactional
    @ApiOperation(value = "request 멤버와 response 멤버 아이디로 친구 dto 찾기", notes = "친구신청을 건사람 아이디와 친구신청을 받은 사람 아이디를 입력해 친구 dto를 받아옵니다.")
    @GetMapping("/{requestId}&{responseId}")
    public ResponseEntity<?>  findFriend(@ApiParam(value = "친구신청을 건 사람") @PathVariable("requestId")int requestId, @ApiParam(value = "친구신청을 받은 사람") @PathVariable("responseId")int responseId){
        FriendResponseDto friendResponseDto= friendService.findFriend(requestId,responseId);
        if(friendResponseDto!=null){
            BaseResponseBody baseResponseBody= BaseResponseBody.builder()
                    .message("success")
                    .statusCode(200)
                    .responseData(friendResponseDto)
                    .build();

            return ResponseEntity.status(200).body(baseResponseBody);
        }
        else {
            BaseResponseBody baseResponseBody= BaseResponseBody.builder()
                    .message("fail")
                    .statusCode(400)
                    .build();

            return ResponseEntity.status(400).body(baseResponseBody);
        }
    }
}
