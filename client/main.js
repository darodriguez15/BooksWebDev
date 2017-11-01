import React, {Component} from "react";
import {Meteor} from "meteor/meteor";
import { render } from "react-dom";
import '../imports/startup/accounts-config.js';
import {renderRoutes} from "../imports/Client/routes";

Meteor.startup(() => {
    $('html').attr('lang','es');
    render(renderRoutes(), document.getElementById('target'));
});
