import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export class FetchEmployee extends Component {
    static displayName = FetchEmployee.name;

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
                <thead>
                    <tr>
                        <td>Имя</td>
                        <td>Почта</td>
                        <td>Дата рождения</td>
                        <td>Зарплата</td>
                        <td>Действия</td>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee =>
                        <tr key={employee.id}>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{new Date(employee.birthday + 'Z').toLocaleString()}</td>
                            <td>{employee.salary}</td>
                            <td>Удалить / Редактировать</td>
                        </tr>
                    )}
                </tbody>
            </table>
            );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Загрузка</em></p>
            : FetchEmployee.renderEmployeesTable(this.state.employees);

        return (
            <div>
                <Link to='/'>
                    <button type="button" className="btn btn-info">Добавить сотрудника</button>
                </Link>
                {contents}
            </div>
        );
    }
}