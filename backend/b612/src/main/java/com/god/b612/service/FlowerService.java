package com.god.b612.service;

import com.god.b612.dto.FlowerResponseDto;
import com.god.b612.dto.PlantRequestDto;

public interface FlowerService {
    FlowerResponseDto createFlower(int flowerId, int memberId);

    FlowerResponseDto plantFlower(PlantRequestDto plantRequestDto);
}
