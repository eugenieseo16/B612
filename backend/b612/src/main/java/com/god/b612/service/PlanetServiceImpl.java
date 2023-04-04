package com.god.b612.service;

import com.god.b612.dto.PlanetResponseDto;
import com.god.b612.dto.PlanetResponseDtoForRank;
import com.god.b612.entity.Like;
import com.god.b612.entity.Member;
import com.god.b612.entity.Planet;
import com.god.b612.entity.Tier;
import com.god.b612.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PlanetServiceImpl implements PlanetService {
    @Autowired
    private final PlanetRepository planetRepository;

    @Autowired
    private final PlanetCustomRepository planetCustomRepository;

    @Autowired
    private final MemberRepository memberRepository;

    @Autowired
    private final LikeRepository likeRepository;
    @Autowired
    private TierRepository tierRepository;

    //행성 좋아요 생성 및 삭제
    @Override
    public boolean createAndDeleteLike(int planetId, int memberId) {
        Planet planet = planetRepository.findTopByPlanetNftId(planetId);

        if (planet == null) {
            planet = planetCustomRepository.createPlanet(planetId);
        }

        Member member = memberRepository.findMemberByMemberId(memberId);

        if (member == null) {
            return false;
        }

        Like like = likeRepository.findLikeByLikeMemberIdAndLikePlanetNftId(member, planet);

        if (like == null) {//라이크 생성
            like = Like.builder()
                    .likeMemberId(member)
                    .likePlanetNftId(planet)
                    .build();

            likeRepository.save(like);

            if (planet.getPlanetMemberId() != null) {
                Member planetOwner = planet.getPlanetMemberId();
                int memberLike=planetOwner.getMemberLiked()+1;

                planetOwner = Member.builder()
                        .memberId(planetOwner.getMemberId())
                        .memberHighestScore(planetOwner.getMemberHighestScore())
                        .memberTierId(planetOwner.getMemberTierId())
                        .memberNickname(planetOwner.getMemberNickname())
                        .memberCurrentScore(planetOwner.getMemberCurrentScore())
                        .memberImage(planetOwner.getMemberImage())
                        .memberAddress(planetOwner.getMemberAddress())
                        .memberLiked(memberLike)
                        .build();

                memberRepository.save(planetOwner);
            }
            int planetLike=planet.getPlanetLikesCount() + 1;

            planet = Planet.builder()
                    .planetNftId(planet.getPlanetNftId())
                    .planetLikesCount(planetLike)
                    .planetMemberId(planet.getPlanetMemberId())
                    .build();

            planetRepository.save(planet);
            return true;
        } else {
            //라이크 삭제(이미 있을 경우)
            likeRepository.deleteLikeByLikeId(like.getLikeId());

            int planetLike=planet.getPlanetLikesCount() - 1;





            if (planet.getPlanetMemberId() != null) {
                Member planetOwner = planet.getPlanetMemberId();
                int memberLike=planetOwner.getMemberLiked()-1;
                planetOwner = Member.builder()
                        .memberId(planetOwner.getMemberId())
                        .memberHighestScore(planetOwner.getMemberHighestScore())
                        .memberTierId(planetOwner.getMemberTierId())
                        .memberNickname(planetOwner.getMemberNickname())
                        .memberCurrentScore(planetOwner.getMemberCurrentScore())
                        .memberImage(planetOwner.getMemberImage())
                        .memberAddress(planetOwner.getMemberAddress())
                        .memberLiked(memberLike)
                        .build();

                memberRepository.save(planetOwner);
            }

            planet = Planet.builder()
                    .planetNftId(planet.getPlanetNftId())
                    .planetLikesCount(planet.getPlanetLikesCount() - 1)
                    .planetMemberId(planet.getPlanetMemberId())
                    .build();

            planetRepository.save(planet);

            return true;
        }

    }

    @Override
    public PlanetResponseDto findPlanetLike(int planetId) {
        Planet planet = planetRepository.findTopByPlanetNftId(planetId);
        if (planet == null) {
            planet = planetCustomRepository.createPlanet(planetId);
        }
        PlanetResponseDto planetResponseDto = planetCustomRepository.makeDto(planet);

        return planetResponseDto;
    }

    @Override
    public List<PlanetResponseDtoForRank> viewPlanetRanking(int page, int size) {
        ArrayList<PlanetResponseDtoForRank> planetResponseDtos = new ArrayList<>();
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<Planet> planets = planetRepository.findAllByOrderByPlanetLikesCountDesc(pageRequest);

        Integer rank = page * size + 1;
        for (Planet planet : planets) {
            planetResponseDtos.add(planetCustomRepository.makeDtoForRank(planet, rank));
            rank++;
        }

        return planetResponseDtos;
    }

    @Override
    public List<PlanetResponseDto> viewLikedPlanet(int memberId, int page, int size) {
        ArrayList<PlanetResponseDto> planetResponseDtos = new ArrayList<>();
        PageRequest pageRequest = PageRequest.of(page, size);
        Member member = memberRepository.findMemberByMemberId(memberId);

        if(member==null){
            return null;
        }
        Page<Like> likes = likeRepository.findAllByLikeMemberIdOrderByLikePlanetNftId(member, pageRequest);

        for (Like like : likes) {
            PlanetResponseDto planetResponseDto = planetCustomRepository.makeDtoByLike(like);
            planetResponseDtos.add(planetResponseDto);
        }

        return planetResponseDtos;
    }

    @Override
    public boolean checkSomeoneLiked(int memberId, int planetId) {
        Member member = memberRepository.findMemberByMemberId(memberId);
        Planet planet = planetRepository.findTopByPlanetNftId(planetId);

        if (planet == null) {
            planet = planetCustomRepository.createPlanet(planetId);
        }

        Like like = likeRepository.findLikeByLikeMemberIdAndLikePlanetNftId(member, planet);

        if (like == null) {
            return false;
        }

        return true;
    }

    @Override
    public PlanetResponseDto buyPlanet(int memberId, int planetId) {
        Member member = memberRepository.findMemberByMemberId(memberId);
        Planet planet = planetRepository.findTopByPlanetNftId(planetId);

        if (planet == null) {
            planet = planetCustomRepository.createPlanet(planetId);
        }

        if (member == null) {
            return null;
        }

        if(planet.getPlanetMemberId()!=null){
            Member pastOwner=planet.getPlanetMemberId();
            int memberscore=pastOwner.getMemberCurrentScore()-1;

            pastOwner=Member.builder()
                    .memberId(pastOwner.getMemberId())
                    .memberHighestScore(pastOwner.getMemberHighestScore())
                    .memberTierId(pastOwner.getMemberTierId())
                    .memberNickname(pastOwner.getMemberNickname())
                    .memberCurrentScore(memberscore)
                    .memberImage(pastOwner.getMemberImage())
                    .memberAddress(pastOwner.getMemberAddress())
                    .memberLiked(pastOwner.getMemberLiked() - planet.getPlanetLikesCount())
                    .build();

            memberRepository.save(pastOwner);

        }

        planet = Planet.builder()
                .planetNftId(planetId)
                .planetLikesCount(planet.getPlanetLikesCount())
                .planetMemberId(member)
                .build();

        planetRepository.save(planet);



        Member planetOwner = member;
        int memberscore=planetOwner.getMemberCurrentScore()+1;
        int memberhigh=planetOwner.getMemberHighestScore();
        Tier memberTier=planetOwner.getMemberTierId();

        if(memberscore>memberhigh){
            memberhigh=memberscore;

            if(memberhigh==1){
                memberTier=tierRepository.findTierByTierId(2);
            }

            else if(memberhigh==3){
                memberTier=tierRepository.findTierByTierId(3);
            }

            else if(memberhigh==5){
                memberTier=tierRepository.findTierByTierId(4);
            }

            else if(memberhigh==7){
                memberTier=tierRepository.findTierByTierId(5);
            }

        }

        planetOwner = Member.builder()
                .memberId(planetOwner.getMemberId())
                .memberHighestScore(memberhigh)
                .memberTierId(memberTier)
                .memberNickname(planetOwner.getMemberNickname())
                .memberCurrentScore(memberscore)
                .memberImage(planetOwner.getMemberImage())
                .memberAddress(planetOwner.getMemberAddress())
                .memberLiked(planetOwner.getMemberLiked() + planet.getPlanetLikesCount())
                .build();

        memberRepository.save(planetOwner);


        PlanetResponseDto planetResponseDto = planetCustomRepository.makeDto(planet);
        return planetResponseDto;
    }

    @Override
    public List<PlanetResponseDto> viewMemberStar(int memberId) {
        ArrayList<PlanetResponseDto> planetResponseDtos=new ArrayList<>();
        Member member=memberRepository.findMemberByMemberId(memberId);
        if(member==null){
            return null;
        }
        List<Planet> planets =  planetRepository.findAllByPlanetMemberIdOrderByPlanetLikesCount(member);

        if(planets.size()==0){
            return planetResponseDtos;
        }

        for(Planet planet:planets){
            planetResponseDtos.add(planetCustomRepository.makeDto(planet));
        }
        return planetResponseDtos;
    }


    @Override
    public PlanetResponseDto randomMyPlanet(int memberId){
        Member me=memberRepository.findMemberByMemberId(memberId);


        if(me==null){
            List<Planet> planets= planetRepository.randomPlanet();
            Planet planet=planets.get(0);
            return planetCustomRepository.makeDto(planet);
        }

        List<Planet> planets= planetRepository.findAllByPlanetMemberId(me);


        int n=planets.size();

        if(n==0){
            planets= planetRepository.randomPlanet();
            Planet planet=planets.get(0);
            return planetCustomRepository.makeDto(planet);
        }


        Planet planet=planets.get((int)(Math.random()*n));

        return planetCustomRepository.makeDto(planet);
    }


}
