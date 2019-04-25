import React, { Component } from 'react';

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

    goEdit(id) {
        let path = '/employee/' + id;
        this.props.history.push(path);
    }

    deleteEmployee(id) {
        console.log('delete id - ' + id);
        const requestOption = { method: 'DELETE' };
        fetch('api/Employee/' + id, requestOption).then((response) => {
            return response.json();
        }).then((result) => {
            console.log(result);
            var tmp = this.state.employees.concat();
            var idx = tmp.findIndex(item => item.id === id);
            if (idx > -1) {
                tmp.splice(idx, 1);
                this.setState({ employees: tmp });
            }
        });
    }

    static renderEmployeesTable(employees, main) {
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
                            <td>{new Date(employee.birthday).toLocaleString()}</td>
                            <td>{employee.salary}</td>
                            <td>
                                <div className="btn-group btn-group-sm">
                                    <button onClick={() => main.deleteEmployee(employee.id)} className="btn btn-success">Удалить</button>
                                    <button onClick={() => main.goEdit(employee.id)} className="btn btn-success">Редактировать</button>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Загрузка</em></p>
            : FetchEmployee.renderEmployeesTable(this.state.employees, this);
        
        return (
            <div>
                {contents}
            </div>
        );
    }
}