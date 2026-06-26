package com.example.eventai;

import me.paulschwarz.spring.dotenv.DotenvPropertySource;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.StandardEnvironment;

@SpringBootApplication
public class EventaiApplication {

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(EventaiApplication.class);
        StandardEnvironment environment = new StandardEnvironment();
        DotenvPropertySource.addTo(environment);
        app.setEnvironment(environment);
        app.run(args);
    }

}