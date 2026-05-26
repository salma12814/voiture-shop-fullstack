import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faSave } from '@fortawesome/free-solid-svg-icons';
import AIAssistant from './AIAssistant';

function Voiture() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const initialState = {
    marque: '',
    modele: '',
    couleur: '',
    immatricule: '',
    annee: '',
    prix: ''
  };
  
  const [voiture, setVoiture] = useState(initialState);

  useEffect(() => {
    if(id) {
      axios.get(`http://localhost:8081/voitures/${id}`)
        .then(response => {
          setVoiture(response.data);
        })
        .catch(error => {
          console.error('Erreur:', error);
        });
    }
  }, [id]);

  const voitureChange = event => {
    setVoiture({
      ...voiture,
      [event.target.name]: event.target.value
    });
  };

  const resetVoiture = () => {
    setVoiture(initialState);
  };

  const submitVoiture = event => {
    event.preventDefault();
    const voitureData = {
      marque: voiture.marque,
      modele: voiture.modele,
      couleur: voiture.couleur,
      immatricule: voiture.immatricule,
      annee: voiture.annee,
      prix: voiture.prix
    };
    
    if(id) {
      axios.put(`http://localhost:8081/voitures/${id}`, voitureData)
        .then(response => {
          if(response.data != null){
            setVoiture(initialState);
            alert("Voiture modifiée avec succès");
            navigate('/list');
          }
        })
        .catch(error => console.error('Erreur:', error));
    } else {
      axios.post("http://localhost:8081/voitures", voitureData)
        .then(response => {
          if(response.data != null){
            setVoiture(initialState);
            alert("Voiture enregistrée avec succès");
            navigate('/list');
          }
        })
        .catch(error => console.error('Erreur:', error));
    }
  };

  const titre = id ? "Modifier Voiture" : "Ajouter Voiture";
    
  return (
    <>
      <Card className="border border-dark bg-dark text-white">
        <Card.Header><FontAwesomeIcon icon={faPlusSquare} /> {titre}</Card.Header>
        <Form onSubmit={submitVoiture} onReset={resetVoiture} id="VoitureFormId">
          <Card.Body>
            <Row>
              <Form.Group as={Col} controlId="formGridMarque">
                <Form.Label>Marque</Form.Label>
                <Form.Control 
                  required 
                  name="marque" 
                  type="text" 
                  value={voiture.marque} 
                  onChange={voitureChange}
                  className="bg-dark text-white" 
                  placeholder="Entrez Marque Voiture" 
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridModele">
                <Form.Label>Modele</Form.Label>
                <Form.Control 
                  required 
                  name="modele" 
                  type="text" 
                  value={voiture.modele} 
                  onChange={voitureChange}
                  className="bg-dark text-white" 
                  placeholder="Entrez Modele Voiture" 
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridCouleur">
                <Form.Label>Couleur</Form.Label>
                <Form.Control 
                  required 
                  name="couleur" 
                  type="text" 
                  value={voiture.couleur} 
                  onChange={voitureChange}
                  className="bg-dark text-white" 
                  placeholder="Entrez Couleur" 
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} controlId="formGridImmatricule">
                <Form.Label>Immatricule</Form.Label>
                <Form.Control 
                  required 
                  name="immatricule" 
                  type="text" 
                  value={voiture.immatricule} 
                  onChange={voitureChange}
                  className="bg-dark text-white" 
                  placeholder="Entrez Immatricule" 
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridAnnee">
                <Form.Label>Année</Form.Label>
                <Form.Control 
                  required 
                  name="annee" 
                  type="text" 
                  value={voiture.annee} 
                  onChange={voitureChange}
                  className="bg-dark text-white" 
                  placeholder="Entrez Année" 
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPrix">
                <Form.Label>Prix</Form.Label>
                <Form.Control 
                  required 
                  name="prix" 
                  type="text" 
                  value={voiture.prix} 
                  onChange={voitureChange}
                  className="bg-dark text-white" 
                  placeholder="Entrez Prix" 
                />
              </Form.Group>
            </Row>
          </Card.Body>

          <Card.Footer style={{textAlign: "right"}}>
            <Button size="sm" variant="success" type="submit">
              <FontAwesomeIcon icon={faSave} /> Submit
            </Button>
            <Button size="sm" variant="info" type="reset" style={{marginLeft: "5px"}}>
              Reset
            </Button>
          </Card.Footer>
        </Form>
      </Card>

      {/* IA Assistant - apparaît seulement en mode édition */}
      {id && voiture.marque && <AIAssistant voiture={voiture} />}
    </>
  );
}

export default Voiture;