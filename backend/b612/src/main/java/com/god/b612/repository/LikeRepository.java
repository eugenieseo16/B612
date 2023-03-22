package com.god.b612.repository;

import com.god.b612.entity.Like;
import com.god.b612.entity.Member;
import com.god.b612.entity.Planet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Like, Integer> {
    Like findLikeByLikeMemberIdAndLikePlanetNftId(Member member, Planet planet);

    void deleteLikeByLikeId(int likeId);

    Page<Like> findAllByLikeMemberIdOrderByLikePlanetNftId(Member member, Pageable pageable);

}
