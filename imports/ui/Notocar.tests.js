/* eslint-env mocha */

import { Meteor } from "meteor/meteor";
import { assert } from "meteor/practicalmeteor:chai";
import { resetDatabase } from "meteor/xolvio:cleaner";
import { Factory } from "meteor/dburles:factory";
import { sinon } from 'meteor/practicalmeteor:sinon';
import { Books } from "../api/books";
import faker from "faker";

if (Meteor.isServer) {
    describe("Players", () => {
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

            
        });
    });
}