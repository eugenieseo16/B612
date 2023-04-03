package com.god.b612.dto;

import com.god.b612.entity.Member;
import com.god.b612.entity.Notification;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class NotificationResponseDto {
    private int notificationId;
    private String notificationContent;
    private Member ownerMember;

    private String checkYn;

    private LocalDateTime updatedTime;

    //entity -> dto
    public NotificationResponseDto(Notification entity) {
        this.notificationId = entity.getNotificationId();
        this.notificationContent = entity.getNotificationContent();
        this.ownerMember = entity.getOwnerMember();
        this.checkYn = entity.getCheckYn();
        this.updatedTime = entity.getUpdatedTime();
    }
}
