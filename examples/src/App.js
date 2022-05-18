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
            cargar: false
        };
    }

    handleOnChange = (e) => {
        this.setState({file: e.target.files[0]});
    }

    handleFile = (e)=>{
        console.log(this.state.file);
        this.setState({cargar: true});
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
                            <Formulario handleFile={this.handleFile} handleOnChange={this.handleOnChange} />
                            <Organigrama datos={this.state.data} cargar={this.state.cargar}/>
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}