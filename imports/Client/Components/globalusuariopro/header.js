import React, {Component} from "react";

export default class App extends Component
{
    render() {
        return (
            <div className="header">
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand navi" href="/user">Books</a>
                        </div>
                        <div id="navbar" className  ="navbar-collapse collapse">
                            <ul class="nav navbar-nav navbar-right">
                                <li><a href="/userBooks">Empecemos</a></li>
                            </ul>
                        </div>

                    </div>
                </nav>
            </div>
        );
    }
}