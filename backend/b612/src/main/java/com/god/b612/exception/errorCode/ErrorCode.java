package com.god.b612.exception.errorCode;

import org.springframework.http.HttpStatus;

public interface ErrorCode {

  String name();
  HttpStatus getHttpStatus();
  String getMessage();

}
