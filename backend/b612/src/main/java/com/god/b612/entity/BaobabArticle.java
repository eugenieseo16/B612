package com.god.b612.entity;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "baobab_articles")
public class BaobabArticle extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int baobabArticleId;

    @ManyToOne
    @JoinColumn(referencedColumnName = "member_id", name = "baobab_article_member_id")
    private Member baobabArticleMemberId;

    @NotNull
    private String baobabArticleContent;

    @Builder
    public BaobabArticle(int baobabArticleId, Member baobabArticleMemberId, String baobabArticleContent){
        this.baobabArticleContent=baobabArticleContent;
        this.baobabArticleId=baobabArticleId;
        this.baobabArticleMemberId=baobabArticleMemberId;
    }
}
