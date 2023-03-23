package com.god.b612.service;


import com.god.b612.dto.FlowerResponseDto;
import com.god.b612.dto.PlantRequestDto;
import com.god.b612.entity.Flower;
import com.god.b612.entity.Member;
import com.god.b612.entity.Planet;
import com.god.b612.entity.PlantedFlower;
import com.god.b612.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FlowerServiceImpl implements FlowerService {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    PlanetRepository planetRepository;

    @Autowired
    FlowerRepository flowerRepository;

    @Autowired
    FlowerCustomRepository flowerCustomRepository;

    @Autowired
    PlanetCustomRepository planetCustomRepository;
    private final PlantedFlowerRepository plantedFlowerRepository;


    @Override
    @Transactional
    public FlowerResponseDto createFlower(int flowerId, int memberId) {

        Member member = memberRepository.findMemberByMemberId(memberId);

        Flower flower = Flower.builder()
                .flowerNftId(flowerId)
                .flowerPlanted(false)
                .flowerOwnerId(member)
                .build();

        flowerRepository.save(flower);

        FlowerResponseDto flowerResponseDto = flowerCustomRepository.makeDto(flower);

        return flowerResponseDto;
    }

    @Override
    @Transactional
    public FlowerResponseDto plantFlower(PlantRequestDto plantRequestDto) {
        Planet planet = planetRepository.findTopByPlanetNftId(plantRequestDto.getPlanetId());

        if (planet == null) {
            planetCustomRepository.createPlanet(plantRequestDto.getPlanetId());
        }

        FlowerResponseDto flowerResponseDto = flowerCustomRepository.makePlant(plantRequestDto.getFlowerId(), plantRequestDto.getPlanetId(), plantRequestDto.getX(), plantRequestDto.getY(), plantRequestDto.getZ());

        return flowerResponseDto;
    }

    @Override
    @Transactional
    public boolean deleteFlower(int flowerId) {
        Flower flower=flowerRepository.findFlowerByFlowerNftId(flowerId);

        if(!flower.isFlowerPlanted()){
            plantedFlowerRepository.deleteByFlowerNftId(flowerId);
            return false;
        }
        else{
            flower=Flower.builder()
                    .flowerNftId(flowerId)
                    .flowerOwnerId(flower.getFlowerOwnerId())
                    .flowerPlanted(false)
                    .build();

            flowerRepository.save(flower);
        }

        plantedFlowerRepository.deleteByFlowerNftId(flowerId);

        return true;
    }

    @Override
    public List<FlowerResponseDto> selectFlowersInPlanet(int planetId) {
        Planet planet=planetRepository.findTopByPlanetNftId(planetId);
        List<PlantedFlower> plantedFlowers=plantedFlowerRepository.findPlantedFlowersByPlanetNftId(planet);
        ArrayList<FlowerResponseDto> flowerResponseDtos=new ArrayList<>();

        if(plantedFlowers.size()==0){
            return null;
        }
        else{
            for(PlantedFlower plantedFlower: plantedFlowers){
                Flower flower=flowerRepository.findFlowerByFlowerNftId(plantedFlower.getFlowerNftId());
                flowerResponseDtos.add(flowerCustomRepository.makeDto(flower));
            }
            return flowerResponseDtos;
        }
    }


}
