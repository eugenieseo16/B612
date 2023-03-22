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


        if (plantedFlower == null) {
            FlowerResponseDto flowerResponseDto = FlowerResponseDto.builder()
                    .flowerNftId(flower.getFlowerNftId())
                    .flowerPlanted(flower.isFlowerPlanted())
                    .ownerNickName(flower.getFlowerOwnerId().getMemberNickname())
                    .ownerId(flower.getFlowerOwnerId().getMemberId())
                    .ownerTierName(flower.getFlowerOwnerId().getMemberTierId().getTierName())
                    .build();

            return flowerResponseDto;
        } else {
            FlowerResponseDto flowerResponseDto = FlowerResponseDto.builder()
                    .flowerNftId(flower.getFlowerNftId())
                    .flowerPlanted(flower.isFlowerPlanted())
                    .ownerNickName(flower.getFlowerOwnerId().getMemberNickname())
                    .ownerId(flower.getFlowerOwnerId().getMemberId())
                    .ownerTierName(flower.getFlowerOwnerId().getMemberTierId().getTierName())
                    .planetId(plantedFlower.getPlanetNftId().getPlanetNftId())
                    .flowerLocationX(plantedFlower.getFlowerLocationX())
                    .flowerLocationY(plantedFlower.getFlowerLocationY())
                    .flowerLocationZ(plantedFlower.getFlowerLocationZ())
                    .build();

            return flowerResponseDto;
        }

    }

    @Override
    public FlowerResponseDto makePlant(int flowerId, int planetId, double x, double y, double z) {
        Flower flower = flowerRepository.findFlowerByFlowerNftId(flowerId);
        Planet planet = planetRepository.findTopByPlanetNftId(planetId);

        flower = Flower.builder()
                .flowerNftId(flowerId)
                .flowerOwnerId(flower.getFlowerOwnerId())
                .flowerPlanted(true)
                .build();

        flowerRepository.save(flower);

        PlantedFlower plantedFlower = PlantedFlower.builder()
                .flowerNftId(flowerId)
                .planetNftId(planet)
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
                .planetId(planetId)
                .flowerLocationX(x)
                .flowerLocationY(y)
                .flowerLocationZ(z)
                .build();


        return flowerResponseDto;
    }
}
