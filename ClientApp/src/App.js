import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { FetchEmployee } from './components/FetchEmployee';
import { EditEmployee } from './components/EditEmployee';
import { Login } from './components/Login';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <Layout>
            <Switch>
                <Route exact path='/' component={FetchEmployee} />
                <Route exact path='/employee' component={EditEmployee} />
                <Route path='/employee/:number' component={EditEmployee} />
                <Route path='/home' component={Home} />
                <Route path='/counter' component={Counter} />
                <Route path='/fetch-data' component={FetchData} />
                <Route path='/login' component={Login} />
            </Switch>
      </Layout>
    );
  }
}
