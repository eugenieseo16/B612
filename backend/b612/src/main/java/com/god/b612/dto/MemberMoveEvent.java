package com.god.b612.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberMoveEvent {
    private String type; // 이벤트 타입
    private String sessionId; // 이동한 세션 아이디
    private int memberCharacter; // 이동한 사용자 캐릭터
    private int x;  //이동한 위치 x좌표
    private int z;  //이동한 위치 z좌표
}
