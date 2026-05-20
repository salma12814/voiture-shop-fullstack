package com.example.modele;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data
@NoArgsConstructor
public class Voiture {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String marque;
    private String modele;
    private String couleur;
    private String immatricule;
    private Integer annee;
    private Integer prix;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "proprietaire_id")
    @JsonIgnore
    private Proprietaire proprietaire;

    // Constructeur avec tous les paramètres (6 args)
    public Voiture(String marque, String modele, String couleur, String immatricule, Integer annee, Integer prix, Proprietaire proprietaire) {
        this.marque = marque;
        this.modele = modele;
        this.couleur = couleur;
        this.immatricule = immatricule;
        this.annee = annee;
        this.prix = prix;
        this.proprietaire = proprietaire;
    }
}