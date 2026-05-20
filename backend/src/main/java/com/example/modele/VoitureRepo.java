package com.example.modele;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;
import org.springframework.data.repository.query.Param;

@CrossOrigin(origins = "http://localhost:3000")
@RepositoryRestResource
public interface VoitureRepo extends CrudRepository<Voiture, Long> {

    List<Voiture> findByMarque(@Param("marque") String marque);

    List<Voiture> findByCouleur(@Param("couleur") String couleur);

    List<Voiture> findByModele(@Param("modele") String modele);
}