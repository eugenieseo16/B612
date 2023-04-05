package com.god.b612.service;

import com.god.b612.dto.MemberResponseDto;
import com.god.b612.dto.MemberResponseDtoForRank;
import com.god.b612.dto.PlanetMakeDto;
import com.god.b612.entity.Member;
import com.god.b612.entity.Planet;
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
import java.util.Map;

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
            Map<String, Object> tmp = memberCustomRepository.makeRandomNickName();
            member = Member.builder()
                    .memberAddress(memberAddress)
                    .memberNickname((String) tmp.get("nickname"))
                    .memberImage((String) tmp.get("image"))
                    .memberCharacter((int) tmp.get("character"))
                    .memberTierId(tierRepository.findTierByTierId(1))
                    .memberCurrentScore(0)
                    .memberHighestScore(0)
                    .memberLiked(0)
                    .memberCharacter((int)(Math.random()*10))
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
    public MemberResponseDto reloadUser(List<PlanetMakeDto> planetMakeDtos,int memberId){
        Member member=memberRepository.findMemberByMemberId(memberId);
        if(member==null){
            return null;
        }
        int score=planetMakeDtos.size();
        int memberLike=0;

        for(PlanetMakeDto planetMakeDto:planetMakeDtos){
            if(planetRepository.findTopByPlanetNftId(planetMakeDto.getPlanetNftId())==null){
                //플래닛이 기존에 없었으면 생성한다( like ==0)
                Planet planet=Planet.builder()
                        .planetName(planetMakeDto.getPlanetName())
                        .planetType(planetMakeDto.getPlanetType())
                        .planetMemberId(member)
                        .planetLikesCount(0)
                        .planetNftId(planetMakeDto.getPlanetNftId())
                        .createdAt(planetMakeDto.getCreatedAt())
                        .onSale(planetMakeDto.isOnSale())
                        .build();

                planetRepository.save(planet);
            }
            else{
                Planet planet=Planet.builder()
                        .planetName(planetMakeDto.getPlanetName())
                        .planetType(planetMakeDto.getPlanetType())
                        .planetMemberId(member)
                        .planetLikesCount(planetMakeDto.getPlanetLikesCount())
                        .planetNftId(planetMakeDto.getPlanetNftId())
                        .createdAt(planetMakeDto.getCreatedAt())
                        .onSale(planetMakeDto.isOnSale())
                        .build();

                memberLike+=planet.getPlanetLikesCount();

                planetRepository.save(planet);
            }
        }
        if(score>member.getMemberHighestScore()){
            int memberTier=1;

            if(score>=7){
                memberTier=5;
            }
            else if(score>=5){
                memberTier=4;
            }
            else if(score>=3){
                memberTier=3;
            }
            else if(score>=1){
                memberTier=2;
            }


            member=Member.builder()
                    .memberId(memberId)
                    .memberNickname(member.getMemberNickname())
                    .memberAddress(member.getMemberAddress())
                    .memberCurrentScore(score)
                    .memberHighestScore(score)
                    .memberImage(member.getMemberImage())
                    .memberTierId(tierRepository.findTierByTierId(memberTier))
                    .memberLiked(memberLike)
                    .memberCharacter(member.getMemberCharacter())
                    .build();
        }
        else{
            member=Member.builder()
                    .memberId(memberId)
                    .memberNickname(member.getMemberNickname())
                    .memberAddress(member.getMemberAddress())
                    .memberCurrentScore(score)
                    .memberHighestScore(member.getMemberHighestScore())
                    .memberImage(member.getMemberImage())
                    .memberTierId(member.getMemberTierId())
                    .memberLiked(memberLike)
                    .memberCharacter(member.getMemberCharacter())
                    .build();
        }

        memberRepository.save(member);

        return memberCustomRepository.makeMemberDto(member);
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
                .memberCharacter(member.getMemberCharacter())
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
