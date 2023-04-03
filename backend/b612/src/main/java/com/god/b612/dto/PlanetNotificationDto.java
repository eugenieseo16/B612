package com.god.b612.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PlanetNotificationDto {
    private int oldOwnerId;

    private int newOwnerId;

    private int planetNftId;

}
