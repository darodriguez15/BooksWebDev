import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from "prop-types";
import Book from './Book';
import {Books} from "../../../api/books";
import Header from "../globalUsuarioInvitado/header"

// App component - represents the whole app
class App extends Component {


    renderTasks() {
        return this.props.books.map((book) => (
            <Book key={book._id} book={book} />
        ));
    }
    handleSubmit(){

    }

    render() {
        return (
            <div className="container">
                <Header/>
                <br/><br/><br/><br/><br/><br/>
                <header>
                    <h1>Listado de libros</h1>
                </header>


                    {this.renderTasks()}



            </div>
        );
    }

}
App.propTypes = {
    books: PropTypes.array.isRequired,
};

export default createContainer(() => {
    Meteor.subscribe('books');
    return {
        books: Books.find({}).fetch(),
        currentUser: Meteor.user(),
    };
}, App);