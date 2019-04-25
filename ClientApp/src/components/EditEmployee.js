import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export class EditEmployee extends Component {
    static displayName = EditEmployee.name;

    constructor(props) {
        super(props);
        this.state = {
            employee: {},
            loading: true,
            id: NaN
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSalaryChange = this.handleSalaryChange.bind(this);
        this.handleBirthdayChange = this.handleBirthdayChange.bind(this);
        this.handleSave = this.handleSave.bind(this);

        var number = parseInt(props.match.params.number, 10)
        if (!Number.isNaN(number)) {
            fetch('api/Employee/' + props.match.params.number)
                .then(response => response.json())
                .then(data => {
                    if (Number.isInteger(data.id)) {
                        this.setState({ id: data.id })
                    }
                    data.birthday = new Date(data.birthday);
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
                <label>Имя:</label>
                <input type="text" value={employee.name} />
                <label>Эл. почта:</label>
                <input type="text" value={employee.email} />
                <label>Дата рождения:</label>
                <input type="text" value={employee.birthday} />
                <label>Зарплата:</label>
                <input type="text" value={employee.salary} />
            </form>
        );
    }

    handleNameChange(e) {
        var empl = this.state.employee;
        empl.name = e.target.value;
        this.setState({ employee: empl }); 
    }

    handleEmailChange(e) {
        var empl = this.state.employee;
        empl.email = e.target.value;
        this.setState({ employee : empl });
    }

    handleBirthdayChange(e) {
        var empl = this.state.employee;
        empl.birthday = new Date(e.target.value);
        this.setState({ employee: empl });
    }

    handleSalaryChange(e) {
        var empl = this.state.employee;
        empl.salary = e.target.value;
        this.setState({ employee: empl });
    }

    goHome() {
        let path = '/';
        this.props.history.push(path);
    }

    handleSave(e) {
        if (isNaN(this.state.id)) {
            console.log('insert');

            var tmp = {
                "birthday": this.state.employee.birthday.toISOString().slice(0, 19) + 'Z',
                "salary": this.state.employee.salary,
                "name": this.state.employee.name,
                "email": this.state.employee.email
            };
            this.state.employee.birthday = this.state.employee.birthday.toISOString().slice(0, 19) + 'Z';

            const requestOption = {
                method: 'POST',
                body: JSON.stringify(tmp),
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                }
            };
            fetch('api/Employee', requestOption).then((response) => {
                return response.json();
            }).then((result => {
                console.log(result);
                if ('id' in result) {
                    this.goHome();
                }
            }));
        }
        else {
            console.log('update');

            var tmp = {
                "id": this.state.employee.id,
                "birthday": this.state.employee.birthday.toISOString().slice(0, 19) + 'Z',
                "salary": this.state.employee.salary,
                "name": this.state.employee.name,
                "email": this.state.employee.email
            };
            console.log(JSON.stringify(tmp));

            const requestOption = {
                method: 'PUT',
                body: JSON.stringify(tmp),
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                }
            };
            fetch('api/Employee/' + tmp.id, requestOption).then((response) => {
                console.log(response);
                if (response.status >= 200 && response.status < 300) {
                    this.goHome();
                }
                else {
                    var error = new Error(response.statusText)
                    error.response = response
                    throw error
                }
            });
        }
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Загрузка</em></p>
            : EditEmployee.renderEmployeesTable(this.state.employee);

        return (
            <div>
                {/* {contents} */}
                <form className="form-group">
                    <label>Имя:</label>
                    <input type="text" value={this.state.employee.name} onChange={this.handleNameChange} />
                    <label>Эл. почта:</label>
                    <input type="text" value={this.state.employee.email} onChange={this.handleEmailChange} />
                    <label>Дата рождения:</label>
                    <input type="text" value={this.state.employee.birthday} onChange={this.handleBirthdayChange} />
                    <label>Зарплата:</label>
                    <input type="text" value={this.state.employee.salary} onChange={this.handleSalaryChange} />
                </form>
                <div className="btn-group btn-group-sm">
                    <button type="button" className="btn btn-success" onClick={this.handleSave} > Сохранить</button>
                    <Link to='/'>
                    <button type="button" className="btn btn-success">Отмена</button>
                    </Link>
                </div>
            </div>
        );
    }
}