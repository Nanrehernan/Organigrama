import { Component } from "react";
import OrgChart from '@unicef/react-org-chart/src';
import avatarPersonnel from "./assets/avatar-personnel.svg";

export default class Organigrama extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tree: {
                id: 1,
                person: {
                    avatar: avatarPersonnel,
                    department: "",
                    name: "Hernan",
                    title: "",
                    totalReports: 0,
                },
                hasChild: false,
                hasParent: true,
                children: [],
            },
            downloadingChart: false,
            config: {},
            highlightPostNumbers: [1]
        }
    }

    ActualizarDatos = (datos) => {
        this.setState({ tree: this.getNodoPrincipal(datos) });
    }

    getNodoPrincipal = (datos) => {
        console.log(datos);
        let persona = {};

        for (let p of datos) {
            if (p.id === p.idParent) {
                persona = p;
                break;
            }
        }

        let nodo = {
            id: persona.id,
            person: {
                avatar: avatarPersonnel,
                department: persona.department,
                name: persona.name,
                title: persona.title,
                totalReports: this.getTotalReport(persona.id, datos),
            },
            hasChild: (this.getTotalReport(persona.id, datos) > 0) ? true : false,
            hasParent: (persona.id === persona.idParent) ? false : true,
            children: [],
        };

        return nodo;
    }

    getChild = (id, datos) => {
        let hijos = [];

        for (let p of datos) {
            if (p.id !== p.idParent) {
                if (p.idParent === id) {
                    let nodo = {
                        id: p.id,
                        person: {
                            avatar: avatarPersonnel,
                            department: p.departament,
                            name: p.name,
                            title: p.title,
                            totalReports: this.getTotalReport(p.id, datos),
                        },
                        hasChild: (this.getTotalReport(p.id, datos) > 0) ? true : false,
                        hasParent: (p.id === p.idParent) ? false : true,
                        children: [],
                    }

                    hijos.push(nodo);
                }
            }
        }

        return hijos;
    }

    getTotalReport = (id, datos) => {
        let totalReport = 0;
        for (let p of datos) {
            if (p.id !== p.idParent) {
                if (p.idParent === id) {
                    totalReport++;
                }
            }
        }

        return totalReport;
    }

    componentDidUpdate(props, state) {
        if (this.props.datos !== props.datos) {
            this.ActualizarDatos(props.datos);
        }
    }

    handleDownload = () => {
        this.setState({ downloadingChart: false })
    }

    handleOnChangeConfig = config => {
        this.setState({ config: config })
    }

    handleLoadConfig = () => {
        const { config } = this.state
        return config
    }

    render() {
        const datos = this.props.datos;

        const { tree, downloadingChart } = this.state;
        //For downloading org chart as image or pdf based on id
        const downloadImageId = 'download-image';
        const downloadPdfId = 'download-pdf';

        return (
            <div className="organigrama">
                <div className="row">
                    <div className="col-4">
                        <div className="zoom-buttons">
                            <button
                                className="btn btn-outline-primary zoom-button"
                                id="zoom-in"
                            >
                                +
                            </button>
                            <button
                                className="btn btn-outline-primary zoom-button"
                                id="zoom-out"
                            >
                                -
                            </button>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="download-buttons">
                            <button className="btn btn-outline-primary" id="download-image">
                                Download as image
                            </button>
                            <button className="btn btn-outline-primary" id="download-pdf">
                                Download as PDF
                            </button>
                            <a
                                className="github-link"
                                href="https://github.com/unicef/react-org-chart"
                            >
                                Github
                            </a>
                            {downloadingChart && <div>Downloading chart</div>}
                        </div>
                    </div>
                </div>
                <div className="row" style={{ height: "500px" }}>
                    <OrgChart
                        tree={tree}
                        downloadImageId={downloadImageId}
                        downloadPdfId={downloadPdfId}
                        onConfigChange={config => {
                            this.handleOnChangeConfig(config)
                        }}
                        loadConfig={d => {
                            let configuration = this.handleLoadConfig(d)
                            if (configuration) {
                                return configuration
                            }
                        }}
                        downlowdedOrgChart={d => {
                            this.handleDownload()
                        }}
                        loadImage={d => {
                            return Promise.resolve(avatarPersonnel)
                        }}
                        loadChildren={d => {
                            const childrenData = this.getChild(d.id, datos)
                            return childrenData
                        }}
                    />
                </div>
            </div>
        );
    }
}