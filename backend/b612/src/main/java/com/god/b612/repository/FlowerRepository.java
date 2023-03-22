package com.god.b612.repository;

import com.god.b612.entity.Flower;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlowerRepository extends JpaRepository<Flower, Integer> {
    Flower findFlowerByFlowerNftId(int flowerId);
}
