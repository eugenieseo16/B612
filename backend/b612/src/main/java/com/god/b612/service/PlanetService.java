package com.god.b612.service;

import com.god.b612.dto.PlanetResponseDto;
import com.god.b612.dto.PlanetResponseDtoForRank;

import java.util.List;

public interface PlanetService {
    //행성 좋아요 생성 및 삭제
    boolean createAndDeleteLike(int planetId, int memberId);

    PlanetResponseDto findPlanetLike(int planetId);

    List<PlanetResponseDtoForRank> viewPlanetRanking(int page, int size);

    List<PlanetResponseDto> viewLikedPlanet(int memberId, int page, int size);

    boolean checkSomeoneLiked(int memberId, int planetId);

    PlanetResponseDto buyPlanet(int memberId, int planetId);
}
