import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function NavigationBar() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">🚗 Voiture Shop</Navbar.Brand>
      <Nav className="ml-auto">
        <Link to="/" className="nav-link">Accueil</Link>
        {token && (
          <>
            <Link to="/list" className="nav-link">Liste Voitures</Link>
            <Link to="/add" className="nav-link">Ajouter Voiture</Link>
            <Button variant="outline-light" onClick={handleLogout}>Déconnexion</Button>
          </>
        )}
      </Nav>
    </Navbar>
  );
}

export default NavigationBar;