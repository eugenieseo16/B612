package com.god.b612.repository;

import com.god.b612.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Integer> {

    public String makeRandomNickName();

    Member findMemberByMemberAddress(String memberAddress);

    int findTopByMemberIdOrderByMemberIdDesc();
}
