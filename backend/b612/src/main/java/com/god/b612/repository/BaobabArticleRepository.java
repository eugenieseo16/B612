package com.god.b612.repository;

import com.god.b612.entity.BaobabArticle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface BaobabArticleRepository extends JpaRepository<BaobabArticle, Integer> {

    Page<BaobabArticle> findAllByOrderByCreatedAtDesc(Pageable pageable);

}
