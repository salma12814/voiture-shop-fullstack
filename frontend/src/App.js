import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';                       // ← ajout
import NavigationBar from './Components/NavigationBar';
import Bienvenue from './Components/Bienvenue';
import VoitureListe from './Components/VoitureListe';
import Voiture from './Components/Voiture';
import Footer from './Components/Footer';
import Login from './Components/Login';           // ← à créer

// ═══════════════════════════════════════════════════════════════
// INTERCEPTEUR POUR AJOUTER LE TOKEN À TOUTES LES REQUÊTES
// ═══════════════════════════════════════════════════════════════
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur pour déconnecter l’utilisateur si le token est invalide (401)
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
// ═══════════════════════════════════════════════════════════════

// Composant pour routes protégées
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const marginTop = { marginTop: "20px" };
  
  return (
    <Router>
      <NavigationBar />
      <Container className="mt-5">
        <Row>
          <Col lg={12} style={marginTop}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Bienvenue />} />
              <Route path="/list" element={<PrivateRoute><VoitureListe /></PrivateRoute>} />
              <Route path="/add" element={<PrivateRoute><Voiture /></PrivateRoute>} />
              <Route path="/edit/:id" element={<PrivateRoute><Voiture /></PrivateRoute>} />
            </Routes>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;