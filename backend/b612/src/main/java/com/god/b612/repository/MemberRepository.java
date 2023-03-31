package com.god.b612.repository;

import com.god.b612.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, Integer> {

    Member findMemberByMemberAddress(String memberAddress);

    Member findTopByOrderByMemberIdDesc();

    Member findMemberByMemberId(int memberId);

    Member findMemberByMemberNickname(String nickname);

    List<Member> findMembersByMemberNicknameContaining(String string);

    Page<Member> findMembersByOrderByMemberLikedDesc(Pageable pageable);

    @Query(value = "SELECT * FROM members order by RAND() limit 1",nativeQuery = true)
    List<Member> randomMember();
}
