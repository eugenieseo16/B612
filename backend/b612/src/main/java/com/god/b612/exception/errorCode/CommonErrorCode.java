package com.god.b612.exception.errorCode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum CommonErrorCode implements ErrorCode {

  INVALID_PARAMETER(HttpStatus.BAD_REQUEST, "유효하지 않은 변수가 포함되었어여 ( •_ •̥ ˳ ˳ )"),
  RESOURCE_NOT_FOUND(HttpStatus.NOT_FOUND, "리소스가 없대여 (๑◕︵◕๑)"),
  INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "내부에러예여 (⁰᎔⁰ก̀)"),
  INVALID_PARAMETER_MAYBE_DATETIME(HttpStatus.BAD_REQUEST, "유효하지 않은 변수인데 특히 날짜 시간 다시 봐주세여 ｡ﾟ( ﾟஇ‸இﾟ)ﾟ｡"),
  ;

  private final HttpStatus httpStatus;
  private final String message;
}

