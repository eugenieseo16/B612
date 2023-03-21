package com.god.b612.repository;

import com.god.b612.dto.PlanetResponseDto;
import com.god.b612.entity.Like;
import com.god.b612.entity.Planet;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class PlanetCustomRepositoryImpl implements PlanetCustomRepository {

    @Autowired
    private final PlanetRepository planetRepository;

    @Override
    public Planet createPlanet(int planetId) {
        Planet planet=Planet.builder()
                .planetNftId(planetId)
                .planetLikesCount(0)
                .build();

        planetRepository.save(planet);

        return planet;
    }

    @Override
    public PlanetResponseDto makeDto(Planet planet) {
        PlanetResponseDto planetResponseDto;
        if(planet.getPlanetMemberId()!=null) {

            planetResponseDto = PlanetResponseDto.builder()
                    .planetNftId(planet.getPlanetNftId())
                    .planetLikeCount(planet.getPlanetLikesCount())
                    .memberId(planet.getPlanetMemberId().getMemberId())
                    .memberNickName(planet.getPlanetMemberId().getMemberNickname())
                    .memberCurrentScore(planet.getPlanetMemberId().getMemberCurrentScore())
                    .memberTierName(planet.getPlanetMemberId().getMemberTierId().getTierName())
                    .build();

        }
        planetResponseDto = PlanetResponseDto.builder()
                .planetNftId(planet.getPlanetNftId())
                .planetLikeCount(planet.getPlanetLikesCount())
                .build();

        return planetResponseDto;
    }

    @Override
    public PlanetResponseDto makeDtoByLike(Like like){
        PlanetResponseDto planetResponseDto=PlanetResponseDto.builder()
                .planetNftId(like.getLikePlanetNftId().getPlanetNftId())
                .planetLikeCount(like.getLikePlanetNftId().getPlanetLikesCount())
                .build();

        return planetResponseDto;
    }

}
