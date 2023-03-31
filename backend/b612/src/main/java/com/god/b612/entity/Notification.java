package com.god.b612.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@DynamicInsert
@Table(name = "notification")
public class Notification extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int notificationId;

    @Column(nullable = false)
    private String notificationContent;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "member_id")
    private Member ownerMember;

    @ColumnDefault("'N'")
    private String checkYn;

    @Builder
    public Notification(int notificationId, String notificationContent, Member ownerMember, String checkYn) {
        this.notificationId = notificationId;
        this.notificationContent = notificationContent;
        this.ownerMember = ownerMember;
        this.checkYn = checkYn;
    }
}
