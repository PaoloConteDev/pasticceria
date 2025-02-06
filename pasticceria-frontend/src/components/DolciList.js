import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Row, Col } from "react-bootstrap";

const DolciList = () => {
    const [dolci, setDolci] = useState([]);

    useEffect(() => {
        fetchDolci();
    }, []);


    const fetchDolci = async () => {
        const response = await axios.get("http://localhost:3001/dolci");
        setDolci(response.data);
    };

    // Calcola il prezzo aggiornato in base al giorno di vendita
    const calcolaPrezzo = (prezzoBase, dataVendita) => {
        const oggi = new Date();
        const dataDolce = new Date(dataVendita);
        const differenzaGiorni = Math.floor((oggi - dataDolce) / (1000 * 60 * 60 * 24));

        let prezzoAggiornato = prezzoBase;

        // Verifica se il dolce è scaduto e calcola il prezzo
        if (differenzaGiorni === 1) {
            prezzoAggiornato = prezzoBase * 0.8; // Secondo giorno
        } else if (differenzaGiorni === 2) {
            prezzoAggiornato = prezzoBase * 0.2; // Terzo giorno
        } else if (differenzaGiorni >= 3) {
            return null;  // Dolce scaduto, non visibile
        }

        // Assicurati che il prezzo sia un numero valido
        return Number(prezzoAggiornato) || prezzoBase;
    };

    // Controlla se il dolce è dello stesso giorno
    const èOggi = (dataVendita) => {
        const oggi = new Date();
        const dataDolce = new Date(dataVendita);
        return oggi.toDateString() === dataDolce.toDateString();
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">🛍️ Vetrina Dolci</h2>
            <Row className="mt-4">
                {dolci.map((dolce) => {
                    const prezzoBase = Number(dolce.prezzo); // Converti il prezzo in numero
                    const prezzoAttuale = calcolaPrezzo(prezzoBase, dolce.data_vendita);
                    const vendutoOggi = èOggi(dolce.data_vendita); // Verifica se il dolce è stato venduto oggi
                    return (
                        prezzoAttuale !== null && ( // Mostra solo i dolci ancora commestibili
                            <Col key={dolce.id} md={4} className="mb-4">
                                <Card className="shadow-lg">
                                    <Card.Body>
                                        <Card.Title className="fw-bold">{dolce.nome}</Card.Title>
                                        <Card.Text>
                                            <strong>Ingredienti:</strong> {dolce.ingredienti.join(", ")}
                                            <br />
                                            <strong>Data vendita:</strong> {dolce.data_vendita}
                                            <br />
                                            <strong>Quantità disponibile:</strong> {dolce.quantita}
                                        </Card.Text>

                                        {/* Mostra il prezzo barrato solo se non è oggi */}
                                        {!vendutoOggi && (
                                            <h4 className="text-muted">
                                                <s> €{prezzoBase.toFixed(2)}</s> {/* Prezzo originale */}
                                            </h4>
                                        )}

                                        {/* Mostra sempre il prezzo attuale, scontato se necessario */}
                                        <h4 className="text-primary">
                                             €{prezzoAttuale.toFixed(2)} {/* Prezzo attuale */}
                                        </h4>

                                        <Button variant="success" disabled={dolce.quantita === 0}>
                                            {dolce.quantita > 0 ? "Acquista" : "Esaurito"}
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    );
                })}
            </Row>
        </div>
    );
};

export default DolciList;
