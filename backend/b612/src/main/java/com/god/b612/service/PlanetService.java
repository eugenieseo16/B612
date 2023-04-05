package com.god.b612.service;

import com.god.b612.dto.PlanetResponseDto;
import com.god.b612.dto.PlanetResponseDtoForRank;
import com.god.b612.dto.PlanetMakeDto;

import java.util.List;

public interface PlanetService {
    PlanetResponseDto selectPlanet(int planetId);

    PlanetResponseDto RegistPlanet(PlanetMakeDto planetMakeDto);
    //행성 좋아요 생성 및 삭제
    boolean createAndDeleteLike(int planetId, int memberId);

    PlanetResponseDto findPlanetLike(int planetId);

    List<PlanetResponseDtoForRank> viewPlanetRanking(int page, int size);

    List<PlanetResponseDto> viewLikedPlanet(int memberId, int page, int size);

    boolean checkSomeoneLiked(int memberId, int planetId);

    PlanetResponseDto buyPlanet(int memberId, int planetId);

    List<PlanetResponseDto> viewMemberStar(int memberId);

    PlanetResponseDto randomMyPlanet(int memberId);
}
