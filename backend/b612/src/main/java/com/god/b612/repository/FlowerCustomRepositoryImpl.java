package com.god.b612.repository;

import com.god.b612.dto.FlowerResponseDto;
import com.god.b612.entity.Flower;
import com.god.b612.entity.Planet;
import com.god.b612.entity.PlantedFlower;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class FlowerCustomRepositoryImpl implements FlowerCustomRepository {

    @Autowired
    FlowerRepository flowerRepository;

    @Autowired
    PlantedFlowerRepository plantedFlowerRepository;
    private final PlanetRepository planetRepository;


    @Override
    public FlowerResponseDto makeDto(Flower flower) {
        PlantedFlower plantedFlower = plantedFlowerRepository.findPlantedFlowerByFlowerNftId(flower.getFlowerNftId());
        /*
        this.createdAt=createdAt;
        this.ownerAddress=ownerAddress;
        this.flowerType=flowerType;
        this.onSale=onSale;
        * */

        if (plantedFlower == null) {
            FlowerResponseDto flowerResponseDto = FlowerResponseDto.builder()
                    .flowerNftId(flower.getFlowerNftId())
                    .flowerPlanted(flower.isFlowerPlanted())
                    .ownerNickName(flower.getFlowerOwnerId().getMemberNickname())
                    .ownerId(flower.getFlowerOwnerId().getMemberId())
                    .ownerTierName(flower.getFlowerOwnerId().getMemberTierId().getTierName())
                    .createdAt(flower.getCreatedAt())
                    .ownerAddress(flower.getFlowerOwnerId().getMemberAddress())
                    .flowerType(flower.getFlowerType())
                    .onSale(flower.isOnSale())
                    .build();

            return flowerResponseDto;
        } else {
            FlowerResponseDto flowerResponseDto = FlowerResponseDto.builder()
                    .flowerNftId(flower.getFlowerNftId())
                    .flowerPlanted(flower.isFlowerPlanted())
                    .ownerNickName(flower.getFlowerOwnerId().getMemberNickname())
                    .ownerId(flower.getFlowerOwnerId().getMemberId())
                    .ownerTierName(flower.getFlowerOwnerId().getMemberTierId().getTierName())
                    .flowerLocationX(plantedFlower.getFlowerLocationX())
                    .flowerLocationY(plantedFlower.getFlowerLocationY())
                    .flowerLocationZ(plantedFlower.getFlowerLocationZ())
                    .createdAt(flower.getCreatedAt())
                    .ownerAddress(flower.getFlowerOwnerId().getMemberAddress())
                    .flowerType(flower.getFlowerType())
                    .onSale(flower.isOnSale())
                    .build();

            return flowerResponseDto;
        }

    }

    @Override
    public FlowerResponseDto makePlant(int flowerId, double x, double y, double z) {
        Flower flower = flowerRepository.findFlowerByFlowerNftId(flowerId);

        flower = Flower.builder()
                .flowerNftId(flowerId)
                .flowerOwnerId(flower.getFlowerOwnerId())
                .flowerPlanted(true)
                .createdAt(flower.getCreatedAt())
                .onSale(flower.isOnSale())
                .flowerType(flower.getFlowerType())
                .build();

        flowerRepository.save(flower);

        PlantedFlower plantedFlower = PlantedFlower.builder()
                .flowerNftId(flowerId)
                .flowerLocationX(x)
                .flowerLocationY(y)
                .flowerLocationZ(z)
                .build();

        plantedFlowerRepository.save(plantedFlower);

        FlowerResponseDto flowerResponseDto = FlowerResponseDto.builder()
                .flowerNftId(flower.getFlowerNftId())
                .flowerPlanted(true)
                .ownerNickName(flower.getFlowerOwnerId().getMemberNickname())
                .ownerId(flower.getFlowerOwnerId().getMemberId())
                .ownerTierName(flower.getFlowerOwnerId().getMemberTierId().getTierName())
                .ownerAddress(flower.getFlowerOwnerId().getMemberAddress())
                .flowerType(flower.getFlowerType())
                .onSale(flower.isOnSale())
                .flowerLocationX(x)
                .flowerLocationY(y)
                .flowerLocationZ(z)
                .build();


        return flowerResponseDto;
    }
}
