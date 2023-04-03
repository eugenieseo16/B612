package com.god.b612.service;


import com.god.b612.dto.FlowerRequestDto;
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
    public FlowerResponseDto createFlower(FlowerRequestDto flowerRequestDto) {

        Member member = memberRepository.findMemberByMemberId(flowerRequestDto.getOwnerMemberId());

        Flower flower = Flower.builder()
                .flowerNftId(flowerRequestDto.getFlowerNftId())
                .flowerPlanted(false)
                .flowerOwnerId(member)
                .createdAt(flowerRequestDto.getCreatedAt())
                .onSale(flowerRequestDto.isOnSale())
                .flowerType(flowerRequestDto.getFlowerType())
                .build();

        flowerRepository.save(flower);

        FlowerResponseDto flowerResponseDto = flowerCustomRepository.makeDto(flower);

        return flowerResponseDto;
    }

    @Override
    @Transactional
    public FlowerResponseDto plantFlower(PlantRequestDto plantRequestDto) {
        FlowerResponseDto flowerResponseDto = flowerCustomRepository.makePlant(plantRequestDto.getFlowerId(), plantRequestDto.getX(), plantRequestDto.getY(), plantRequestDto.getZ());

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
    public List<FlowerResponseDto> selectFlowersInMember(int memberId) {
        Member member=memberRepository.findMemberByMemberId(memberId);

        List<Flower> flowers=flowerRepository.findFlowersByFlowerOwnerIdAndAndFlowerPlanted(member,true);

        ArrayList<FlowerResponseDto> flowerResponseDtos=new ArrayList<>();

        if(flowers.size()==0){
            return null;
        }
        else{
            for(Flower flower: flowers){
                flowerResponseDtos.add(flowerCustomRepository.makeDto(flower));
            }
            return flowerResponseDtos;
        }
    }

    @Override
    public Boolean isItPlanted(int flowerId) {
        Flower flower=flowerRepository.findFlowerByFlowerNftId(flowerId);

        if(flower==null){
            return null;
        }

        return flower.isFlowerPlanted();
    }

    @Override
    @Transactional
    public FlowerResponseDto sellFlower(int buyerId, int flowerId) {
        Member member=memberRepository.findMemberByMemberId(buyerId);
        Flower flower=flowerRepository.findFlowerByFlowerNftId(flowerId);
        PlantedFlower plantedFlower=plantedFlowerRepository.findPlantedFlowerByFlowerNftId(flowerId);

        if(plantedFlower!=null){
            plantedFlowerRepository.deleteByFlowerNftId(flowerId);
        }

        flower=Flower.builder()
                .flowerNftId(flower.getFlowerNftId())
                .flowerOwnerId(member)
                .flowerPlanted(false)
                .build();

        flowerRepository.save(flower);

        return flowerCustomRepository.makeDto(flower);
    }


    public List<FlowerResponseDto> selectMemberInventory(int memberId) {
        Member member=memberRepository.findMemberByMemberId(memberId);

        if(member==null){
            return null;
        }

        List<Flower> flowers=flowerRepository.findFlowersByFlowerOwnerIdAndAndFlowerPlanted(member,false);

        ArrayList<FlowerResponseDto> flowerResponseDtos=new ArrayList<>();

        if(flowers.size()==0){
            return null;
        }
        else{
            for(Flower flower: flowers){
                flowerResponseDtos.add(flowerCustomRepository.makeDto(flower));
            }
            return flowerResponseDtos;
        }
    }

}
