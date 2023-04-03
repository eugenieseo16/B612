package com.god.b612.model;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("BaseResponseBody")
public class BaseResponseBody {
    @ApiModelProperty(name = "응답 메시지", example = "정상")
    String message=null;
    @ApiModelProperty(name = "응답 코드", example = "200")
    Integer statusCode=null;

    @ApiModelProperty(name= "응답 데이터", example = "dto들이 들어감")
    Object responseData=null;


    @Builder
    public BaseResponseBody(Integer statusCode, String message, Object responseData){
        this.statusCode = statusCode;
        this.message = message;
        this.responseData=responseData;
    }

    public static BaseResponseBody of(Integer statusCode, String message, Object responseData) {
        BaseResponseBody body =
                BaseResponseBody.builder()
                        .message(message)
                        .statusCode(statusCode)
                        .responseData(responseData)
                        .build();

        return body;
    }
}
