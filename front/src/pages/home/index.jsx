import React, { useState } from "react";
import { Card, Col, Container, Row, Button, Form } from "react-bootstrap";
import money from "../../images/money.svg";
import lifebuoy from "../../images/lifebuoy.svg";
import house from "../../images/house.svg";
import sales from "../../images/sales.svg";
import locataireMaison from "../../images/locataire-maison.svg";
import key from "../../images/key.svg";
import partyPopper from "../../images/party-popper.svg";
import airConditioner from "../../images/air-conditioner.svg";
import ScrollAnimation from "react-animate-on-scroll";
import axios from "axios";
import validator from "validator";
import { FaArrowLeft } from "react-icons/fa";
import Pdf from "./ml.pdf";

import "./style.css";
function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [step, setStep] = useState(1);
  const [state, setState] = useState({
    type: "",
    mode: "",
    firstName: "",
    lastName: "",
    email: "",
    codePostal: "",
    phone: "",
  });
  const handleInputChange = (event) => {
    event.preventDefault();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (
      !state.firstName ||
      !state.lastName ||
      !state.email ||
      !state.codePostal ||
      !state.phone ||
      !validator.isEmail(state.email)
    ) {
      return false;
    } else {
      setStep(step + 1);
      axios.post("http://localhost:1337", state).then((response) => {
        console.log(response);
        setState("");
      });
    }
  };

  const handleTypeChange = (type) => {
    setState({ ...state, type: type });
    setStep(step + 1);
  };

  const handleModeChange = (mode) => {
    setState({ ...state, mode: mode });
    setStep(step + 1);
  };

  const scrollToTestDiv = () => {
    const divElement = document.getElementById("form");
    divElement.scrollIntoView({ behavior: "smooth" });
  };

  const stepBack = () => {
    console.log("==onClick==");
    setStep(step - 1);
  };

  return (
    <>
      <div className="main">
        <div id="form" className="header">
          <Container>
            <Row>
              <Col lg={7} md={12} className="slder-left">
                <div className="text-box">
                  <span className="subtitle">PROPRIÉTAIRE DE MAISON ?</span>
                  <h1>Pompes à chaleur</h1>
                  <h3>Aides et subventions 2021</h3>
                  <p>Réduisez vos factures de chaufface</p>
                  <Button className="header-button">
                    Tester mon éligibilité en 10 secondes
                  </Button>
                </div>
              </Col>
              <Col lg={5} md={12} className="slder-right">
                <Card className="form-card">
                  <div className="header-card">
                    <h6 className="header-card-title">
                      TESTER MON ÉLIGIBILITÉ EN 10 SECONDES
                    </h6>
                  </div>
                  <Card.Body className="form-card-body">
                    {[2, 3].indexOf(+step) !== -1 && (
                      <Row>
                        <Col md={12} className="form-text-description ">
                          <Button
                            className="btn-sm"
                            onClick={() => stepBack(1)}
                          >
                            <FaArrowLeft />
                            Retour
                          </Button>
                        </Col>
                      </Row>
                    )}
                    <Row>
                      <Col md={12} className="form-text-description mt-1 mb-2">
                        Ce formulaire ne concerne que les foyers propriétaires
                        de maisons individuelles chauffés au gaz ou au fioul
                      </Col>
                      <Col md={12} className="mb-4">
                        <div className="stepper">
                          <div
                            className={`step ${step >= 1 ? "active" : ""}`}
                          ></div>
                          <div
                            className={`step ${step >= 2 ? "active" : ""}`}
                          ></div>
                          <div
                            className={`step ${step >= 3 ? "active" : ""}`}
                          ></div>
                          <div
                            className={`step ${step >= 4 ? "active" : ""}`}
                          ></div>
                        </div>
                      </Col>
                    </Row>
                    <Form onSubmit={handleSubmit}>
                      {step === 1 && (
                        <Row className="step-1">
                          <Col md={12}>
                            <div className="label-form">Vous êtes ?</div>
                          </Col>
                          <Col md={12}>
                            <div
                              className="choice"
                              onClick={() => handleTypeChange(1)}
                            >
                              <img src={locataireMaison} alt="img" />
                              <p className="choice-text">
                                Propriétaire d'une maison
                              </p>
                              <Form.Check
                                name="type"
                                type="radio"
                                value="1"
                                checked={state.type === "1"}
                              />
                            </div>
                          </Col>
                          <Col md={12}>
                            <div
                              className="choice"
                              onClick={() => handleTypeChange(2)}
                            >
                              <img src={key} alt="img" />
                              <p className="choice-text">
                                Locataire d'une maison
                              </p>
                              <Form.Check
                                name="type"
                                type="radio"
                                value="2"
                                checked={state.type === "2"}
                              />
                            </div>
                          </Col>
                        </Row>
                      )}
                      {step === 2 && (
                        <Row className="step-2">
                          <div className="label-form">
                            Quel est votre mode de chauffage actuel?
                          </div>

                          <div className="choice-box">
                            <Col md={12}>
                              <div
                                className="choice"
                                onClick={() => handleModeChange("Fioul")}
                              >
                                <p>Fioul</p>
                                <Form.Check
                                  name="mode"
                                  type="radio"
                                  value="Fioul"
                                  onChange={handleInputChange}
                                  checked={state.mode === "Fioul"}
                                />
                              </div>
                            </Col>
                            <Col md={12}>
                              <div
                                className="choice"
                                onClick={() => handleModeChange("Gaz")}
                              >
                                <p>Gaz</p>
                                <Form.Check
                                  type="radio"
                                  name="mode"
                                  value="Gaz"
                                  checked={state.mode === "Gaz"}
                                />
                              </div>
                            </Col>
                            <Col md={12}>
                              <div
                                className="choice"
                                onClick={() => handleModeChange("Bois")}
                              >
                                <p>Bois</p>
                                <Form.Check
                                  type="radio"
                                  name="mode"
                                  value="Bois"
                                  checked={state.mode === "Bois"}
                                />
                              </div>
                            </Col>
                            <Col md={12}>
                              <div
                                className="choice"
                                onClick={() => handleModeChange("Electricité")}
                              >
                                <p>Electricité</p>
                                <Form.Check
                                  type="radio"
                                  name="mode"
                                  value="Electricité"
                                  checked={state.mode === "Electricité"}
                                />
                              </div>
                            </Col>
                            <Col md={12}>
                              <div
                                className="choice"
                                onClick={() => handleModeChange("Autre")}
                              >
                                <p>Autre</p>
                                <Form.Check
                                  type="radio"
                                  name="mode"
                                  value="Autre"
                                  checked={state.mode === "Autre"}
                                />
                              </div>
                            </Col>
                          </div>
                        </Row>
                      )}
                      {step === 3 && (
                        <>
                          <Row className="mb-3">
                            <div className="label-form">Vos coordonnées </div>
                            <div>
                              Dernière étape afin de vérifier vos aides à la
                              pompe à chaleur
                            </div>
                          </Row>
                          <Row className="mb-3">
                            <Col md={6} className="form-box">
                              <Form.Control
                                className="p-3 form-input"
                                type="text"
                                placeholder="Nom"
                                name="firstName"
                                onChange={handleInputChange}
                                isInvalid={isSubmitted && !state.firstName}
                              />
                              {isSubmitted && !state.firstName && (
                                <Form.Control.Feedback type="invalid">
                                  Ce champ est obligatoire
                                </Form.Control.Feedback>
                              )}
                            </Col>
                            <Col md={6}>
                              <Form.Control
                                className="p-3 form-input"
                                type="text"
                                placeholder="Prénom"
                                name="lastName"
                                onChange={handleInputChange}
                                isInvalid={isSubmitted && !state.lastName}
                              />
                              {isSubmitted && !state.lastName && (
                                <Form.Control.Feedback type="invalid">
                                  Ce champ est obligatoire
                                </Form.Control.Feedback>
                              )}
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col md={12}>
                              <Form.Control
                                type="email"
                                className="p-3 form-input"
                                placeholder="Adresse email"
                                name="email"
                                onChange={handleInputChange}
                                isInvalid={
                                  isSubmitted &&
                                  (!state.email ||
                                    !validator.isEmail(state.email))
                                }
                              />
                            </Col>
                            {isSubmitted &&
                            state.email &&
                            !validator.isEmail(state.email) ? (
                              <div className="text-danger">E-mail invalide</div>
                            ) : null}
                            {isSubmitted && !state.email && (
                              <Form.Control.Feedback type="invalid">
                                Ce champ est obligatoire
                              </Form.Control.Feedback>
                            )}
                          </Row>
                          <Row className="mb-3">
                            <Col md={12}>
                              <Form.Control
                                type="text"
                                className="p-3 form-input"
                                placeholder="Code postal"
                                name="codePostal"
                                onChange={handleInputChange}
                                isInvalid={isSubmitted && !state.codePostal}
                              />
                              {isSubmitted && !state.codePostal && (
                                <Form.Control.Feedback type="invalid">
                                  Ce champ est obligatoire
                                </Form.Control.Feedback>
                              )}
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col md={12}>
                              <Form.Control
                                type="Number"
                                className="p-3 form-input"
                                placeholder="Numéro télephone"
                                name="phone"
                                onChange={handleInputChange}
                                isInvalid={isSubmitted && !state.phone}
                              />
                              {isSubmitted && !state.phone && (
                                <Form.Control.Feedback type="invalid">
                                  Ce champ est obligatoire
                                </Form.Control.Feedback>
                              )}
                            </Col>
                          </Row>
                        </>
                      )}
                      {step === 4 && (
                        <>
                          <Row className="mb-3">
                            <div className="label-form">
                              Merci, votre demande a bien été prise en compte.
                            </div>
                            <div className="congratulations">
                              <img src={partyPopper} alt="img" />
                            </div>

                            <p className="text-resume">
                              L’un de nos partenaires spécialiste en pompe à
                              chaleur vous rappelera dans les plus brefs délais
                              pour discuter de votre projet
                            </p>
                          </Row>
                        </>
                      )}

                      {step == 3 && (
                        <div className="btn-action">
                          <Button type="submit" className="form-button">
                            Valider
                          </Button>
                        </div>
                      )}
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
              <div className="header-left-trace" />
            </Row>
          </Container>
        </div>

        <section className="air-conditioner-section">
          <Container>
            <ScrollAnimation
              animateIn="bounceInLeft"
              animateOut="bounceOutRight"
            >
              <img src={airConditioner} alt="img" />
            </ScrollAnimation>
          </Container>
        </section>

        <section className="habitatMeilleur">
          <Container>
            <Row>
              <div className="main-title">
                <h2>Habitat-Meilleur</h2>
                <h3>Les avantages</h3>
              </div>
            </Row>
            <Row>
              <Col lg={3} md={6} sm={6} xs={12}>
                <Card className="advantage-card">
                  <Card.Body className="advantage-card-body">
                    <div className="advantage-card-image">
                      <img src={money} alt="img" />
                    </div>
                    <Card.Subtitle className="advantage-card-title">
                      Economie d'argent
                    </Card.Subtitle>
                    <Card.Text className="advantage-card-description">
                      Utilisez l'argent économisé pour financer votre projet
                      sans payer de frais.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3} md={6} sm={6} xs={12}>
                <Card className="advantage-card">
                  <Card.Body className="advantage-card-body">
                    <div className="advantage-card-image">
                      {" "}
                      <img src={lifebuoy} alt="img" />
                    </div>
                    <Card.Subtitle className="advantage-card-title">
                      Aides de l'Etat
                    </Card.Subtitle>
                    <Card.Text className="advantage-card-description">
                      Bénéficiez des 25% à 35% d'aides fournies par l'Etat
                      (cumul de diverses aides attribuées).
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3} md={6} sm={6} xs={12}>
                <Card className="advantage-card">
                  <Card.Body className="advantage-card-body">
                    <div className="advantage-card-image">
                      {" "}
                      <img src={house} alt="img" />
                    </div>
                    <Card.Subtitle className="advantage-card-title">
                      Valeur de votre bien
                    </Card.Subtitle>
                    <Card.Text className="advantage-card-description">
                      Augmentez la valeur de votre bien de 15% à 25% (Étude du
                      conseil supérieur du notariat).
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3} md={6} sm={6} xs={12}>
                <Card className="advantage-card">
                  <Card.Body className="advantage-card-body">
                    <div className="advantage-card-image">
                      {" "}
                      <img src={sales} alt="img" />
                    </div>
                    <Card.Subtitle className="advantage-card-title">
                      Augmentez votre pouvoir d'achat
                    </Card.Subtitle>
                    <Card.Text className="advantage-card-description">
                      Augmentez votre pouvoir d’achat grâce aux économies
                      réalisés. Faites vous plaisir !
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={12} className="advantage-bottom">
                <Button
                  onClick={() => {
                    scrollToTestDiv();
                  }}
                  className="advantage-button"
                >
                  Tester gratuitement mon éligibilité
                </Button>
              </Col>
            </Row>
          </Container>
        </section>
        <footer>
          <Container>
            <div className="footer-text">
              <p>
                Ne supportez plus le coût des factures énergétiques et
                participez à la transition énergétique pour construire un monde
                plus propre et plus durable. Vous obtiendrez tous les avantages
                possibles, augmenterez la valeur de votre maison et créerez un
                monde plus propre pour vos enfants.
              </p>
            </div>
          </Container>
          <div className="copyright">
            <Container>
              <a variant="body1" href={Pdf} target="_blank">
                © Copyright 2021 - Mentions Légales
              </a>
            </Container>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Home;
