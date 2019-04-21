import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { EditEmployee } from './EditEmployee';
import { FetchEmployee } from './FetchEmployee';

export class EmployeeList extends Component {
    static displayName = EmployeeList.name;

    render() {
        return (
            <Switch>
                <Route exact path='/' Component={FetchEmployee} />
                <Route path='/employee' Component={EditEmployee} />
            </Switch>
        );
    }
}