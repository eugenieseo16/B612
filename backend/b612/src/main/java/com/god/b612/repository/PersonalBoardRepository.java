package com.god.b612.repository;

import com.god.b612.entity.PersonalBoard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PersonalBoardRepository extends JpaRepository<PersonalBoard, Integer> {
    Page<PersonalBoard> findAllByOrderByCreatedTimeDesc(Pageable pageable);

}
