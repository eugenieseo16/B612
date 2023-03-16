package com.god.b612.repository;

import com.god.b612.dto.FriendRequestDto;
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
}
