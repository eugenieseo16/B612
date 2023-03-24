package com.god.b612.repository;

import com.god.b612.dto.BaobabArticleResponseDto;
import com.god.b612.entity.BaobabArticle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface BaobabArticleRepository extends JpaRepository<BaobabArticle, Integer> {
    Page<BaobabArticle> findAllByOrderByCreatedTimeDesc(Pageable pageable);

}
