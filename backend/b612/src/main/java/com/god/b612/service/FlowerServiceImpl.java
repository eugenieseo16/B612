package com.god.b612.service;


import com.god.b612.dto.FlowerResponseDto;
import com.god.b612.dto.PlantRequestDto;
import com.god.b612.entity.Flower;
import com.god.b612.entity.Member;
import com.god.b612.entity.Planet;
import com.god.b612.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public FlowerResponseDto plantFlower(PlantRequestDto plantRequestDto) {
        Planet planet = planetRepository.findTopByPlanetNftId(plantRequestDto.getPlanetId());

        if (planet == null) {
            planetCustomRepository.createPlanet(plantRequestDto.getPlanetId());
        }

        FlowerResponseDto flowerResponseDto = flowerCustomRepository.makePlant(plantRequestDto.getFlowerId(), plantRequestDto.getPlanetId(), plantRequestDto.getX(), plantRequestDto.getY(), plantRequestDto.getZ());

        return flowerResponseDto;
    }


}
