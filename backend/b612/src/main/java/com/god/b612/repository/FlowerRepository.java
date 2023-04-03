package com.god.b612.repository;

import com.god.b612.entity.Flower;
import com.god.b612.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlowerRepository extends JpaRepository<Flower, Integer> {

    List<Flower> findFlowersByFlowerOwnerIdAndAndFlowerPlanted(Member member, boolean planted);
    List<Flower> findFlowersByFlowerOwnerId(Member member);
    Flower findFlowerByFlowerNftId(int flowerId);
}
