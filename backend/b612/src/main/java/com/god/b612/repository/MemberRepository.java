package com.god.b612.repository;

import com.god.b612.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Integer> {

    Member findMemberByMemberAddress(String memberAddress);

    Member findTopByOrderByMemberIdDesc();
}
