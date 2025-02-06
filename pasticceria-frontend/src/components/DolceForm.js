import React, { useState } from "react";
import axios from "axios";

const DolceForm = () => {
    const [dolce, setDolce] = useState({ nome: "", prezzo: "", ingredienti: "", data_vendita: "", quantita: "" });

    const handleChange = (e) => {
        setDolce({ ...dolce, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/dolci", { ...dolce, ingredienti: dolce.ingredienti.split(", ") })
            .then(() => alert("Dolce aggiunto!"));
    };

    return (
        <form onSubmit={handleSubmit} className="container mt-5">
            <h2>Aggiungi un Dolce</h2>
            <input type="text" name="nome" placeholder="Nome" className="form-control" onChange={handleChange} />
            <input type="number" name="prezzo" placeholder="Prezzo" className="form-control" onChange={handleChange} />
            <input type="text" name="ingredienti" placeholder="Ingredienti (separati da virgola)" className="form-control" onChange={handleChange} />
            <input type="date" name="data_vendita" className="form-control" onChange={handleChange} />
            <input type="number" name="quantita" placeholder="Quantità" className="form-control" onChange={handleChange} />
            <button type="submit" className="btn btn-primary mt-2">Aggiungi</button>
        </form>
    );
};

export default DolceForm;
