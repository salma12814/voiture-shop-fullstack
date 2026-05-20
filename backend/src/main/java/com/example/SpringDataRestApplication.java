package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.CommandLineRunner;
import com.example.modele.Voiture;
import com.example.modele.VoitureRepo;
import com.example.modele.Proprietaire;
import com.example.modele.ProprietaireRepo;

@SpringBootApplication
public class SpringDataRestApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringDataRestApplication.class, args);
    }

    @Bean
    CommandLineRunner runner(VoitureRepo voitureRepo, ProprietaireRepo proprietaireRepo) {
        return args -> {
            // Créer propriétaires
            Proprietaire prop1 = new Proprietaire("Ali", "Hassan");
            Proprietaire prop2 = new Proprietaire("Najat", "Bani");

            proprietaireRepo.save(prop1);
            proprietaireRepo.save(prop2);

            // Ajouter voitures
            voitureRepo.save(new Voiture("Toyota", "Corolla", "Grise", "A-1-9090", 2018, 95000, prop1));
            voitureRepo.save(new Voiture("Ford", "Fiesta", "Rouge", "A-2-8090", 2015, 90000, prop1));
            voitureRepo.save(new Voiture("Honda", "CRV", "Bleu", "A-3-7090", 2016, 140000, prop2));
        };
    }
}