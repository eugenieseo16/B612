package com.god.b612.repository;

import com.god.b612.dto.FriendRequestDto;
import com.god.b612.dto.FriendResponseDto;
import com.god.b612.entity.Friend;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class FriendCustomRepositoryImpl implements FriendCustomRepository {

    @Autowired
    private final MemberRepository memberRepository;


    @Override
    public Friend makeFriendEntity(FriendRequestDto friendRequestDto) {
        Friend friend=Friend.builder()
                .friendRequestMemberId(memberRepository.findMemberByMemberId(friendRequestDto.getFriendRequestMemberId()))
                .friendResponseMemberId(memberRepository.findMemberByMemberId(friendRequestDto.getFriendResponseMemberId()))
                .build();

        return friend;
    }

    @Override
    public FriendResponseDto makeDto(Friend friend) {
        FriendResponseDto responseDto=FriendResponseDto.builder()
                .friendRequestMemberId(friend.getFriendRequestMemberId().getMemberId())
                .friendResponseMemberId(friend.getFriendResponseMemberId().getMemberId())
                .friendRequestNickname(friend.getFriendRequestMemberId().getMemberNickname())
                .friendAccepted(friend.getFriendAccepted())
                .friendRequestImage(friend.getFriendRequestMemberId().getMemberImage())
                .build();

        return responseDto;
    }
}
