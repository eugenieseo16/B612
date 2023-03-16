package com.god.b612.repository;

import com.god.b612.entity.Friend;
import com.god.b612.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FriendRepository extends JpaRepository<Friend, Integer> {
    List<Friend> findAllByFriendRequestMemberId(Member member);

    List<Friend> findAllByFriendResponseMemberId(Member member);
}
