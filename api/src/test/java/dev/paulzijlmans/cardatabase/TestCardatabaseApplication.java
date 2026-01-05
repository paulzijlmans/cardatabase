package dev.paulzijlmans.cardatabase;

import org.springframework.boot.SpringApplication;

public class TestCardatabaseApplication {

	public static void main(String[] args) {
		SpringApplication.from(CardatabaseApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
