package com.god.b612.controller;

import com.god.b612.dto.FriendRequestDto;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
