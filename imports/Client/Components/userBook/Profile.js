import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Books } from "../../../api/books";
import Book from './Book';
import { Profiles } from '../../../api/profiles';
import ProfileView from './ProfileView';
import { createContainer } from 'meteor/react-meteor-data';

// Task component - represents a single todo item
class Profile extends Component {
    constructor(props) {
        super(props);
    }
    renderTasks() {
        for (i = 0; i < this.props.books.length; i++) {
            if (this.props.books[i].username == this.props.profile.username) {
                this.props.booksDisplay.push(this.props.books[i])
            }
        }
        return this.props.booksDisplay.map((book) => (
            <Book key={book._id} book={book} />
        ));
    }
    render() {
        return (
            <div>
                {this.props.currentUser ?
            <div className={this.props.profile.busquedaH} >
                <br />
                <div className="row contenedora">
                    <div className="col-sm-4 ">
                        <br />
                        <img className="imagenLibro" src={this.props.profile.imagen} onClick={this.mostrarImagen.bind(this)} alt="" height="100" width="100" /><br />
                        {this.props.currentUser && (this.props.profile.username == this.props.currentUser.username) ?
                            <form className={this.props.profile.mI} onSubmit={this.cambiarImagen.bind(this)}>
                                <input type="text" ref="textInputIm" placeholder="Direccion url de la imagen" aria-label="Direccion url de la imagen" />
                            </form> : ''}
                        <br />
                        <p className="descLibro" onClick={this.mostrarGenero.bind(this)}>Nombre: {this.props.profile.apellido}</p>
                        {this.props.currentUser && (this.props.profile.username == this.props.currentUser.username) ?
                            <form className={this.props.profile.mG} onSubmit={this.editarGenre.bind(this)}>
                                <input type="text" ref="textInputi" placeholder={this.props.profile.genero} aria-label="Nuevo Genero del libro" />
                            </form> : ''}
                        <p className="descLibro"> Username: {this.props.profile.username}</p>
                        {this.props.currentUser && (this.props.profile.username == this.props.currentUser.username) ?
                            <form className={this.props.profile.mL} onSubmit={this.editarLan.bind(this)}>
                                <input type="text" ref="textInputo" placeholder={this.props.profile.idioma} aria-label="Nuevo idioma del libro" />
                            </form> : ''}
                    </div>
                    <div className="col-sm-8 ">
                        <h2 className="tituloLibro">{this.props.profile.nombre}</h2><br />    
                        <p><span className="text">
                                    <br />
                        </span></p>

                        Mis Libros:
                                    {this.renderTasks()}<br />
                        <br /><br />
                        {(this.props.currentUser && Meteor.user().username === this.props.profile.username) ?
                            <button className="delete btn" onClick={this.deleteThisTask.bind(this)}> Borrar Perfil</button> : ''}
                        <br /><br/>
                    </div>


                    <button className={this.props.profile.botonBusqueda} onClick={this.salirBusqueda.bind(this)}>Salir de Busqueda</button>
                    <br /><br />
                </div>
                <br />
                <br />
            </div> : ''}
            </div>
        );
    }
    editarGenre() {
        console.log("current" + this.props.currentUser);
        event.preventDefault();
        const text = ReactDOM.findDOMNode(this.refs.textInputi).value.trim();
        Meteor.call('profiles.editarGenre', this.props.profile._id, text);
    }
    mostrarGenero() {
        Meteor.call('profiles.mostrarGenero', this.props.profile._id);
    }
    salirBusqueda() {
        Meteor.call('profiles.salirBusqueda', this.props.profile._id);
    }

    editarLan() {
        const text = ReactDOM.findDOMNode(this.refs.textInputo).value.trim();
        Meteor.call('profiles.editarLan', this.props.profile._id, text);
    }
    mostrarIdioma() {
        Meteor.call('profiles.mostrarIdioma', this.props.profile._id);
    }

    editarStory() {
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
        Meteor.call('profiles.editarStory', this.props.profile._id, this.props.profile.texto, text);
    }
    agregarColaborador() {
        const text = ReactDOM.findDOMNode(this.refs.colaborador).value.trim();
        Meteor.call('profiles.addColaborador', this.props.profile._id, this.props.profile.colaboradores, text);
    }
    addComment() {
        const text = ReactDOM.findDOMNode(this.refs.textInputco).value.trim();
        nText = (this.props.profile.comments + "\n" + text + "\n" + "Comentado por:" + Meteor.user().username + ".\n" + "\n");
        Meteor.call('profiles.addComment', this.props.profile._id, nText);
    }
    cambiarImagen() {
        const text = ReactDOM.findDOMNode(this.refs.textInputIm).value.trim();
        Meteor.call('profiles.cambiarImagen', this.props.profile._id, text);
    }
    mostrarImagen() {
        Meteor.call('profiles.mostrarImagen', this.props.profile._id);
    }
    deleteThisTask() {
            Meteor.call('profiles.remove', this.props.profile._id);

    }
}
Profile.propTypes = {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    profile: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    currentUser: PropTypes.object,
};
export default createContainer(() => {
    Meteor.subscribe('books');
    return {
        abuscar: "",
        booksDisplay: [],
        books: Books.find({}).fetch(),
        currentUser: Meteor.user(),
    };
}, Profile);