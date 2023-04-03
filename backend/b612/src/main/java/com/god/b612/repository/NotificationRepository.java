package com.god.b612.repository;

import com.god.b612.entity.Member;
import com.god.b612.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {
    List<Notification> findAllByOwnerMember(Member ownerMember);
    int countNotificationsByOwnerMemberAndCheckYnEquals(Member ownerMember, String checkYn);
}
