import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const errorStyle = { border: '2px solid red' };
    
export class EditEmployee extends Component {
    static displayName = EditEmployee.name;

    constructor(props) {
        super(props);
        this.state = {
            employee: {},
            loading: true,
            id: NaN,
            date: '',
            nameValid: false,
            emailValid: false,
            dateValid: false,
            salaryValid: false,
            formValid: false
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
                    this.setState({
                        employee: data,
                        loading: false,
                        nameValid: true,
                        emailValid: true,
                        dateValid: true,
                        salaryValid: true,
                        formValid: true
                    });
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
        if (empl.name) {
            this.state.nameValid = true;
        //    this.setState({ nameValid: true });
        //    console.log('name valid');
        }
        else {
            this.state.nameValid = false;
        //    this.setState({ nameValid: false });
        //    console.log('name not valid');
        }
        //this.state.nameValid = !empl.name === "";
        this.validateForm();
    }

    handleEmailChange(e) {
        //console.log(e.target.value);
        var empl = this.state.employee;
        empl.email = e.target.value;
        this.setState({ employee: empl });
        if (e.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        //    this.setState({ emailValid: true });
            this.state.emailValid = true;
        }
        else {
            this.state.emailValid = false;
        //    this.setState({ emailValid: false });
        }
        this.validateForm();
    }

    handleBirthdayChange(date) {
        //console.log(date);
        var empl = this.state.employee;
        empl.birthday = date
        this.setState({ employee: empl });

        this.state.dateValid = this.isValidDate(date);
        this.validateForm();
    }

    isValidDate(d) {
        return d instanceof Date && !isNaN(d);
    }
    validateForm() {
        //console.log("name = " + this.state.nameValid);
        //console.log("email = " + this.state.emailValid);
        //console.log("date = " + this.state.dateValid);
        //console.log("salary = " + this.state.salaryValid);
        this.setState({
            formValid:
                this.state.nameValid &
                this.state.emailValid &
                this.state.dateValid &
                this.state.salaryValid
        });
    }

    handleSalaryChange(e) {
        var empl = this.state.employee;
        empl.salary = e.target.value;
        this.setState({ employee: empl });
        this.state.salaryValid = !isNaN(empl.salary);
        this.validateForm();
    }

    goHome() {
        let path = '/';
        this.props.history.push(path);
    }

    handleSave(e) {
        if (!this.state.nameValid ||
            !this.state.emailValid ||
            !this.state.dateValid ||
            !this.state.salaryValid) {
            this.setState({ formValid: false });
            return;
        }

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

        let nameV = this.state.nameValid
            ? ""
            : <p style={errorStyle} > Укажите имя</ p>;

        let emailV = !this.state.emailValid && this.state.employee.email
            ? <small id="emailHelp" class="form-text text-muted">Некорректный адрес.</small>
            : "";
        let salaryV = !this.state.salaryValid && this.state.employee.salary
            ? <small id="emailHelp" class="form-text text-muted">Некорректное значение.</small>
            : "";
        let formV = this.state.formValid
            ? ""
            : <small id="emailHelp" class="form-text text-muted">Форма не заполнена.</small>

        return (
            <div>
                {/* {contents} */}
                <form>
                    <div className="form-goup">
                        <label>Имя:</label>
                        <input type="email" class="form-control"
                            aria-describedby="nameHelp" placeholder="Введите имя сотрудника"
                            value={this.state.employee.name}
                            onChange={this.handleNameChange}
                        />
                    </div>
                    <br/>
                    <div className="form-goup">
                        <label>Эл. почта:</label>
                        <input type="email" class="form-control" id="exampleInputEmail1"
                            aria-describedby="emailHelp" placeholder="Введите адрес эл. почты."
                            value={this.state.employee.email} onChange={this.handleEmailChange}
                        />
                        {emailV}
                    </div>
                    <br/>
                    <div className="form-goup">
                        <label>Дата рождения:</label>
                        <br/>
                        <DatePicker 
                            className="form-control"
                            value={this.state.employee.birthday}
                            selected={this.state.employee.birthday}
                            onChange={this.handleBirthdayChange}
                            />
                    </div>
                    <br/>
                    <div className="form-goup">
                        <label>Зарплата:</label>
                        <input type="text"
                            class="form-control" aria-describedby="emailHelp"
                            value={this.state.employee.salary} onChange={this.handleSalaryChange} />
                        {salaryV}
                    </div>
                    <br/>
                </form>
                <div className="btn-group btn-group-sm">
                    <button type="button" className="btn btn-success" onClick={this.handleSave}
                        disabled={!this.state.formValid}
                    > Сохранить</button>
                    <Link to='/'>
                    <button type="button" className="btn btn-success">Отмена</button>
                    </Link>
                </div>
                {formV}
            </div>
        );
    }
}