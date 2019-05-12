import React, { Component } from 'react';
import api from './api';
import { GridPager } from './GridPager';




export class FetchEmployee extends Component {
    static displayName = FetchEmployee.name;

    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            loading: true,
            pageparam: {
                currentPage: 1,
                pageSize: 10,
                totalPages: 1,
                sortColumnName: 'name',
                sortOrder: 'asc'
            }
        };

        this.getData();
    }

    getData() {
        const requestOption = {
            method: 'GET',
            headers: api.jwtHeader()
        };
        let par = {
            pageNumber: this.state.pageparam.currentPage,
            pageSize: this.state.pageparam.pageSize,
            sortColumnName: this.state.pageparam.sortColumnName,
            sortOrder: this.state.pageparam.sortOrder
        }
        let query = 'api/Employee/?' + this.objToQueryString(par);

        fetch(query, requestOption)
            .then((response) => {
                if (response.status !== 200) {
                    //console.log(response);
                    throw new Error(response.status);
                }
                let pageparam = JSON.parse(response.headers.get('PageParam-Header'));
                this.setState({ pageparam });
                //console.log(this.state.pageparam);
                return response;
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ employees: data, loading: false });
            })
            .catch((error) => {
                console.log('error: ' + error);
                if (error === 'Error: 401') {
                    console.log('401 ERROR!!!!!');
                    sessionStorage.removeItem('accessToken');
                    this.props.history.push('/');
                }
            });
    }

    objToQueryString(obj) {
        const keyValuePairs = [];
        for (const key in obj) {
            keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
        return keyValuePairs.join('&');
    }

    goEdit(id) {
        let path = '/employee/' + id;
        this.props.history.push(path);
    }

    sortChanged(sortColumnName){
        //console.log(sortColumnName);
        this.state.pageparam.sortColumnName = sortColumnName;
        this.state.pageparam.currentPage = 1;
        this.state.pageparam.sortOrder = this.state.pageparam.sortOrder == 'asc' ? 'desc' : 'asc';
        this.getData();
    }

    sortIcon(columnName) {
        if (this.state.pageparam.sortColumnName === columnName) {
            if (this.state.pageparam.sortOrder == 'asc') {
                return String.fromCharCode(9650);
            }
            else {
                return String.fromCharCode(9660);
            }
        }
    }

    deleteEmployee(id) {
        console.log('delete id - ' + id);
        const requestOption = {
            method: 'DELETE',
            headers: api.jwtHeader()
        };
        fetch('api/Employee/' + id, requestOption)
            .then((response) => {
                if (response.status !== 200) {
                    console.log(response);
                    throw new Error(response.status);
                }
                return response;
            })
            .then((response) => {
                return response.json();
            })
            .then((result) => {
                console.log(result);
                var tmp = this.state.employees.concat();
                var idx = tmp.findIndex(item => item.id === id);
                if (idx > -1) {
                    tmp.splice(idx, 1);
                    this.setState({ employees: tmp });
                }
            })
            .catch((error) => {
                console.log("error: " + error);
                if (error == "Error: 401") {
                    console.log("401 ERROR!!!!!");
                    sessionStorage.removeItem("accessToken");
                    let path = "/";
                    this.props.history.push(path);
                }
            });
    }

    pageChanged(pageNumber, e){
        e.preventDefault();
        this.state.pageparam.currentPage = pageNumber;
        this.getData();
    }

    

    static renderEmployeesTable(employees, main) {
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th onClick={() => main.sortChanged('name')} >
                            Имя <span>{main.sortIcon('name')}</span>
                        </th>
                        <th onClick={() => main.sortChanged('email')}>
                            Почта <span>{main.sortIcon('email')}</span>
                            </th>
                        <th onClick={() => main.sortChanged('birthday')}>
                            Дата рождения <span>{main.sortIcon('birthday')}</span>
                        </th>
                        <th onClick={() => main.sortChanged('salary')}>
                            Зарплата <span>{main.sortIcon('salary')}</span>
                        </th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee =>
                        <tr key={employee.id}>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{new Date(employee.birthday).toLocaleDateString()}</td>
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
                {/**/}
                <GridPager
                    pageparam={this.state.pageparam}
                    size={this.state.pageparam.totalPages}
                    
                    currentPage={this.state.pageparam.currentPage}
                    onPageChanged={this.pageChanged.bind(this)}
                />
            </div>
        );
    }
}