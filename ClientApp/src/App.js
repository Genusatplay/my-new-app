import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { Layout } from './components/Layout';
import { FetchEmployee } from './components/FetchEmployee';
import { EditEmployee } from './components/EditEmployee';
import { Login } from './components/Login';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            sessionStorage.getItem("accessToken") ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/login"
                        }}
                    />
                )
        }
    />
);

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Switch>
                <Route path='/login' component={Login} />
                <Layout>
                    <Switch>
                        <PrivateRoute exact path='/' component={FetchEmployee} />
                        <PrivateRoute exact path='/employee' component={EditEmployee} />
                        <PrivateRoute path='/employee/:number' component={EditEmployee} />
                        <Route path='*' render={() => (
                            sessionStorage.getItem("accessToken")
                                ? (<Redirect to="/" />)
                                : (<Redirect to="/login"/> )
                        )} />
                    </Switch>
                </Layout>
            </Switch>
        );
    }
}
