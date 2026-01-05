package dev.paulzijlmans.cardatabase;

import dev.paulzijlmans.cardatabase.domain.Car;
import dev.paulzijlmans.cardatabase.domain.CarRepository;
import dev.paulzijlmans.cardatabase.domain.Owner;
import dev.paulzijlmans.cardatabase.domain.OwnerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Arrays;

@SpringBootApplication
public class CardatabaseApplication implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(CardatabaseApplication.class);
    private final CarRepository carRepository;
    private final OwnerRepository ownerRepository;

    public CardatabaseApplication(CarRepository carRepository,  OwnerRepository ownerRepository) {
        this.carRepository = carRepository;
        this.ownerRepository = ownerRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(CardatabaseApplication.class, args);
        logger.info("Application started!");
    }

    @Override
    public void run(String... args) throws Exception {
        Owner owner1 = new Owner("John", "Johnson");
        Owner owner2 = new Owner("Mary", "Robinson");
        ownerRepository.saveAll(Arrays.asList(owner1, owner2));

        carRepository.save(new Car("Ford", "Mustang", "Red", "ADF-1121", 2023, 59000, owner1));
        carRepository.save(new Car("Nissan", "Leaf", "White", "SSJ-3002", 2020, 29000, owner2));
        carRepository.save(new Car("Toyota", "Prius", "Silver", "KKO-0212", 2022, 39000, owner2));

        carRepository.findAll().forEach((car) -> logger.info("brand: {}, model: {}", car.getBrand(), car.getModel()));
    }
}
