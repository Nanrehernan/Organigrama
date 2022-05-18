import { Component } from "react";

export default class Formulario extends Component {

    render() {
        return (
            <div className="row mt-1">
                <div className="col-11">
                    <input className="form-control w-100" type="file" id="file_file" onChange={this.props.handleOnChange} />
                </div>

                <div className="col-1">
                    <input className="btn btn-outline-primary w-100" type="button" value="Cargar" onClick={this.props.handleOnClick} />
                </div>
            </div>
        );
    }
}