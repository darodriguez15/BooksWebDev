import React, { Component } from 'react';
import PropTypes from "prop-types";
import ReactDOM from 'react-dom';
import { Books } from "../../../api/books";

// Task component - represents a single todo item
export default class Book extends Component {
    render() {
        return (
            <div>
                <br/>
                <div className="row contenedora">
                    <div className="col-sm-4 ">
                        <br/>
                        <img className="imagenLibro" src={this.props.book.imagen} alt=""/><br/>
                        <br/>
                        <p className="descLibro">Genero: {this.props.book.genero}</p>
                        <p className="descLibro">idioma: {this.props.book.idioma}</p>
                        <p className="descLibro"> <img className="landdl" src="https://noticiasmicrojuris.files.wordpress.com/2013/10/facebook-like.png" alt=""/> : {this.props.book.likes} </p>
                        <p className="descLibro"><img className="landdl" src="https://timedotcom.files.wordpress.com/2014/12/dislike.jpeg?h=580" alt=""/>: {this.props.book.dislikes} </p>

                    </div>

                    <div className="col-sm-8 ">
                        <h2 className="tituloLibro">{this.props.book.text}</h2><br/>
                        <p className="historia">{this.props.book.texto} </p>
                    </div>
                </div>
                <br/>
                <br/>

            </div>




        );
    }
}

Book.propTypes = {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    book: PropTypes.object.isRequired,
};