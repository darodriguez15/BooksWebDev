import React, {Component} from "react";
import Header from "./header";
export default class App extends Component
{
    render() {
        return (
            <div>
                <Header/>
                <br/>
                <br/>
                <br/>

                <section className="jumbotron ">

                    <div className="container">

                        <img className="img-fluid imagenJumbo" src="https://i1.wp.com/hipertextual.com/files/2017/04/libros-libreria-autores.jpg?fit=1000%2C658&ssl=1" alt=""/>
                        <div className="row text-center">
                            <br/>
                            <h3 className="lema">"Por que toda historia tiene mas de una forma de ser contada"</h3>
                        </div>
                    </div>
                </section>

                <div className="row">

                    <h1 className="titulo">Bienvenido a Books</h1>
                    <br/><br/><br/>

                    <div className="col-sm-6">

                        <p className="descripcion">Books es una herramienta que te permite hacer libros de forma colaborativa, puedes iniciar tu propia historia o puedes ayudar en la historia de otro. Proporcionando una riqueza literaria e innovadora que recolecta diferentes puntos de vista que se unen para la creación de historias maravillosas.</p>
                    </div>
                    <div className="col-sm-6">
                        <br/>

                        <p className="descripcion">Además de crear o editar una historia Books te permite comentar una historia además de darle like a tus historias favoritas. Es hora de crear historias fantasticas :)</p>
                    </div>
                </div>
                <br/><br/><br/>
                <div className="row">
                    <div className="col-sm-12">
                        <img className="ima" src="https://serea2017.uniandes.edu.co/images/Logo.png" alt=""/>
                    </div>

                </div>
                <br/><br/>
                <center>
                    <br/><br/>
                    <a href="/userBooks"><button className="btn btn-primary empecemos" type="button"> Empecemos </button></a>
                </center>
                <br/><br/><br/><br/><br/><br/><br/>

            </div>
        );
    }
}