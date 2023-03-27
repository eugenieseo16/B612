package com.god.b612.repository;

import com.god.b612.entity.Tier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TierRepository extends JpaRepository<Tier, Integer> {
    String findTierNameByTierId(int tierId);
    Tier findTierByTierId(int tierId);
}
