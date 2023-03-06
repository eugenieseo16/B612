package com.god.b612.entity;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "personal_boards")
public class PersonalBoards extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int personalBoardId;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "member_id")
    private Members personalBoardOwnerId;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "member_id")
    private Members personalBoardWriterId;

    @NotNull
    @Column(name = "personal_board_content")
    private String personalBoardContent;

    @Builder
    public PersonalBoards(int personalBoardId, Members personalBoardOwnerId, Members personalBoardWriterId, String personalBoardContent){
        this.personalBoardId=personalBoardId;
        this.personalBoardOwnerId=personalBoardOwnerId;
        this.personalBoardWriterId=personalBoardWriterId;
        this.personalBoardContent=personalBoardContent;
    }
}
