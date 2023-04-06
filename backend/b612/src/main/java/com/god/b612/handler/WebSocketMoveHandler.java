package com.god.b612.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.god.b612.controller.MemberController;
import com.god.b612.dto.MemberMoveEvent;
import com.god.b612.entity.Member;
import com.god.b612.repository.MemberRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class WebSocketMoveHandler extends TextWebSocketHandler {
    private final List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();  //List를 전달할때 원본이 아닌 복사본을 만들어서 전달, 순회할 때 락이 필요 없어서 속도면에서 매우 빠름

    private final Logger logger = LoggerFactory.getLogger(WebSocketMoveHandler.class);

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
//        System.out.println("새로운 포지션: " + message.getPayload());
        MemberMoveEvent moveEvent = objectMapper.readValue(message.getPayload(), MemberMoveEvent.class);
        broadcast(moveEvent);  //세션에 연결돼있는 다른 사용자들에게 전달
    }

    //새로운 WebSocket 연결
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        logger.info("새로운 WebSocket 연결: " + session.getId());
//        for(WebSocketSession x : sessions) {
//            System.out.println("세션 아이디" + x.getId());
//        }
        TextMessage textMessage = new TextMessage(session.getId());
        session.sendMessage(textMessage);
    }

    //WebSocket 연결 종료
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
        sessions.remove(session);
        logger.info("WebSocket 연결 종료" + session.getId());
    }

    private void broadcast(MemberMoveEvent memberMoveEvent) throws IOException {
        // 모든 클라이언트들에게 UserPosition 객체를 JSON 형식으로 보냅니다.
        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(memberMoveEvent);
        TextMessage message = new TextMessage(json);
        for (WebSocketSession session : sessions) {
            if (session.isOpen()) {
                session.sendMessage(message);
            }
        }
    }
}
