package com.god.b612.repository;

import com.god.b612.dto.FlowerResponseDto;
import com.god.b612.entity.Flower;

public interface FlowerCustomRepository {
    FlowerResponseDto makeDto(Flower flower);

    FlowerResponseDto makePlant(int flowerId, double x, double y, double z);


}
