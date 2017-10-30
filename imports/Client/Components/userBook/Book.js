import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Books } from '../../../api/books';
import { createContainer } from 'meteor/react-meteor-data';

// Task component - represents a single todo item
class Book extends Component {
    constructor(props) {
        super(props);

        this.state = {
            noDioLike: true,
            noDioDislike: true
        };
    }

    render() {
        const bookClassName = this.props.book.genre ? 'checked' : '';
        return (
            <div className={this.props.book.busquedaH} >
                <br />
                <div className="row contenedora">
                    <div className="col-sm-4 ">

                        <br />
                        <img className="imagenLibro" src={this.props.book.imagen} onClick={this.mostrarImagen.bind(this)} alt="" height="100" width="100" /><br />
                        {this.props.currentUser ?
                            <form className={this.props.book.mI} onSubmit={this.cambiarImagen.bind(this)}>
                                <input type="text" ref="textInputIm" placeholder="Direccion url de la imagen" aria-label = "Direccion url de la imagen" />
                            </form> : ''}
                        <br />
                        <p className="descLibro" onClick={this.mostrarGenero.bind(this)}>Genero: {this.props.book.genero}</p>
                        {this.props.currentUser ?
                            <form className={this.props.book.mG} onSubmit={this.editarGenre.bind(this)}>
                                <input type="text" ref="textInputi" placeholder={this.props.book.genero} aria-label = "Nuevo Genero del libro"/>
                            </form> : ''}
                        <p className="descLibro" onClick={this.mostrarIdioma.bind(this)}> idioma: {this.props.book.idioma}</p>
                        {this.props.currentUser ?
                            <form className={this.props.book.mL} onSubmit={this.editarLan.bind(this)}>
                                <input type="text" ref="textInputo" placeholder={this.props.book.idioma} aria-label = "Nuevo idioma del libro"/>
                            </form> : ''}
                        <p > <img onClick={this.darLike.bind(this)} src="https://noticiasmicrojuris.files.wordpress.com/2013/10/facebook-like.png" alt="" height="60" width="60" /> : {this.props.book.likes} </p>
                        <p ><img onClick={this.darDislike.bind(this)} src="https://timedotcom.files.wordpress.com/2014/12/dislike.jpeg?h=580" alt="" height="50" width="55" />: {this.props.book.dislikes} </p>
                    </div>
                    <div className="col-sm-8 ">
                        <h2 className="tituloLibro">{this.props.book.text}</h2><br />

                        <p className="historia">{this.props.book.texto}</p>
                        {this.props.currentUser && (this.props.book.privado == false || (this.props.book.username == Meteor.user().username) || (this.props.book.colaboradores != undefined && this.props.book.colaboradores.includes(Meteor.user().username ))) ?
                            <form onSubmit={this.editarStory.bind(this)}>
                                <input type="text" ref="textInput" placeholder="Continuar con la historia" aria-label = "Agregar una nueva parte a la historia" />
                            </form> : ''}

                            <p><span className="text">
                            <br/>
                            Escrito por:<strong>{this.props.book.username}</strong>
                        </span></p><br />
                        <br/><br/>

                        {(this.props.currentUser && Meteor.user().username === this.props.book.username) ?



                            <div>
                                <p>Agregar compañero de Escritura</p>
                                <form onSubmit={this.agregarColaborador.bind(this)}>
                                    <input type="text" ref="colaborador" placeholder="Agregar compañero de escritura" aria-label = "Agregar nuevo compañero de escritura"/>
                                </form></div> : ''}
                        <br/><br/>


                        

                        <strong>Comentarios</strong>

                        <p className="comentario">{this.props.book.comments}</p>
                        {this.props.currentUser ?
                            <form onSubmit={this.addComment.bind(this)}>
                                <input type="text" ref="textInputco" placeholder="Agregar Comentario" aria-label = "Agregar nuevo comentario"/>
                            </form> : ''}
                        <br/>
                        {(this.props.currentUser && Meteor.user().username === this.props.book.username) ?
                            <button className="delete btn" onClick={this.deleteThisTask.bind(this)}> Borrar Libro</button> : ''}
                        <br/><br/>


                    </div>


                    <button className={this.props.book.botonBusqueda} onClick={this.salirBusqueda.bind(this)}>Salir de Busqueda</button>
                    <br/><br/>
                </div>
                <br />
                <br />
            </div>
        );
    }
    editarGenre() {
        event.preventDefault();
        const text = ReactDOM.findDOMNode(this.refs.textInputi).value.trim();
        Meteor.call('books.editarGenre', this.props.book._id, text);
    }
    mostrarGenero() {
        Meteor.call('books.mostrarGenero', this.props.book._id);
    }
    salirBusqueda() {
        Meteor.call('books.salirBusqueda', this.props.book._id);
    }
    darLike() {
        if (this.props.currentUser) {
            const likes = this.props.book.likes;
            const nLikes = likes + 1;
            Meteor.call('books.darLike', this.props.book._id, likes, nLikes);
        }
    }
    darDislike() {
        if (this.props.currentUser) {
            const dLikes = this.props.book.dislikes;
            const nDlikes = dLikes + 1;
            Meteor.call('books.darDislike', this.props.book._id, dLikes, nDlikes);
        }
    }

    editarLan() {
        const text = ReactDOM.findDOMNode(this.refs.textInputo).value.trim();
        Meteor.call('books.editarLan', this.props.book._id, text);
    }
    mostrarIdioma() {
        Meteor.call('books.mostrarIdioma', this.props.book._id);
    }
    editarStory() {
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
        Meteor.call('books.editarStory', this.props.book._id, this.props.book.texto, text);
    }
    agregarColaborador() {
        const text = ReactDOM.findDOMNode(this.refs.colaborador).value.trim();
        Meteor.call('books.addColaborador', this.props.book._id, this.props.book.colaboradores, text);
    }
    addComment() {
        const text = ReactDOM.findDOMNode(this.refs.textInputco).value.trim();
        nText = (this.props.book.comments + "\n" + text + "\n" + "Comentado por:" + Meteor.user().username +".\n" + "\n" );
        Meteor.call('books.addComment', this.props.book._id, nText);
    }
    cambiarImagen() {
        const text = ReactDOM.findDOMNode(this.refs.textInputIm).value.trim();
        Meteor.call('books.cambiarImagen', this.props.book._id, text);
    }
    mostrarImagen() {
        Meteor.call('books.mostrarImagen', this.props.book._id);
    }

    deleteThisTask() {
        if(this.props.book.username === Meteor.user().username)
        {
            Meteor.call('books.remove', this.props.book._id);
        }
        else {
            alert("Solo puedes borrar libros de tu autoria");
        }

    }
}
Book.propTypes = {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    book: PropTypes.object.isRequired,
    currentUser: PropTypes.object,
};
export default createContainer(() => {
    return {
        currentUser: Meteor.user(),
    };
}, Book);