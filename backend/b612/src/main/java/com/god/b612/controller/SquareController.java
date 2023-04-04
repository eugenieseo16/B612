package com.god.b612.controller;

import com.god.b612.dto.MemberMoveEvent;
import com.god.b612.handler.WebSocketMoveHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/square")
public class SquareController {
    private final WebSocketMoveHandler webSocketMoveHandler;

    public SquareController(WebSocketMoveHandler webSocketMoveHandler, SimpMessagingTemplate messagingTemplate) {
        this.webSocketMoveHandler = webSocketMoveHandler;
    }
    @MessageMapping("/move")
    public void handleMoveEvent(MemberMoveEvent memberMoveEvent) {
        webSocketMoveHandler.handleEvent(memberMoveEvent);
    }

}
