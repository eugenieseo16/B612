package com.god.b612.repository;

import com.god.b612.dto.PlanetResponseDto;
import com.god.b612.dto.PlanetResponseDtoForRank;
import com.god.b612.entity.Like;
import com.god.b612.entity.Planet;

public interface PlanetCustomRepository {
    Planet createPlanet(int planetId);

    PlanetResponseDtoForRank makeDtoForRank(Planet planet, Integer rank);

    PlanetResponseDto makeDto(Planet planet);

    PlanetResponseDto makeDtoByLike(Like like);

}
