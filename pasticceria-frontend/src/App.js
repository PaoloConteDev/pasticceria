import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DolciList from "./components/DolciList";
import Backoffice from "./components/BackOffice";

function App() {
    return (
        <Router>
            <div className="container mt-4">
                <h1 className="text-center">🍰 Pasticceria</h1>

                <nav className="mb-3">
                    <Link to="/" className="btn btn-outline-primary me-2">Vetrina</Link>
                    <Link to="/admin" className="btn btn-outline-secondary">Backoffice</Link>
                </nav>

                <Routes>
                    <Route path="/" element={<DolciList />} />
                    <Route path="/admin" element={<Backoffice />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
