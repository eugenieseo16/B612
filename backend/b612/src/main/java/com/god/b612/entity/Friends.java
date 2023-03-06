package com.god.b612.entity;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "friends")
public class Friends extends  BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int friendId;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "member_id")
    private Members friendRequestMemberId;
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "member_id")
    private Members friendResponseMemberId;

    @NotNull
    @ColumnDefault("0")
    private byte friendAccepted;

    @Builder
    public Friends(int friendId, Members friendRequestMemberId, Members friendResponseMemberId, byte friendAccepted) {
        this.friendId = friendId;
        this.friendRequestMemberId = friendRequestMemberId;
        this.friendResponseMemberId = friendResponseMemberId;
        this.friendAccepted = friendAccepted;
    }

}
