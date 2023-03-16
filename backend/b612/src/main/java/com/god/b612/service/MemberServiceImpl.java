package com.god.b612.service;

import com.god.b612.dto.MemberResponseDto;
import com.god.b612.entity.Member;
import com.god.b612.entity.Tier;
import com.god.b612.repository.MemberCustomRepository;
import com.god.b612.repository.MemberRepository;
import com.god.b612.repository.TierRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    @Autowired
    private final MemberRepository memberRepository;

    @Autowired
    private final TierRepository tierRepository;

    @Autowired
    private final MemberCustomRepository memberCustomRepository;


    @Override
    public MemberResponseDto membersLoginOrRegist(String memberAddress){
        Member member=memberRepository.findMemberByMemberAddress(memberAddress);

        if(member==null){
            member=Member.builder()
                    .memberAddress(memberAddress)
                    .memberNickname(memberCustomRepository.makeRandomNickName())
                    .memberImage(null)
                    .memberTierId(tierRepository.findTierByTierId(1))
                    .memberCurrentScore(0)
                    .memberHighestScore(0)
                    .build();

            MemberResponseDto memberResponseDto=memberCustomRepository.createMemberResponseDtoByEntity(member);
            memberRepository.save(member);

            return memberResponseDto;

        }
        MemberResponseDto memberResponseDto=memberCustomRepository.createMemberResponseDtoByEntity(member);
        return memberResponseDto;
    }

    @Override
    public MemberResponseDto memberSelectById(int memberId) {
        Member member=memberRepository.findMemberByMemberId(memberId);
        MemberResponseDto memberResponseDto=memberCustomRepository.createMemberResponseDtoByEntity(member);
        return memberResponseDto;
    }

}
