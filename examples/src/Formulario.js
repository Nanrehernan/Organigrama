import { Component } from "react";

export default class Formulario extends Component {

    render() {
        return (
            <div> 
                <input className="form-control" type="file" id="file_file" onChange={this.props.handleOnChange}/>
                <input className="btn btn-outline-primary" type="button" value="Cargar" onClick={this.props.handleFile}/>
            </div>
        );
    }
}