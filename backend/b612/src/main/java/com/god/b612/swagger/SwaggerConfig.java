package com.god.b612.swagger;

import com.google.common.base.Predicate;
import com.google.common.base.Predicates;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;


@Configuration
@EnableSwagger2
public class SwaggerConfig {

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("B612 Spring Boot REST API")
                .version("1.0.0")
                .description("신과함께 머무르다.")
                .build();
    }

    public Docket getDocket(String groupName, Predicate<String> predicate) {
//		List<ResponseMessage> responseMessages = new ArrayList<ResponseMessage>();
//		responseMessages.add(new ResponseMessageBuilder().code(200).message("OK !!!").build());
//		responseMessages.add(new ResponseMessageBuilder().code(500).message("서버 문제 발생 !!!").responseModel(new ModelRef("Error")).build());
//		responseMessages.add(new ResponseMessageBuilder().code(404).message("페이지를 찾을 수 없습니다 !!!").build());
        return new Docket(DocumentationType.SWAGGER_2).groupName(groupName).apiInfo(apiInfo()).select()
                .apis(RequestHandlerSelectors.basePackage("com.god.b612")).paths(predicate)
                .apis(RequestHandlerSelectors.any()).build();
//				.useDefaultResponseMessages(false)
//				.globalResponseMessage(RequestMethod.GET,responseMessages);
    }

    @Bean
    public Docket memberApi() {
        return getDocket("회원", Predicates.or(PathSelectors.regex("/member.*")));
    }

    @Bean
    public Docket flowerApi() {
        return getDocket("꽃", Predicates.or(PathSelectors.regex("/flower.*")));
    }

    @Bean
    public Docket baobabApi() {
        return getDocket("바오밥 게시판", Predicates.or(PathSelectors.regex("/baobab.*")));
    }

    @Bean
    public Docket boardApi() {
        return getDocket("방명록", Predicates.or(PathSelectors.regex("/board.*")));
    }

    @Bean
    public Docket planetApi() {
        return getDocket("행성", Predicates.or(PathSelectors.regex("/planet.*")));
    }

    @Bean
    public Docket friendApi() {
        return getDocket("친구", Predicates.or(PathSelectors.regex("/friend.*")));
    }




}

