package com.god.b612.service;

import com.god.b612.dto.NotificationCreateRequestDto;
import com.god.b612.dto.NotificationUpdateRequestDto;
import com.god.b612.dto.PlanetNotificationDto;
import com.god.b612.entity.Member;
import com.god.b612.entity.Notification;
import com.god.b612.repository.MemberRepository;
import com.god.b612.repository.NotificationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final MemberRepository memberRepository;

    public NotificationService(NotificationRepository notificationRepository, MemberRepository memberRepository) {
        this.notificationRepository = notificationRepository;
        this.memberRepository = memberRepository;
    }

    //알림 생성
    @Transactional
    public Notification createNotification(NotificationCreateRequestDto notificationCreateRequestDto) {
        return notificationRepository.save(notificationCreateRequestDto.toEntity());
    }

    //행성 판매자 알림 생성
    @Transactional
    public Notification createPlanetSellerNotification(PlanetNotificationDto planetNotificationDto) {
        //TODO. 판 사람한테 알림 지정
        NotificationCreateRequestDto notificationCreateRequestDto = new NotificationCreateRequestDto();
        //판 사람 가져오기
        Member oldOwner = memberRepository.findMemberByMemberId(planetNotificationDto.getOldOwnerId());
        //행성 이름 가져오기
        StringBuffer content = new StringBuffer();
        content.append(planetNotificationDto.getPlanetNftId()).append("행성이 판매 완료됐습니다.");

        //알림 설정
        notificationCreateRequestDto.setOwnerMember(oldOwner);  //판 사람객체
        notificationCreateRequestDto.setNotificationContent(content.toString());  //알림내용 설정
        return notificationRepository.save(notificationCreateRequestDto.toEntity());
    }

    //행성 구매자 알림 생성
    @Transactional
    public Notification createPlanetBuyerNotification(PlanetNotificationDto planetNotificationDto) {
        //TODO. 산 사람한테 알림 지정
        NotificationCreateRequestDto notificationCreateRequestDto = new NotificationCreateRequestDto();
        //산 사람 가져오기
        Member newOwner = memberRepository.findMemberByMemberId(planetNotificationDto.getNewOwnerId());
        //행성 이름 가져오기
        StringBuffer content = new StringBuffer();
        content.append(planetNotificationDto.getPlanetNftId()).append("행성이 구매 완료됐습니다.");

        //알림 설정
        notificationCreateRequestDto.setOwnerMember(newOwner);  //산 사람객체
        notificationCreateRequestDto.setNotificationContent(content.toString());  //알림내용 설정
        return notificationRepository.save(notificationCreateRequestDto.toEntity());
    }


    //해당 사용자에 해당되는 알림목록 조회
    public List<Notification> getNotificationList(int memberId) {
        Optional<Member> ownerMember = memberRepository.findById(memberId);
        List<Notification> notificationList = null;
        if(ownerMember.isPresent()) {
            notificationList = notificationRepository.findAllByOwnerMember(ownerMember.get());
        }
        return notificationList;
    }

    //알림 삭제
    @Transactional
    public int deleteNotification(int notificationId) {
        Optional<Notification> notification = notificationRepository.findById(notificationId);
        if(notification.isPresent()) {
            notificationRepository.deleteById(notificationId);
            return 1;
        } else {
            return 0;
        }
    }

    //미확인 알림개수 갱신
    @Transactional
    public int refreshNotificationCnt(int memberId) {
        Optional<Member> ownerMember = memberRepository.findById(memberId);
        int unCheckedNotificationCnt = 0;
        if(ownerMember.isPresent()) {
            unCheckedNotificationCnt = notificationRepository.countNotificationsByOwnerMemberAndCheckYnEquals(ownerMember.get(), "N");
        }
        return unCheckedNotificationCnt;
    }

    //알림 확인 처리
    @Transactional
    public int checkNotification(NotificationUpdateRequestDto notificationUpdateRequestDto) {
        Optional<Notification> notification = notificationRepository.findById(notificationUpdateRequestDto.getNotificationId());

        if(notification.isPresent()) {
            if(notification.get().getCheckYn().equals("N")) {
                notificationUpdateRequestDto.setCheckYn("Y");  //확인처리
                notificationRepository.save(notificationUpdateRequestDto.toEntity());
            }
            return 1;
        }
        return 0;
    }
}
