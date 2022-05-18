import { Component } from "react";
import { Link } from "react-router-dom";

export default class Navegacion extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Reac-Org-Chart</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Inicio</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/documentacion">Documentacion</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/organigrama">Organigrama</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}