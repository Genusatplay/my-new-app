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
            password: ''
        }
    }
    render() {
        return (
            <div>
                <label for="uname"><b>Username</b></label>
                <input type="text" placeholder="Enter Username" name="uname" required/>

                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="upwd" required/>

                <button type="submit">Login</button>
            </div>
        );
    }
}
const style = {
    margin: 15,
    
};
export default Login;