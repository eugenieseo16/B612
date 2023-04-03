package com.god.b612.controller;

import com.god.b612.dto.NotificationUpdateRequestDto;
import com.god.b612.dto.PlanetNotificationDto;
import com.god.b612.entity.Notification;
import com.god.b612.model.BaseResponseBody;
import com.god.b612.service.NotificationService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notification")
public class NotificationController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private final Logger logger = LoggerFactory.getLogger(NotificationController.class);

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    //행성 판매&구매 알림 생성
    @ApiOperation(value = "행성 판매&구매 알림 생성", notes = "행성 판매하거나 구매 시 판매자, 구매자에게 판매(구매) 알림이 등록됩니다.")
    @PostMapping("/planet")
    public ResponseEntity<BaseResponseBody> createPlanetNotification(@ApiParam(value = "구매한 행성알림dto(구매자, 판매자, 행성NftId)") @RequestBody PlanetNotificationDto planetNotificationDto) {
        Notification buyerNotification = notificationService.createPlanetBuyerNotification(planetNotificationDto);  //구매자 알림등록
        Notification sellerNotification = notificationService.createPlanetSellerNotification(planetNotificationDto);  //판매자 알림등록

        if(buyerNotification != null && sellerNotification != null) {
            BaseResponseBody baseResponseBody = BaseResponseBody.builder().message(SUCCESS).statusCode(200).build();
            return ResponseEntity.status(200).body(baseResponseBody);
        } else {
            BaseResponseBody baseResponseBody = BaseResponseBody.builder().message(FAIL).statusCode(400).build();
            return ResponseEntity.status(400).body(baseResponseBody);
        }
    }

    //알림(리스트) 조회
    @ApiOperation(value = "알림목록 조회", notes = "현재 사용자의 알림 목록을 조회합니다.")
    @GetMapping("/{memberId}")
    public ResponseEntity<BaseResponseBody> getNotificationList(@ApiParam(value = "현재 사용자 memberId", example = "1") @PathVariable int memberId) {
        try {
            List<Notification> notificationList = notificationService.getNotificationList(memberId);
            BaseResponseBody baseResponseBody = BaseResponseBody.builder().message(SUCCESS).statusCode(200).responseData(notificationList).build();
            return ResponseEntity.status(200).body(baseResponseBody);
        } catch (Exception e) {
            BaseResponseBody baseResponseBody = BaseResponseBody.builder().message(FAIL).statusCode(400).build();
            return ResponseEntity.status(400).body(baseResponseBody);
        }
    }

    //알림 삭제
    @ApiOperation(value = "알림 삭제", notes = "선택한 알림을 삭제합니다.")
    @DeleteMapping("/{notificationId}")
    public ResponseEntity<BaseResponseBody> deleteNotification(@ApiParam(value = "삭제할 알림 notificationId", example = "1") @PathVariable int notificationId) {

        if(notificationService.deleteNotification(notificationId) == 1) {
            BaseResponseBody baseResponseBody = BaseResponseBody.builder().message(SUCCESS).statusCode(200).build();
            return ResponseEntity.status(200).body(baseResponseBody);
        } else {
            BaseResponseBody baseResponseBody = BaseResponseBody.builder().message(FAIL).statusCode(400).build();
            return ResponseEntity.status(400).body(baseResponseBody);
        }
    }


    //미확인 알림개수 갱신
    @ApiOperation(value = "미확인 알림개수 갱신", notes = "현재 사용자의 확인하지 않은 미확인 알림개수를 새로 갱신합니다.")
    @GetMapping("/refresh/{memberId}")
    public ResponseEntity<BaseResponseBody> refreshNotificationCnt(@ApiParam(value = "현재 사용자 memberId", example = "1") @PathVariable int memberId) {
        try {
            int notificationCnt = notificationService.refreshNotificationCnt(memberId);
            BaseResponseBody baseResponseBody = BaseResponseBody.builder().message(SUCCESS).statusCode(200).responseData(notificationCnt).build();
            return ResponseEntity.status(200).body(baseResponseBody);
        } catch (Exception e) {
            BaseResponseBody baseResponseBody = BaseResponseBody.builder().message(FAIL).statusCode(400).build();
            return ResponseEntity.status(400).body(baseResponseBody);
        }
    }

    //알림 확인처리
    @ApiOperation(value = "알림 확인처리", notes = "현재 사용자의 선택한 알림을 확인처리합니다.")
    @PutMapping("/check/{notificationId}")
    public ResponseEntity<BaseResponseBody> checkNotification(@ApiParam(value = "선택한 알림 notificationId", example = "1") @PathVariable int notificationId,
                                                              @RequestBody NotificationUpdateRequestDto notificationUpdateRequestDto) {

        if(notificationService.checkNotification(notificationUpdateRequestDto) == 1) {
            BaseResponseBody baseResponseBody = BaseResponseBody.builder().message(SUCCESS).statusCode(200).build();
            return ResponseEntity.status(200).body(baseResponseBody);
        } else {
            BaseResponseBody baseResponseBody = BaseResponseBody.builder().message(FAIL).statusCode(400).build();
            return ResponseEntity.status(400).body(baseResponseBody);
        }
    }
}
