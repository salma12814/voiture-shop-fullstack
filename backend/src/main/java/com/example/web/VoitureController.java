package com.example.web;

import com.example.modele.Voiture;
import com.example.modele.VoitureRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class VoitureController {

    @Autowired
    private VoitureRepo voitureRepo;

    @GetMapping("/voitures")
    public Iterable<Voiture> getVoitures(){
        return voitureRepo.findAll();
    }

    @PostMapping("/voitures")
    public Voiture addVoiture(@RequestBody Voiture voiture){
        return voitureRepo.save(voiture);
    }

    @PutMapping("/voitures/{id}")
    public Voiture updateVoiture(@PathVariable Long id, @RequestBody Voiture voiture){
        voiture.setId(id);
        return voitureRepo.save(voiture);
    }

    @DeleteMapping("/voitures/{id}")
    public void deleteVoiture(@PathVariable Long id){
        voitureRepo.deleteById(id);
    }
    @GetMapping("/voitures/{id}")
    public Voiture getVoitureById(@PathVariable Long id){
        return voitureRepo.findById(id).orElse(null);
    }
}