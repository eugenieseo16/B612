package com.god.b612;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class B612Application {

	public static void main(String[] args) {
		SpringApplication.run(B612Application.class, args);
	}

}
