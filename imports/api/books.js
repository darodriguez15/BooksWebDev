import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';


export const Books = new Mongo.Collection('books');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('books', function tasksPublication() {
        return Books.find();
    });
}

Meteor.methods({
    'books.insert'(text) {
        check(text, String);

        // Make sure the user is logged in before inserting a task
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Books.insert({
                imagen: "https://d30y9cdsu7xlg0.cloudfront.net/png/3688-200.png",
                text,
                privado:false,
                genero: "",
                idioma: "",
                colaboradores:"",
                texto: "",
                likes: 0,
                dislikes: 0,
                comments: "",
                mG: "hidden",
                mL: "hidden",
                mI: "hidden",
                busquedaH: "",
                botonBusqueda: "hidden",
                owner: Meteor.userId(),           // _id of logged in user
                username: Meteor.user().username,  // username of logged in user
        });
    },
    'books.remove'(bookId) {
        check(bookId, String);

        Books.remove(bookId);
    },
    'books.addColaborador'(bookId, textvi, text) {
        nText = (textvi + " " + text);
        Books.update(bookId, {
            $set: { colaboradores: nText , privado:true },
        });
    },

    'books.setChecked'(bookId, setChecked) {
        check(bookId, String);
        check(setChecked, Boolean);

        Books.update(bookId, { $set: { checked: setChecked } });
    },
    'books.editarGenre'(bookId, text) {
        check(bookId, String);
        Books.update(bookId, {
            $set: {
                genero: text,
                mG: "hidden"
            }
        });
    },
    'books.mostrarGenero'(bookId) {
        check(bookId, String);
        Books.update(bookId, {
            $set: { mG: "" }
        });
    },
    'books.salirBusqueda'(bookId) {
        Books.update(bookId, {
            $set: { busquedaH: "hidden" },
        });
    },
    'books.mostrarIdioma'(bookId) {
        Books.update(bookId, {
            $set: { mL: "" },
        });
    },
    'books.editarLan'(bookId, text) {
        Books.update(bookId, {
            $set: {
                idioma: text,
                mL: "hidden"
            },
        });
    },
    'books.editarStory'(bookId, textvi, text) {
        nText = (textvi + " " + text);
        Books.update(bookId, {
            $set: { texto: nText },
        });
    },
    'books.darLike'(bookId, likes, nLikes ) {
        Books.update(bookId, {
             $set: { likes: nLikes },
         });
    },
    'books.darDislike'(bookId, dLikes, nDlikes) {
        Books.update(bookId, {
                $set: { dislikes: nDlikes },
            });
        
    },
    'books.addComment'(bookId, nText) {
        Books.update(bookId, {
            $set: { comments: nText },
        });
    },
    'books.cambiarImagen'(bookId, text) {
        Books.update(bookId, {
            $set: {
                imagen: text,
                mI: "hidden"
            },
        });
    },
    'books.mostrarImagen'(bookId) {
        Books.update(bookId, {
            $set: { mI: "" },
        });
    },
    'books.paila'(bookId) {
        Books.update(bookId, {
            $set: {
                busquedaH: "",
                botonBusqueda: "hidden"
            },
        });
    },
    'books.fore'(bookId) {
        Books.update(bookId, {
            $set: {
                busquedaH: "hidden"
            },
        });
    },
    'books.fore2'(bookId) {
        Books.update(bookId, {
            $set: {
                busquedaH: "",
                botonBusqueda: ""
            },
        });
    }
});