package com.god.b612.repository;

import com.god.b612.entity.PlantedFlower;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlantedFlowerRepository extends JpaRepository<PlantedFlower, Integer> {
    PlantedFlower findPlantedFlowerByFlowerNftId(int flowerId);
    void deleteByFlowerNftId(int flowerId);
}
