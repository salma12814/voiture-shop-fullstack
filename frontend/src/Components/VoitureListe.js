import React from 'react';
import { Card, Table, Button, ButtonGroup } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faList } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import MyToast from './myToast';

class VoitureListe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      voitures: [],
      show: false,
      message: ""
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8081/voitures")
      .then(response => response.data)
      .then((data) => {
        this.setState({ voitures: data });
      });
  }

  deleteVoiture = (voitureId) => {
    axios.delete("http://localhost:8081/voitures/" + voitureId)
      .then(response => {
        if(response.data != null){
          this.setState({
            voitures: this.state.voitures.filter(voiture => voiture.id !== voitureId),
            show: true,
            message: "Voiture supprimée avec succès."
          });
          setTimeout(() => this.setState({ show: false }), 3000);
        }
      })
      .catch(error => {
        this.setState({ show: false });
      });
  }

  render() {
    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast children={{ show: this.state.show, message: this.state.message, type: "danger" }} />
        </div>
        
        <Card className="border border-dark bg-dark text-white">
          <Card.Header><FontAwesomeIcon icon={faList} /> Liste Voitures</Card.Header>
          <Card.Body>
            <Table bordered hover striped variant="dark">
              <thead>
                <tr>
                  <th>Marque</th>
                  <th>Modele</th>
                  <th>Couleur</th>
                  <th>Immatricule</th>
                  <th>Annee</th>
                  <th>Prix</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.voitures.length === 0 ?
                  <tr align="center">
                    <td colSpan="7">Aucune Voiture n'est disponible</td>
                  </tr> :
                  this.state.voitures.map((voiture) => (
                    <tr key={voiture.id}>
                      <td>{voiture.marque}</td>
                      <td>{voiture.modele}</td>
                      <td>{voiture.couleur}</td>
                      <td>{voiture.immatricule}</td>
                      <td>{voiture.annee}</td>
                      <td>{voiture.prix}</td>
                      <td>
                        <ButtonGroup>
                          <Link to={"/edit/" + voiture.id} className="btn btn-sm btn-outline-primary">
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>
                          <Button size="sm" variant="outline-danger" onClick={this.deleteVoiture.bind(this, voiture.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default VoitureListe;