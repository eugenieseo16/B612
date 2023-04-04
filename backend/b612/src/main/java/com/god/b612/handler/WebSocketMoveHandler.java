package com.god.b612.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.god.b612.dto.MemberMoveEvent;
import com.god.b612.entity.Member;
import com.god.b612.repository.MemberRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class WebSocketMoveHandler implements WebSocketHandler {

    private final SimpMessagingTemplate messagingTemplate;
    private final MemberRepository memberRepository;
    public WebSocketMoveHandler(SimpMessagingTemplate messagingTemplate, MemberRepository memberRepository) {
        this.messagingTemplate = messagingTemplate;
        this.memberRepository = memberRepository;
    }

    private final List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {

    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        // 메시지 수신 시 처리
        MemberMoveEvent event = new ObjectMapper().readValue((String) message.getPayload(), MemberMoveEvent.class);
        handleEvent(event);
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {

    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {

    }

    public void handleEvent(MemberMoveEvent memberMoveEvent) {
        if (memberMoveEvent.getType().equals("move")) {
            Member member = memberMoveEvent.getMember();
            // 유저 위치 업데이트
            member = new Member(member.getMemberId(), member.getMemberNickname(), member.getMemberAddress(), member.getMemberImage(), member.getMemberTierId(),
                    member.getMemberHighestScore(), member.getMemberCurrentScore(), member.getMemberLiked(), memberMoveEvent.getX(), memberMoveEvent.getY(), memberMoveEvent.getZ());

//            memberRepository.save(member);  //일단 주석처리
            // 다른 클라이언트에게 이벤트 전송
            broadcastMemberMoveEvent(member);
        }
    }

    public void broadcastMemberMoveEvent(Member member) {
        MemberMoveEvent event = new MemberMoveEvent();
        event.setMember(member);
        event.setType("move");
        messagingTemplate.convertAndSend("/topic/move", event);
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }


}
