package com.god.b612.handler;

import com.god.b612.controller.MemberController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class WebSocketChatHandler extends TextWebSocketHandler {
    private final List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();  //List를 전달할때 원본이 아닌 복사본을 만들어서 전달, 순회할 때 락이 필요 없어서 속도면에서 매우 빠름

    private final Logger logger = LoggerFactory.getLogger(WebSocketChatHandler.class);

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
//        String payLoad = message.getPayload();
//        TextMessage textMessage = new TextMessage("echo: " + payLoad);
//        System.out.println("새로운 메시지: " + message.getPayload() + "세션id" + session.getId());
        for(WebSocketSession s : sessions) {
            if(!s.equals(session)) {  //다른 사용자들에게 채팅 전송
                s.sendMessage(message);
            }
        }
    }

    //새로운 WebSocket 연결
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        logger.info("새로운 WebSocket 연결: " + session.getId());
    }

    //WebSocket 연결 종료
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
        sessions.remove(session);
        logger.info("WebSocket 연결 종료" + session.getId());
    }

}
