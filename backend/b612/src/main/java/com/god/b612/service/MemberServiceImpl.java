package com.god.b612.service;

import com.god.b612.dto.MemberResponseDto;
import com.god.b612.dto.MemberResponseDtoForRank;
import com.god.b612.dto.PlanetResponseDto;
import com.god.b612.entity.Member;
import com.god.b612.repository.MemberCustomRepository;
import com.god.b612.repository.MemberRepository;
import com.god.b612.repository.PlanetRepository;
import com.god.b612.repository.TierRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    @Autowired
    private final MemberRepository memberRepository;

    @Autowired
    private final TierRepository tierRepository;

    @Autowired
    private final MemberCustomRepository memberCustomRepository;

    @Autowired
    private final PlanetRepository planetRepository;


    @Transactional
    @Override
    public MemberResponseDto membersLoginOrRegist(String memberAddress) {
        Member member = memberRepository.findMemberByMemberAddress(memberAddress);

        if (member == null) {
            member = Member.builder()
                    .memberAddress(memberAddress)
                    .memberNickname(memberCustomRepository.makeRandomNickName())
                    .memberImage(null)
                    .memberTierId(tierRepository.findTierByTierId(1))
                    .memberCurrentScore(0)
                    .memberHighestScore(0)
                    .memberLiked(0)
                    .build();

            memberRepository.save(member);
            Member addedMember = memberRepository.findMemberByMemberAddress(memberAddress);
            MemberResponseDto memberResponseDto = memberCustomRepository.createMemberResponseDtoByEntity(addedMember);
            System.out.println(memberResponseDto.toString());
            return memberResponseDto;

        }
        MemberResponseDto memberResponseDto = memberCustomRepository.createMemberResponseDtoByEntity(member);
        return memberResponseDto;
    }

    @Override
    public MemberResponseDto memberSelectById(int memberId) {
        Member member = memberRepository.findMemberByMemberId(memberId);
        MemberResponseDto memberResponseDto = memberCustomRepository.createMemberResponseDtoByEntity(member);
        return memberResponseDto;
    }

    @Override
    public MemberResponseDto memberSelectByAddress(String memberAddress) {
        Member member = memberRepository.findMemberByMemberAddress(memberAddress);
        if(member == null){
            return null;
        }
        MemberResponseDto memberResponseDto = memberCustomRepository.createMemberResponseDtoByEntity(member);
        return memberResponseDto;
    }

    @Transactional
    @Override
    public Boolean updateInfoByAddress(String url, String address) {
        return memberCustomRepository.updateMember(url, address);
    }

    @Override
    public Boolean checkNickname(String nickname) {
        Member member=memberRepository.findMemberByMemberNickname(nickname);
        if(member==null){
            return true;
        }
        return false;
    }

    @Override
    public MemberResponseDto changeNickname(int memberId, String nickname) {
        Member member=memberRepository.findMemberByMemberId(memberId);
        member=Member.builder()
                .memberId(memberId)
                .memberNickname(nickname)
                .memberAddress(member.getMemberAddress())
                .memberCurrentScore(member.getMemberCurrentScore())
                .memberHighestScore(member.getMemberHighestScore())
                .memberImage(member.getMemberImage())
                .memberTierId(member.getMemberTierId())
                .memberLiked(member.getMemberLiked())
                .build();

        memberRepository.save(member);

        return memberCustomRepository.createMemberResponseDtoByEntity(member);
    }

    @Override
    public List<MemberResponseDto> searchMember(String string) {
        List<Member> members = memberRepository.findMembersByMemberNicknameContaining(string);
        ArrayList<MemberResponseDto> memberResponseDtos=new ArrayList<>();
        if(members.size()==0){
            return null;
        }
        else{
            for(Member member : members){
                memberResponseDtos.add(memberCustomRepository.createMemberResponseDtoByEntity(member));
            }
        }

        return memberResponseDtos;
    }


    @Override
    public List<MemberResponseDtoForRank> viewRank(int page, int size) {

        PageRequest pageRequest=PageRequest.of(page,size);
        Page<Member> members=memberRepository.findMembersByOrderByMemberLikedDesc(pageRequest);
        ArrayList<MemberResponseDtoForRank> memberResponseDtoForRanks=new ArrayList<>();

        int rank=page*size+1;
        for(Member member:members){
            memberResponseDtoForRanks.add(memberCustomRepository.makeMemberDtoForRank(member,rank));
            rank++;
        }

        return memberResponseDtoForRanks;
    }

    @Override
    public MemberResponseDto randomUser(int myId){
        Member me=memberRepository.findMemberByMemberId(myId);
        List<Member> rand;



        while(true){
            rand=memberRepository.randomMember();
            if(myId!=rand.get(0).getMemberId()){
                break;
            }
        }

        MemberResponseDto memberResponseDto=memberCustomRepository.createMemberResponseDtoByEntity(rand.get(0));

        return memberResponseDto;
    }

}
