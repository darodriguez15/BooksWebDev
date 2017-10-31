import React from "react";
import { shallow } from "enzyme";
import { chai } from "meteor/practicalmeteor:chai";
import Books from "./Books.jsx";


describe("Controls", () => {
  it("should render", () => {

    const books = shallow(<Books onMove={this.onMove}></Books>);
    chai.assert(controls.hasClass("Books"));
    chai.assert(controls.find("button").length, 4);
  });
});