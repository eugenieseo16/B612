package com.god.b612.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ChatDto {
    private String sender;
    private String message;
//    private String createdTime;
}
