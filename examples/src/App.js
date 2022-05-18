import { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navegacion from "./Navegacion";
import Inicio from "./Inicio";
import Organigrama from "./Organigrama";
import Formulario from "./Formulario";
import "./App.css";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputFile: null,
            file: undefined,
            cargar: true,
            datos: [
                { id: 1, name: "Datos", departament: "", title: "", idParent: 1 },
                { id: 2, name: "Organigrama", departament: "", title: "", idParent: 1 }
            ]
        };
    }

    handleOnChange = (e) => {
        this.setState({
            file: e.target.files[0],
            inputFile: e.target
        });
    }

    handleOnClick = (e) => {
        this.setState({
            cargar: false
        });

        let formData = new FormData();
        formData.append("file", this.state.file);


        const xhttp = new XMLHttpRequest();
        xhttp.onload = () => {
            const datos = JSON.parse(xhttp.response);
            this.handleUpdate(datos);
        }
        xhttp.open("post", "http://localhost:9000/upload", true);
        xhttp.send(formData);
    }

    handleUpdate(datos){
        const inputFile = this.state.inputFile;
        inputFile.value = "";
        this.setState({
            datos: datos,
            cargar: true,
            file: undefined,
            inputFile: null
        })
    }

        render() {
            return (
                <div className="container-fluid">
                    <Router>
                        <Navegacion />

                        <Switch>
                            <Route exact path="/"><Inicio /></Route>
                            <Route exact path="/documentacion"><h2>Documentacion</h2></Route>
                            <Route exact path="/organigrama">
                                <Formulario handleOnClick={this.handleOnClick} handleOnChange={this.handleOnChange} />
                                <Organigrama cargar={this.state.cargar} datos={this.state.datos} />
                            </Route>
                        </Switch>
                    </Router>
                </div>
            );
        }
    }