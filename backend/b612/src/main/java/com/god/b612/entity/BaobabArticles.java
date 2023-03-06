package com.god.b612.entity;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "baobab_articles")
public class BaobabArticles extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int baobabArticleId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Members baobabArticleMemberId;

    @NotNull
    private String baobabArticleContent;

    @Builder
    public BaobabArticles(int baobabArticleId, Members baobabArticleMemberId, String baobabArticleContent){
        this.baobabArticleContent=baobabArticleContent;
        this.baobabArticleId=baobabArticleId;
        this.baobabArticleMemberId=baobabArticleMemberId;
    }
}
