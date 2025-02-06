import React, { useEffect, useState } from "react";
import axios from "axios";

const Backoffice = () => {
    const [dolci, setDolci] = useState([]);
    const [formData, setFormData] = useState({
        nome: "",
        prezzo: "",
        ingredienti: "",
        data_vendita: "",
        quantita: ""
    });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchDolci();
    }, []);

    // Recupera i dolci dal server
    const fetchDolci = async () => {
        const response = await axios.get("http://localhost:3001/dolci");
        setDolci(response.data);
    };

    // Gestisce il cambio nei campi di input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Inserisce o aggiorna un dolce
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newDolce = {
            ...formData,
            ingredienti: formData.ingredienti.split(", ")
        };

        if (editId) {
            await axios.put(`http://localhost:3001/dolci/${editId}`, newDolce);
            setEditId(null);
        } else {
            await axios.post("http://localhost:3001/dolci", newDolce);
        }

        setFormData({ nome: "", prezzo: "", ingredienti: "", data_vendita: "", quantita: "" });
        fetchDolci();
    };

    // Modifica un dolce
    const handleEdit = (dolce) => {
        setEditId(dolce.id);
        setFormData({
            nome: dolce.nome,
            prezzo: dolce.prezzo,
            ingredienti: dolce.ingredienti.join(", "),
            data_vendita: dolce.data_vendita,
            quantita: dolce.quantita
        });
    };

    // Elimina un dolce
    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3001/dolci/${id}`);
        fetchDolci();
    };

    return (
        <div className="container mt-5">
            <h2>🛠️ Backoffice - Gestione Dolci</h2>

            {/* Form per aggiungere/modificare dolci */}
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="row">
                    <div className="col">
                        <input type="text" name="nome" className="form-control" placeholder="Nome" value={formData.nome} onChange={handleChange} required />
                    </div>
                    <div className="col">
                        <input type="number" name="prezzo" className="form-control" placeholder="Prezzo" value={formData.prezzo} onChange={handleChange} required />
                    </div>
                </div>

                <input type="text" name="ingredienti" className="form-control mt-2" placeholder="Ingredienti (separati da virgola)" value={formData.ingredienti} onChange={handleChange} required />

                <div className="row mt-2">
                    <div className="col">
                        <input type="date" name="data_vendita" className="form-control" value={formData.data_vendita} onChange={handleChange} required />
                    </div>
                    <div className="col">
                        <input type="number" name="quantita" className="form-control" placeholder="Quantità" value={formData.quantita} onChange={handleChange} required />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary mt-3">{editId ? "Modifica" : "Aggiungi"}</button>
            </form>

            {/* Lista dei dolci con pulsanti Modifica e Elimina */}
            <h3>Dolci disponibili</h3>
            <ul className="list-group">
                {dolci.map((dolce) => (
                    <li key={dolce.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <h5>{dolce.nome} - €{dolce.prezzo}</h5>
                            <p>Ingredienti: {dolce.ingredienti.join(", ")}</p>
                            <p>Data Vendita: {dolce.data_vendita} | Quantità: {dolce.quantita}</p>
                        </div>
                        <div>
                            <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(dolce)}>✏️ Modifica</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(dolce.id)}>🗑️ Elimina</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Backoffice;
