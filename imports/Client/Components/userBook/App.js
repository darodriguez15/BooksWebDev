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
            if (this.props.books[i].text == text) {
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


                <h3>Buscar Libro</h3>
                <form className="new-task" onSubmit={this.handleChange.bind(this)} ><p><input
                        type="text"
                        ref="textInputo"
                        placeholder="Buscar libro" /></p>
                </form>
                <button className={this.state.busqueda} onClick={this.abrrirBoton.bind(this)}> Borrar Libro</button>
                {this.props.currentUser ?
                  <div>
                <h3>Agregar Nuevo Libro</h3>
                    <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                        <p><input
                            type="text"
                            ref="textInput"
                            placeholder="Escribe el nombre de tu nuevo libro" /></p>
                    </form> </div>: ''
                    }
                <ul>
                    {this.renderTasks()}
                </ul>
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