package com.example.service;

import com.example.modele.Voiture;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Map;

@Service
public class VoitureAiService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String OLLAMA_URL = "http://localhost:11434/api/generate";

    public String generateResult(String prompt) {
        return callOllama(prompt);
    }

    public String summarizeVoiture(Voiture voiture) {
        String prompt = "Décris cette voiture en 2 phrases: " + voiture.getMarque() + " " + voiture.getModele();
        return callOllama(prompt);
    }

    public String generateQuizForVoiture(Voiture voiture) {
        String prompt = "Crée un quiz de 3 questions sur: " + voiture.getMarque() + " " + voiture.getModele();
        return callOllama(prompt);
    }

    public String generateQuizWithDifficulty(Voiture voiture, String difficulte) {
        String prompt = "Crée un quiz niveau " + difficulte + " sur: " + voiture.getMarque() + " " + voiture.getModele();
        return callOllama(prompt);
    }

    public String askVoitureQuestion(Voiture voiture, String question) {
        String prompt = "Question sur " + voiture.getMarque() + " " + voiture.getModele() + ": " + question;
        return callOllama(prompt);
    }

    public String compareVoitures(Voiture v1, Voiture v2) {
        String prompt = "Compare " + v1.getMarque() + " et " + v2.getMarque();
        return callOllama(prompt);
    }

    public String getBuyingAdvice(String budget, String usage) {
        String prompt = "Conseils d'achat pour budget " + budget + ", usage " + usage;
        return callOllama(prompt);
    }

    private String callOllama(String prompt) {
        try {
            Map<String, Object> request = Map.of(
                    "model", "llama2",
                    "prompt", prompt,
                    "stream", false
            );

            var response = restTemplate.postForObject(OLLAMA_URL, request, Map.class);
            return response != null ? response.get("response").toString() : "Erreur IA";
        } catch (Exception e) {
            return "Ollama non démarré. Lancez: docker-compose up -d";
        }
    }
}