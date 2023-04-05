package com.god.b612.config;

import com.god.b612.handler.WebSocketChatHandler;
import com.god.b612.handler.WebSocketMoveHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    //    private final WebSocketHandler webSocketHandler;
    private final WebSocketChatHandler webSocketChatHandler;
    private final WebSocketMoveHandler webSocketMoveHandler;

    //    public WebSocketConfig(WebSocketHandler webSocketHandler) {
//        this.webSocketHandler = webSocketHandler;
//    }
    public WebSocketConfig(WebSocketChatHandler webSocketChatHandler, WebSocketMoveHandler webSocketMoveHandler) {
        this.webSocketChatHandler = webSocketChatHandler;
        this.webSocketMoveHandler = webSocketMoveHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(webSocketChatHandler, "/ws/chat").setAllowedOrigins("*");
        registry.addHandler(webSocketMoveHandler, "/ws/move").setAllowedOrigins("*");
    }


    //빈 직접 등록
    @Bean
    public SimpMessagingTemplate messagingTemplate() {
        return new SimpMessagingTemplate(new MessageChannel() {
            @Override
            public boolean send(Message<?> message, long l) {
                return false;
            }

            @Override
            public boolean send(Message<?> message) {
                return false;
            }
        });
    }
}
