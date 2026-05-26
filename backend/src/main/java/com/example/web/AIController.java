package com.example.web;

import com.example.modele.Voiture;
import com.example.modele.VoitureRepo;
import com.example.service.VoitureAiService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class AIController {

    @Autowired
    private VoitureAiService voitureAiService;

    @Autowired
    private VoitureRepo voitureRepository;

    @GetMapping("/api/ai/generate")
    public String generate(@RequestParam String promptMessage) {
        return voitureAiService.generateResult(promptMessage);
    }

    @GetMapping("/api/ai/voitures/{id}/summary")
    public String summarizeVoiture(@PathVariable Long id) {

        Voiture voiture = voitureRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Voiture non trouvée avec l'id : " + id));

        return voitureAiService.summarizeVoiture(voiture);
    }

    @GetMapping("/api/ai/voitures/{id}/quiz")
    public String quizVoiture(@PathVariable Long id) {

        Voiture voiture = voitureRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Voiture non trouvée avec l'id : " + id));

        return voitureAiService.generateQuizForVoiture(voiture);
    }

    @GetMapping("/api/ai/voitures/{id}/quiz-difficulte")
    public String quizVoitureWithDifficulty(
            @PathVariable Long id,
            @RequestParam(defaultValue = "Facile") String difficulte) {

        Voiture voiture = voitureRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Voiture non trouvée avec l'id : " + id));

        return voitureAiService.generateQuizWithDifficulty(voiture, difficulte);
    }

    @PostMapping("/api/ai/voitures/{id}/ask")
    public String askVoitureQuestion(
            @PathVariable Long id,
            @RequestBody String question) {

        Voiture voiture = voitureRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Voiture non trouvée avec l'id : " + id));

        return voitureAiService.askVoitureQuestion(voiture, question);
    }

    @GetMapping("/api/ai/compare/{id1}/{id2}")
    public String compareVoitures(
            @PathVariable Long id1,
            @PathVariable Long id2) {

        Voiture v1 = voitureRepository.findById(id1)
                .orElseThrow(() ->
                        new RuntimeException("Voiture non trouvée avec l'id : " + id1));

        Voiture v2 = voitureRepository.findById(id2)
                .orElseThrow(() ->
                        new RuntimeException("Voiture non trouvée avec l'id : " + id2));

        return voitureAiService.compareVoitures(v1, v2);
    }

    @GetMapping("/api/ai/advice")
    public String getBuyingAdvice(
            @RequestParam String budget,
            @RequestParam(defaultValue = "familial") String usage) {

        return voitureAiService.getBuyingAdvice(budget, usage);
    }
}