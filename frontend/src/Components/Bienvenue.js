import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Gauge,
  BadgeCheck,
  MapPin,
  ArrowRight,
} from "lucide-react";

import "./Bienvenue.css";

function Bienvenue() {
  return (
    <div className="home-page">
      {/* HERO */}
      <section className="hero-section">
        <div className="hero-overlay"></div>

        <Container fluid>
          <Row className="align-items-center hero-row">

            {/* LEFT */}
            <Col lg={5} className="hero-left">
              <span className="mini-title">BIENVENUE AU</span>

              <h1 className="hero-title">
                MAGASIN <br />
                DES <span>VOITURES</span>
              </h1>

              <p className="hero-description">
                Découvrez les voitures les plus luxueuses,
                puissantes et élégantes près de chez vous.
              </p>

              <div className="hero-buttons">
                <Link to="/list">
                  <button className="btn-red">
                    Découvrir nos voitures
                    <ArrowRight size={20} />
                  </button>
                </Link>

                <button className="btn-dark">
                  En savoir plus
                </button>
              </div>
            </Col>

            {/* RIGHT */}
            <Col lg={7} className="hero-right">
              <div className="car-container">

                <div className="glow-circle"></div>

                <img
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1400&auto=format&fit=crop"
                  alt="Luxury Car"
                  className="hero-car"
                />

                <div className="neon-text">
                  VOITURE SHOP
                </div>
              </div>
            </Col>

          </Row>
        </Container>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <Container>

          <Row className="g-4">

            <Col lg={3} md={6}>
              <div className="feature-card">
                <ShieldCheck className="feature-icon" />
                <h3>Qualité Premium</h3>
                <p>
                  Des voitures sélectionnées avec les meilleurs standards.
                </p>
              </div>
            </Col>

            <Col lg={3} md={6}>
              <div className="feature-card">
                <Gauge className="feature-icon" />
                <h3>Performance</h3>
                <p>
                  Des moteurs puissants et une conduite exceptionnelle.
                </p>
              </div>
            </Col>

            <Col lg={3} md={6}>
              <div className="feature-card">
                <BadgeCheck className="feature-icon" />
                <h3>Garantie</h3>
                <p>
                  Tous nos véhicules sont certifiés et garantis.
                </p>
              </div>
            </Col>

            <Col lg={3} md={6}>
              <div className="feature-card">
                <MapPin className="feature-icon" />
                <h3>Proche de vous</h3>
                <p>
                  Disponible près de chez vous avec un service rapide.
                </p>
              </div>
            </Col>

          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Bienvenue;