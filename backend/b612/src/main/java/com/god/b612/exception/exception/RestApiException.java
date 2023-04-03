package com.god.b612.exception.exception;

import com.god.b612.exception.errorCode.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class RestApiException extends RuntimeException{

  private final ErrorCode errorCode;

}
