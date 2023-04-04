package com.god.b612.repository;

import com.god.b612.entity.Member;
import com.god.b612.entity.Planet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PlanetRepository extends JpaRepository<Planet, Integer> {
    Planet findTopByPlanetNftId(int id);

    Page<Planet> findAllByOrderByPlanetLikesCountDesc(Pageable pageable);

    List<Planet> findAllByPlanetMemberIdOrderByPlanetLikesCount(Member member);

    List<Planet> findAllByPlanetMemberId(Member member);

    @Query(value = "SELECT * FROM planets order by RAND() limit 1",nativeQuery = true)
    List<Planet> randomPlanet();
}
