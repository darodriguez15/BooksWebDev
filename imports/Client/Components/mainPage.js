import React, {Component} from "react";

export default class App extends Component
{
    render (){
        return (
            <div>
                <section className="jumbotron ">
                    <div className="container iniMainPage ">
                        <img className="img-fluid" src="./images/profile.png" alt=""/>
                            <div className="row text-center">
                                <h2 className="tituMainPage">Bienvenido a Books</h2>

                                <br/><br/><br/>

                                <a href="/user"><button class="btn btn-primary" type="button"> Iniciar Sesion </button></a>
                                <br/><br/>
                                <a href="/ui"><button class="btn btn-primary" type="button"> Continuar como invitado </button></a>


                            </div>
                        <br/>
                        <br/><br/>
                        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>


                    </div>

                </section>
            </div>
        );
    }
}