import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from "prop-types";
import ReactDOM from 'react-dom';
import Profile from './Profile';
import { Meteor } from 'meteor/meteor';
import { Books } from "../../../api/books";
import { Profiles } from "../../../api/profiles";
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import Header from "../globalusuariopro/header";

// Profile component - represents the whole app
class ProfileView extends Component {
    constructor(props) {
        super(props);
        this.bus = "no";
    }

    renderTasks() {
        this.props.usBuscado = "HOLA";
        for (i = 0; i < this.props.profiles.length; i++) {
            console.log("que pasoaaaa " + this.props.books[0].usuarioBuscado)
            if (this.props.profiles[i].username == this.props.books[0].usuarioBuscado) {
                console.log("que paso")
                this.props.profilesDisplay.push(this.props.profiles[i])
            }
            console.log("acacascascasc: "+this.props.profiles[i].username + "Bus: "+this.bus)
            if (this.props.profiles[i].username === this.props.currentUser.username) {
                this.props.profilesDisplay.push(this.props.profiles[i])
            }
        }
		return this.props.profilesDisplay.map((profile) => (
			<Profile key={profile._id} profile={profile}  />
		));
	}
	handleSubmit() {
		event.preventDefault();

		// Find the text field via the React ref
		const text = "nombre";

		Meteor.call('profiles.insert', text);

		// Clear form
		ReactDOM.findDOMNode(this.refs.textInput).value = '';


	}
	handleChange() {
        const text = ReactDOM.findDOMNode(this.refs.textInputo).value.trim();
        Meteor.call('books.usubuscado', this.props.books[0]._id, text);
        for (i = 0; i < this.props.profiles.length; i++) {
            if (this.props.profiles[i].username == this.props.currentUser.username) {
                this.setState({ busquedass: "ajsssa" });
                Meteor.call('profiles.buscado', this.props.profiles[i]._id, text);
                console.log("miraloooooooooooooo " + this.state.busquedass + "." + this.bus);
            }
        }
	}
	

	render() {
		paila = true;
		for (i = 0; i < this.props.profiles.length; i++) {
			if (this.props.profiles[i].busquedaH == "") {
				paila = false;
			}
		}
		if (paila) {
			for (i = 0; i < this.props.profiles.length; i++) {
				Meteor.call('profiles.paila', this.props.profiles[i]._id);
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
                        <label>Buscar Usuario</label>
                        <input
							aria-label = "Buscar Usuario"
							type="text"
							ref="textInputo"
							placeholder="Username de Usuario" /></p>
			</form>
                </div>
                <button className="btn" onClick={this.limpiarBusqueda.bind(this)} type="button">Limpiar busqueda</button>



             
                    {this.renderProfile()}
		{this.renderTasks()}
		</div>
	);
    }
    limpiarBusqueda() {
        Meteor.call('books.limpiarBuscado', this.props.books[0]._id);
    }
    renderProfile() {
        var noHayPerfil = true;
        for (i = 0; i < this.props.profiles.length; i++) {
            if (this.props.profiles[i].username == this.props.currentUser.username) {
                noHayPerfil = false;
            }
        }
        if (noHayPerfil) {
            return <button className="btn" onClick={this.handleSubmit.bind(this)} type="button">Crear Perfil</button>
        }
        
    }
	abrrirBoton() {
		this.setState({ busqueda: "hidden" });
	}
}
ProfileView.propTypes = {
	profiles: PropTypes.array.isRequired,
	currentUser: PropTypes.object,
};

export default createContainer(() => {
    Meteor.subscribe('books');
	Meteor.subscribe('profiles');
    return {
        profilesDisplay: [],
        books: Books.find({}).fetch(),
		profiles: Profiles.find({}).fetch(),
		currentUser: Meteor.user(),
	};
}, ProfileView);