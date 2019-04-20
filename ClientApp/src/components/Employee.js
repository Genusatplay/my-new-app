import React, { Component } from 'react';

export class Employee extends Component {
    static displayName = Employee.name;

    render() {
        return (
            <div>
                <code>name, email, birthday, salary</code>
                <table>
                    <tr><td>Имя</td><td>значение</td></tr>
                    <tr><td>Почта</td><td>значение</td></tr>
                    <tr><td>Дата рождения</td><td>значение</td></tr>
                    <tr><td>Зарплата</td><td>значение</td></tr>
                </table>
            </div>
        );
    }
}