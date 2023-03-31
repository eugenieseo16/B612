package com.god.b612.dto;

import com.god.b612.entity.Member;
import com.god.b612.entity.Notification;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class NotificationUpdateRequestDto {
    private int notificationId;
    private String notificationContent;

    private String checkYn;

    private Member ownerMember;

    public Notification toEntity() {
        return Notification.builder()
                .notificationId(notificationId)
                .notificationContent(notificationContent)
                .checkYn(checkYn)
                .ownerMember(ownerMember)
                .build();
    }

}
