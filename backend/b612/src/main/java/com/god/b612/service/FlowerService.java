package com.god.b612.service;

import com.god.b612.dto.FlowerRequestDto;
import com.god.b612.dto.FlowerResponseDto;
import com.god.b612.dto.PlantRequestDto;

import java.util.List;

public interface FlowerService {
    FlowerResponseDto createFlower(FlowerRequestDto flowerRequestDto);

    FlowerResponseDto plantFlower(PlantRequestDto plantRequestDto);

    boolean deleteFlower(int flowerId);

    List<FlowerResponseDto> selectFlowersInMember(int memberId);

    Boolean isItPlanted(int flowerId);

    FlowerResponseDto sellFlower(int buyerId, int flowerId);

    List<FlowerResponseDto> selectMemberInventory(int memberId);
}
