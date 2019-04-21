import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export class EditEmployee extends Component {
    static displayName = EditEmployee.name;

    constructor(props) {
        super(props);
        this.state = {
            employee: {}, loading: true
        };
        this.number = parseInt(props.match.params.number, 10)
        if (!Number.isNaN(this.number)) {
            fetch('api/Employee/' + props.match.params.number)
                .then(response => response.json())
                .then(data => {
                    this.setState({ employee: data, loading: false });
                });
        }
        else {
            this.state.loading = false;
        }
    }

    static renderEmployeesTable(employee) {
        return (
            <form>
                <label>
                    Имя:
                    <input type="text" value={employee.name} />
                </label>
                <br/>
                <label>
                    Почта:
                    <input type="text" value={employee.email} />
                </label>
                <br/>
                <label>
                    Дата рождения:
                    <input type="text" value={employee.birthday} />
                </label>
                <br/>
                <label>
                    Зарплата:
                    <input type="text" value={employee.salary} />
                </label>
            </form>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Загрузка</em></p>
            : EditEmployee.renderEmployeesTable(this.state.employee);

        return (
            <div>
                {contents}
                <div className="btn-group btn-group-sm">
                    <button type="button" className="btn btn-success">Сохранить</button>
                    <Link to='/'>
                    <button type="button" className="btn btn-success">Отмена</button>
                    </Link>
                </div>
            </div>
        );
    }
}