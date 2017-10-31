import { Meteor } from "meteor/meteor";
import { assert } from "meteor/practicalmeteor:chai";
import { resetDatabase } from "meteor/xolvio:cleaner";
import { Factory } from "meteor/dburles:factory";
import { sinon } from 'meteor/practicalmeteor:sinon';
import { Books } from "./books.js";
import faker  from "faker";

if (Meteor.isServer) {
  describe("books", () => {
    describe("methods", () => {
      // Generate a random name
      const name = faker.name.findName();
      let currentUser;
      beforeEach(() => {
        Books.remove({});

        // Stud the user
        resetDatabase();
        Factory.define("user", Meteor.users, {
          username: name,
        });
        currentUser = Factory.create("user");
        sinon.stub(Meteor, "user");
        Meteor.user.returns(currentUser);

        Books.insert({
          name: name,
          x: 10,
          y: 10
        });
      });

      afterEach(() => {
        Meteor.user.restore();
        resetDatabase();
      });

      it("can comment on book", () => {

        const updateBook = Meteor.server.method_handlers["books.addComment"];

        // Set up a fake method invocation that looks like what the method expects
        const invocation = { currentUser };
		let newBook = Books.findOne({name:name});
        // Run the method with `this` set to the fake invocation
        updateBook.apply(invocation, [newBook._id]);

        assert.equal(Books.find().count(), 0);

      });
    });
  });
}