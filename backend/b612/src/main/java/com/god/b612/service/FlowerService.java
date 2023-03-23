package com.god.b612.service;

import com.god.b612.dto.FlowerResponseDto;
import com.god.b612.dto.PlantRequestDto;

import java.util.List;

public interface FlowerService {
    FlowerResponseDto createFlower(int flowerId, int memberId);

    FlowerResponseDto plantFlower(PlantRequestDto plantRequestDto);

    boolean deleteFlower(int flowerId);

    List<FlowerResponseDto> selectFlowersInPlanet(int planetId);
}
