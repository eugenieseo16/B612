package com.god.b612.repository;

import com.god.b612.dto.PlanetRequestDto;
import com.god.b612.entity.Planet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanetRepository extends JpaRepository<Planet, Integer> {
    Planet findTopByPlanetNftId(int id);
    Page<Planet> findAllByOrderByPlanetLikesCountDesc(Pageable pageable);
}
