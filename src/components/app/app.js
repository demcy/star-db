import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import {
    PeoplePage,
    PlanetsPage,
    StarshipsPage,
    LoginPage,
    SecretPage
} from '../pages';
import ErrorBoundry from "../error-boundry";
import { SwapiServiceProvider } from '../swapi-service-context';
import SwapiService from '../../services/swapi-service';

import './app.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StarshipDetails } from '../sw-components';



export default class App extends Component {

    swapiService = new SwapiService();

    state = {
        selectedPerson: null,
        isLoggedIn: false
    };

    onLogin = () => {
        this.setState({
            isLoggedIn: true
        })
    }

    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id
        });
    };

    render() {
        const { isLoggedIn } = this.state
        return (
            <main role="main" className="container">
            <ErrorBoundry>
                <SwapiServiceProvider value={this.swapiService}>
                    <Router>
                        <div className="stardb-app">
                            <Header />
                            <RandomPlanet />
                            <Switch>
                            <Route path='/' render={() => <h2>Welcome to StarDB</h2>} exact />
                            <Route path='/people/:id?' component={PeoplePage} />
                            <Route path='/planets' component={PlanetsPage} />
                            <Route path='/starships' exact component={StarshipsPage} />
                            <Route path='/starships/:id' render={({ match }) => {
                                const { id } = match.params
                                return <StarshipDetails itemId={id} />
                            }} />
                            <Route
                                path='/login'
                                render={() => (
                                    <LoginPage
                                        isLoggedIn={isLoggedIn}
                                        onLogin={this.onLogin} />
                                )} />
                            <Route path='/secret' render={() => (<SecretPage isLoggedIn={isLoggedIn} />)} />
                            <Route render={() => <h2>Page not found</h2>} />
                            </Switch>
                        </div>
                    </Router> 
                </SwapiServiceProvider>
            </ErrorBoundry>
            </main>
        );
    }
}