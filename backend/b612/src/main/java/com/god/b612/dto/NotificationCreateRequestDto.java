package com.god.b612.dto;

import com.god.b612.entity.Member;
import com.god.b612.entity.Notification;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class NotificationCreateRequestDto {
    private String notificationContent;

    private Member ownerMember;

    public Notification toEntity() {
        return Notification.builder()
                .notificationContent(notificationContent)
                .ownerMember(ownerMember)
                .build();
    }

}
