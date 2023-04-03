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
public class PersonalBoard extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int personalBoardId;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(referencedColumnName = "member_id", name = "personal_board_owner_id")
    private Member personalBoardOwnerId;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(referencedColumnName = "member_id", name = "personal_board_writer_id")
    private Member personalBoardWriterId;

    @NotNull
    @Column(name = "personal_board_content")
    private String personalBoardContent;

    @Builder
    public PersonalBoard(int personalBoardId, Member personalBoardOwnerId, Member personalBoardWriterId, String personalBoardContent){
        this.personalBoardId=personalBoardId;
        this.personalBoardOwnerId=personalBoardOwnerId;
        this.personalBoardWriterId=personalBoardWriterId;
        this.personalBoardContent=personalBoardContent;
    }
}

