package com.god.b612.service;

import com.god.b612.dto.PlanetResponseDto;
import com.god.b612.entity.Like;
import com.god.b612.entity.Member;
import com.god.b612.entity.Planet;
import com.god.b612.repository.LikeRepository;
import com.god.b612.repository.MemberRepository;
import com.god.b612.repository.PlanetCustomRepository;
import com.god.b612.repository.PlanetRepository;
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

            planet = Planet.builder()
                    .planetNftId(planet.getPlanetNftId())
                    .planetLikesCount(planet.getPlanetLikesCount() + 1)
                    .build();

            planetRepository.save(planet);
            return true;
        } else {
            //라이크 삭제(이미 있을 경우)
            likeRepository.deleteLikeByLikeId(like.getLikeId());

            planet = Planet.builder()
                    .planetNftId(planet.getPlanetNftId())
                    .planetLikesCount(planet.getPlanetLikesCount() - 1)
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
    public List<PlanetResponseDto> viewPlanetRanking(int page, int size) {
        ArrayList<PlanetResponseDto> planetResponseDtos = new ArrayList<>();
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<Planet> planets = planetRepository.findAllByOrderByPlanetLikesCountDesc(pageRequest);

        for (Planet planet : planets) {
            planetResponseDtos.add(planetCustomRepository.makeDto(planet));
        }

        return planetResponseDtos;
    }

    @Override
    public List<PlanetResponseDto> viewLikedPlanet(int memberId, int page, int size) {
        ArrayList<PlanetResponseDto> planetResponseDtos = new ArrayList<>();
        PageRequest pageRequest = PageRequest.of(page, size);
        Member member = memberRepository.findMemberByMemberId(memberId);
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

        planet = Planet.builder()
                .planetNftId(planetId)
                .planetLikesCount(planet.getPlanetLikesCount())
                .planetMemberId(member)
                .build();

        planetRepository.save(planet);

        PlanetResponseDto planetResponseDto = planetCustomRepository.makeDto(planet);
        return planetResponseDto;
    }


}
