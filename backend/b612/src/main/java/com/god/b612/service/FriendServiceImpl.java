package com.god.b612.service;

import com.god.b612.dto.FriendRequestDto;
import com.god.b612.entity.Friend;
import com.god.b612.repository.FriendCustomRepository;
import com.god.b612.repository.FriendRepository;
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

    public Friend registFriend(FriendRequestDto friendRequestDto){
        Friend returnFriend=friendCustomRepository.makeFriendEntity(friendRequestDto);
        List<Friend> friends= friendRepository.findAllByFriendRequestMemberId(returnFriend.getFriendRequestMemberId());
        //친구 요청을 건 사람에게 친구 요청을 건 사람들의 friendEntity 리스트를 받아온다.
        int i=0;
        for(Friend friend:friends){
            System.out.println(i++);
            System.out.println("***********************************************************************");
            if(friend.getFriendRequestMemberId().getMemberId()==friendRequestDto.getFriendResponseMemberId()){
                System.out.println(friend.getFriendRequestMemberId().getMemberId());
                System.out.println("위는 요청자");
                System.out.println("아래는 수락권한자");
                //리스트에서 내게 요청을 건사람과 내가 요청을 한사람이 일치할 경우 둘 서로 친구요청을 했으므로
                //친구 요청을 수락시킨다.
                returnFriend.setFriendAccepted((byte) 1);
                friend.setFriendAccepted((byte) 1);
                break;
            }
        }
        return returnFriend;
    }
}
