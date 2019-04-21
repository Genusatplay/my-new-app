import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export class EditEmployee extends Component {
    static displayName = EditEmployee.name;

    constructor(props) {
        super(props);
        this.state = { employees: [], loading: true };

        fetch('api/Employee')
            .then(response => response.json())
            .then(data => {
                this.setState({ employees: data, loading: false });
            });
    }

    static renderEmployeesTable(employees) {
        return (
            <table className='table table-striped'>
                <tr>
                    <td>Имя</td><td></td>
                    <td>Почта</td><td></td>
                    <td>Дата рождения</td><td></td>
                    <td>Зарплата</td><td></td>
                </tr>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Загрузка</em></p>
            : EditEmployee.renderEmployeesTable(this.state.employees);

        return (
            <div>
                <h1>Сотрудники</h1>
                <Link to='/'>
                    <button type="button" className="btn btn-info">Добавить сотрудника</button>
                </Link>
                {contents}
                <button type="button" className="btn btn-info">Добавить</button>
                <button type="button" className="btn btn-info">Отмена</button>
            </div>
        );
    }
}