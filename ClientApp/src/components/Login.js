import React, { Component } from 'react';
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import AppBar from 'material-ui/AppBar';
//import RaisedButton from 'material-ui/RaisedButton';
//import TextField from 'material-ui/TextField';
import './Login.css';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: ""
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({ error: "" });
        //console.log("submit!");

        var fd = new FormData();
        fd.append('password', this.state.username);
        fd.append('username', this.state.password);

        fetch('api/Authentication', { method: 'POST', body: fd })
            .then((response) => {
                if (response.status == 401) {
                    console.log(response.text()
                        .then((text) => {
                            console.log(text);
                            //this.setState({ error: text }); //eng response
                            this.setState({ error: "Неверные имя пользователя или пароль" });
                        }));
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((res) => { return res.json(); })
            .then((json) => {
                //console.log(json.access_token);
                sessionStorage.setItem("accessToken", json.access_token);
                this.props.history.push("/");
                //console.log("go home");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        let error = this.state.error !== ""
            ? <label className="errLbl"> {this.state.error}</label>
            : "";
        return (
            <div className="mainDiv">
                {error}
                <form
                    action='api/Authentication'
                    method='POST'
                    onSubmit={this.onSubmit}
                >
                    <div className="form-goup">
                        <label htmlFor="username"><b>Пользователь</b></label>
                        <input
                            type="text"
                            placeholder="Введите имя пользователя"
                            name="username" required
                            onChange={this.onChange}
                            className="form-control"
                        />
                    </div>

                    <div className="form-goup">
                        <label htmlFor="password"><b>Пароль</b></label>
                        <input
                            type="password"
                            placeholder="Введите пароль"
                            name="password" required
                            onChange={this.onChange}
                            className="form-control"
                        />
                    </div>
                    <div className="btn-group btn-group-sm loginBtn">
                        <button type="submit" className="btn btn-success">Войти</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;