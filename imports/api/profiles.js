import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';


export const Profiles = new Mongo.Collection('profiles');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('profiles', function tasksProPublication() {
        return Profiles.find();
    });
}

Meteor.methods({
    'profiles.insert'(text) {
        check(text, String);

        // Make sure the user is logged in before inserting a task
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Profiles.insert({
            imagen: "https://cdn0.iconfinder.com/data/icons/education-15/500/reader-512.png",
            text,
            privado: false,
            apellido: "",
            nombre: "",
            mG: "hidden",
            mL: "hidden",
            mI: "hidden",
            busquedaH: "",
            usuarioBuscado: "",
            botonBusqueda: "hidden",
            idProfile: Meteor.userId(),           // _id of logged in user
            username: Meteor.user().username,  // username of logged in user
        });
    },
    'profiles.remove'(profileId) {
        check(profileId, String);

        Profiles.remove(profileId);
    },
    'profiles.addColaborador'(profileId, textvi, text) {
        nText = (textvi + " " + text);
        Profiles.update(profileId, {
            $set: { colaboradores: nText, privado: true },
        });
    },
    'profiles.setChecked'(profileId, setChecked) {
        check(profileId, String);
        check(setChecked, Boolean);

        Profiles.update(profileId, { $set: { checked: setChecked } });
    },
    'profiles.editarGenre'(profileId, text) {
        check(profileId, String);
        Profiles.update(profileId, {
            $set: {
                apellido: text,
                mG: "hidden"
            }
        });
    },
    'profiles.mostrarGenero'(profileId) {
        check(profileId, String);
        Profiles.update(profileId, {
            $set: { mG: "" }
        });
    },
    'profiles.salirBusqueda'(profileId) {
        Profiles.update(profileId, {
            $set: { busquedaH: "hidden" },
        });
    },
    'profiles.buscado'(profileId, text) {
        Profiles.update(profileId, {
            $set: { usuarioBuscado: text },
        });
    },
    'profiles.mostrarIdioma'(profileId) {
        Profiles.update(profileId, {
            $set: { mL: "" },
        });
    },
    'profiles.editarLan'(profileId, text) {
        Profiles.update(profileId, {
            $set: {
                nickname: text,
                mL: "hidden"
            },
        });
    },
    'profiles.editarStory'(profileId, textvi, text) {
        nText = (textvi + " " + text);
        Profiles.update(profileId, {
            $set: { texto: nText },
        });
    },
    'profiles.cambiarImagen'(profileId, text) {
        Profiles.update(profileId, {
            $set: {
                imagen: text,
                mI: "hidden"
            },
        });
    },
    'profiles.mostrarImagen'(profileId) {
        Profiles.update(profileId, {
            $set: { mI: "" },
        });
    },
    'profiles.paila'(profileId) {
        Profiles.update(profileId, {
            $set: {
                busquedaH: "",
                botonBusqueda: "hidden"
            },
        });
    },
    'profiles.fore'(profileId) {
        Profiles.update(profileId, {
            $set: {
                busquedaH: "hidden"
            },
        });
    },
    'profiles.fore2'(profileId) {
        Profiles.update(profileId, {
            $set: {
                busquedaH: "",
                botonBusqueda: ""
            },
        });
    }
});