package com.god.b612.service;

import com.god.b612.dto.FriendRequestDto;
import com.god.b612.dto.FriendResponseDto;
import com.god.b612.dto.MemberResponseDto;
import com.god.b612.entity.Friend;
import com.god.b612.entity.Member;
import com.god.b612.repository.FriendCustomRepository;
import com.god.b612.repository.FriendRepository;
import com.god.b612.repository.MemberCustomRepository;
import com.god.b612.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class FriendServiceImpl implements FriendService{
    @Autowired
    private final FriendRepository friendRepository;

    @Autowired
    private final FriendCustomRepository friendCustomRepository;
    @Autowired
    private final MemberRepository memberRepository;

    @Autowired
    private final MemberCustomRepository memberCustomRepository;

    public Friend registFriend(FriendRequestDto friendRequestDto){
        Friend returnFriend=friendCustomRepository.makeFriendEntity(friendRequestDto);

        List<Friend> friends= friendRepository.findAllByFriendResponseMemberId(returnFriend.getFriendRequestMemberId());
        //이번 친구 요청에서 리퀘스트를 한 사람에게 친구를 요청한 모든 사람들을 List로 불러온다.

        System.out.println(friends.size());
        for(Friend friend:friends){
            if(friend.getFriendRequestMemberId().getMemberId()==friendRequestDto.getFriendResponseMemberId()){
                //리스트에서 내게 요청을 건사람과 내가 요청을 한사람이 일치할 경우 둘 서로 친구요청을 했으므로
                //친구 요청을 수락시킨다.
                returnFriend=Friend.builder()
                        .friendId(returnFriend.getFriendId())
                        .friendAccepted((byte)1)
                        .friendRequestMemberId(returnFriend.getFriendRequestMemberId())
                        .friendResponseMemberId(returnFriend.getFriendResponseMemberId())
                        .build();

                friend=Friend.builder()
                        .friendId(friend.getFriendId())
                        .friendAccepted((byte) 1)
                        .friendResponseMemberId(friend.getFriendResponseMemberId())
                        .friendRequestMemberId(friend.getFriendRequestMemberId())
                        .build();

                returnFriend.setFriendAccepted((byte) 1);
                friend.setFriendAccepted((byte) 1);

                friendRepository.save(friend);
                break;
            }
        }
        return returnFriend;
    }


    public FriendResponseDto findFriend(int requestId, int responseId){
        Member requestMember=memberRepository.findMemberByMemberId(requestId);
        Member responseMember=memberRepository.findMemberByMemberId(responseId);

        Friend friend=friendRepository.findTopByFriendRequestMemberIdAndFriendResponseMemberId(requestMember,responseMember);
        FriendResponseDto responseDto=null;
        if(friend!=null){
            responseDto=friendCustomRepository.makeDto(friend);
            return responseDto;
        }
        return responseDto;
    }

    @Override
    public List<MemberResponseDto> findFriendList(int memberId) {
        Member member=memberRepository.findMemberByMemberId(memberId);
        ArrayList<MemberResponseDto> memberResponseDtos=new ArrayList<>();


        List<Friend> friends=friendRepository.findAllByFriendResponseMemberIdAndFriendAccepted(member,(byte) 1);
        for(Friend friend: friends){
            member=friend.getFriendRequestMemberId();
            memberResponseDtos.add(memberCustomRepository.createMemberResponseDtoByEntity(member));
        }

        return memberResponseDtos;
    }
}
