package com.god.b612.controller;

import com.god.b612.dto.ChatDto;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/chat")
public class ChatController {
    private SimpMessagingTemplate messagingTemplate;

    public ChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }
    @MessageMapping("/send")
    public void sendMessage(@Payload ChatDto chatDto) {
        messagingTemplate.convertAndSend("/topic/chat", chatDto);
    }

}
