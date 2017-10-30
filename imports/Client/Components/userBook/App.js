import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from "prop-types";
import ReactDOM from 'react-dom';
import Book from './Book';
import { Meteor } from 'meteor/meteor';
import { Books } from "../../../api/books";
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import Header from "../globalusuariopro/header";

// App component - represents the whole app
class App extends Component {

  constructor(props) {
    super(props);
 
    this.state = {
        busqueda: "hidden",

    };
  }

  renderTasks() {
          return this.props.books.map((book) => (
              <Book key={book._id} book={book}  />
          ));
    }
    handleSubmit() {
        event.preventDefault();

        // Find the text field via the React ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

                Meteor.call('books.insert', text);

        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';


    }
    handleChange() {
        const text = ReactDOM.findDOMNode(this.refs.textInputo).value.trim();
        console.log(text);
        this.setState({ busqueda: "" });
        for (i = 0; i < this.props.books.length; i++) {
            Meteor.call('books.fore', this.props.books[i]._id);
        }
        for (i = 0; i < this.props.books.length; i++) {
            if (this.props.books[i].text == (text)) {
                Meteor.call('books.fore2', this.props.books[i]._id);
            }
        }
    }
    handleChange2() {
        const text = ReactDOM.findDOMNode(this.refs.genero).value.trim();
        console.log(text);
        this.setState({ busqueda: "" });
        for (i = 0; i < this.props.books.length; i++) {
            Meteor.call('books.fore', this.props.books[i]._id);
        }
        for (i = 0; i < this.props.books.length; i++) {
            if (this.props.books[i].genero.includes(text)) {
                Meteor.call('books.fore2', this.props.books[i]._id);
            }
        }
    }
    handleChange3() {
        const text = ReactDOM.findDOMNode(this.refs.autor).value.trim();
        console.log(text);
        this.setState({ busqueda: "" });
        for (i = 0; i < this.props.books.length; i++) {
            Meteor.call('books.fore', this.props.books[i]._id);
        }
        for (i = 0; i < this.props.books.length; i++) {
            if (this.props.books[i].username.includes(text)) {
                Meteor.call('books.fore2', this.props.books[i]._id);
            }
        }
    }
    handleChange4() {
        const text = ReactDOM.findDOMNode(this.refs.idioma).value.trim();
        console.log(text);
        this.setState({ busqueda: "" });
        for (i = 0; i < this.props.books.length; i++) {
            Meteor.call('books.fore', this.props.books[i]._id);
        }
        for (i = 0; i < this.props.books.length; i++) {
            if (this.props.books[i].idioma.includes(text)) {
                Meteor.call('books.fore2', this.props.books[i]._id);
            }
        }
    }

    handleChange5() {
        const text = ReactDOM.findDOMNode(this.refs.clave).value.trim();
        console.log(text);
        this.setState({ busqueda: "" });
        for (i = 0; i < this.props.books.length; i++) {
            Meteor.call('books.fore', this.props.books[i]._id);
        }
        for (i = 0; i < this.props.books.length; i++) {
            if (this.props.books[i].text.includes(text)) {
                Meteor.call('books.fore2', this.props.books[i]._id);
            }
        }
    }

    render() {
        paila = true;
        for (i = 0; i < this.props.books.length; i++) {
            if (this.props.books[i].busquedaH == "") {
                paila = false;
            }
        }
        if (paila) {
            for (i = 0; i < this.props.books.length; i++) {
                Meteor.call('books.paila', this.props.books[i]._id);
            }
        }
        return (
            <div className="container">
                <Header/>
                <br/><br/><br/><br/>
                <div className="row">
                    <div className="col-sm-10">
                        <h1>Lista de Libros</h1>
                </div>
                    <div className="col-sm-2"> <br/><br/>

                        <AccountsUIWrapper/></div>


                </div>


                <h2>Busquedas</h2>
                <br/>
                <div id="panelBusquedas">
                    <form className="new-task" onSubmit={this.handleChange.bind(this)} ><p>
                        <label>Buscar libro por nombre</label>
                        <input
                            aria-label = "Buscar libro por nombre"
                        type="text"
                        ref="textInputo"
                        placeholder="Buscar libro por nombre" /></p>
                    </form>
                    <form className="new-task" onSubmit={this.handleChange5.bind(this)} ><p>
                        <label>Buscar libro por palabra clave</label>
                        <input
                            type="text"
                            ref="clave"
                            aria-label = "Buscar libro por palabra clave"
                            placeholder="Buscar libro por nombre" /></p>
                    </form>
                    <form className="new-task" onSubmit={this.handleChange2.bind(this)} ><p>
                        <label>Buscar libro por Genero</label>
                        <input
                            type="text"
                            ref="genero"
                            aria-label = "Buscar libro por genero"
                            placeholder="Buscar libro por Genero" /></p>
                    </form>
                    <form className="new-task" onSubmit={this.handleChange3.bind(this)} ><p>
                        <label>Buscar libro por Autor</label>
                        <input
                            type="text"
                            ref="autor"
                            aria-label = "Buscar libro por autor"
                            placeholder="Buscar libro por Autor" /></p>
                    </form>
                    <form className="new-task" onSubmit={this.handleChange4.bind(this)} ><p>
                        <label>Buscar libro por Idioma</label>
                        <input
                            type="text"
                            ref="idioma"
                            aria-label = "Buscar libro por idioma"
                            placeholder="Buscar libro por Idioma" /></p>
                    </form>
                </div>

                <a className="btn btn-default 	proyectButton	" role="button" id="descrpBotuuno">Ver las opciones de busqueda &raquo;</a><br/><br/><br/><br/>


            {this.props.currentUser ?
                  <div>
                <h3>Agregar Nuevo Libro</h3>
                    <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                        <p><input
                            type="text"
                            ref="textInput"
                            aria-label = "Nombre de tu nuevo libro"
                            placeholder="Escribe el nombre de tu nuevo libro" /></p>
                    </form> </div>: ''
                    }

                    {this.renderTasks()}



            </div>
        );
    }



    abrrirBoton() {
        this.setState({ busqueda: "hidden" });
    }
}
App.propTypes = {
    books: PropTypes.array.isRequired,
    currentUser: PropTypes.object,
};

export default createContainer(() => {

    Meteor.subscribe('books');
    return {
        books: Books.find({}).fetch(),
        currentUser: Meteor.user(),
    };
}, App);