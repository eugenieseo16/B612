package com.god.b612.exception.handler;


import com.god.b612.exception.errorCode.CommonErrorCode;
import com.god.b612.exception.errorCode.ErrorCode;
import com.god.b612.exception.exception.RestApiException;
import com.god.b612.exception.response.ErrorResponse;
import com.god.b612.exception.response.ErrorResponse.ValidationError;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler { // RuntimeException 처리
  @ExceptionHandler(RestApiException.class)
  public ResponseEntity<Object> handleCustomException(RestApiException e) {
    return handleExceptionInternal(e.getErrorCode());
  }

  @Override
  public ResponseEntity<Object> handleMethodArgumentNotValid(
      MethodArgumentNotValidException e,
      HttpHeaders headers,
      HttpStatus status,
      WebRequest request) {
    log.warn("handleIllegalArgument", e);
    ErrorCode errorCode = CommonErrorCode.INVALID_PARAMETER;
    return handleExceptionInternal(e, errorCode);
  }

  @Override
  protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex,
      HttpHeaders headers, HttpStatus status, WebRequest request) {
    ErrorCode errorCode = CommonErrorCode.INVALID_PARAMETER_MAYBE_DATETIME;
    return handleExceptionInternal(errorCode);
  }

  // IllegalArgumentException 에러 처리
  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<Object> handleIllegalArgument(IllegalArgumentException e) {
    log.warn("handleIllegalArgument", e);
    return handleExceptionInternal(CommonErrorCode.INVALID_PARAMETER, e.getMessage());
  }

  // @Valid 어노테이션으로 넘어오는 에러 처리
  @Override
  public ResponseEntity<Object> handleBindException(
      BindException e,
      HttpHeaders headers,
      HttpStatus status,
      WebRequest request) {
    log.warn("handleIllegalArgument", e);
    return handleExceptionInternal(e, CommonErrorCode.INVALID_PARAMETER);
  }

  @Override
  protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(
      HttpRequestMethodNotSupportedException ex, HttpHeaders headers, HttpStatus status,
      WebRequest request) {
    return super.handleHttpRequestMethodNotSupported(ex, headers, status, request);
  }

  @Override
  protected ResponseEntity<Object> handleNoHandlerFoundException(NoHandlerFoundException ex,
      HttpHeaders headers, HttpStatus status, WebRequest request) {

//    return super.handleNoHandlerFoundException(ex, headers, status, request);
    return handleExceptionInternal(CommonErrorCode.RESOURCE_NOT_FOUND);
  }

  // 대부분의 에러 처리
  @ExceptionHandler({Exception.class})
  public ResponseEntity<Object> handleAllException(Exception ex) {
    log.warn("handleAllException", ex);
    return handleExceptionInternal(CommonErrorCode.INTERNAL_SERVER_ERROR);
  }

  // RuntimeException과 대부분의 에러 처리 메세지를 보내기 위한 메소드
  private ResponseEntity<Object> handleExceptionInternal(ErrorCode errorCode) {
    return ResponseEntity.status(errorCode.getHttpStatus())
        .body(makeErrorResponse(errorCode));
  }

  // 코드 가독성을 위해 에러 처리 메세지를 만드는 메소드 분리
  private ErrorResponse makeErrorResponse(ErrorCode errorCode) {
    return ErrorResponse.builder()
        .code(errorCode.name())
        .message(errorCode.getMessage())
        .build();
  }

  private ResponseEntity<Object> handleExceptionInternal(ErrorCode errorCode, String message) {
    return ResponseEntity.status(errorCode.getHttpStatus())
        .body(makeErrorResponse(errorCode, message));
  }

  // 코드 가독성을 위해 에러 처리 메세지를 만드는 메소드 분리
  private ErrorResponse makeErrorResponse(ErrorCode errorCode, String message) {
    return ErrorResponse.builder()
        .code(errorCode.name())
        .message(message)
        .build();
  }

  // @Valid 어노테이션으로 넘어오는 에러 처리 메세지를 보내기 위한 메소드
  private ResponseEntity<Object> handleExceptionInternal(BindException e, ErrorCode errorCode) {
    return ResponseEntity.status(errorCode.getHttpStatus())
        .body(makeErrorResponse(e, errorCode));
  }

  // 코드 가독성을 위해 에러 처리 메세지를 만드는 메소드 분리
  private ErrorResponse makeErrorResponse(BindException e, ErrorCode errorCode) {
    List<ValidationError> validationErrorList = e.getBindingResult()
        .getFieldErrors()
        .stream()
        .map(ValidationError::of)
        .collect(Collectors.toList());

    return ErrorResponse.builder()
        .code(errorCode.name())
        .message(errorCode.getMessage())
        .errors(validationErrorList)
        .build();
  }
}
