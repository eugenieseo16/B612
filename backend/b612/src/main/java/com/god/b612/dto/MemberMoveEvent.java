package com.god.b612.dto;

import com.god.b612.entity.Member;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberMoveEvent {
    private String type; // 이벤트 타입
    private Member member; // 이동한 사용자
    private int x; // 이동한 위치(x 좌표)
    private int y; // 이동한 위치(y 좌표)
    private int z;
}
