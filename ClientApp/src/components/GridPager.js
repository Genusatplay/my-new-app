import React, { Component } from 'react';

export class GridPager extends Component { 

    render() {
        let li = [];
        let pageCount = this.props.size;
        li.push(
            <li key='-1'
                className={"page-item " + (this.props.pageparam.previousPage ? "" : "disabled")} >
                <a
                    href="#/"
                    className="page-link"
                    onClick={this.props.onPageChanged.bind(null, this.props.pageparam.currentPage - 1)}
                >&#8592; Сюда</a>
            </li>);
        for (var i = 1; i <= pageCount; i++) {
            if (this.props.currentPage === i) {
                li.push(
                    <li key={i} className="page-item active">
                        <a href="#/" className="page-link">{i}</a>
                    </li>
                );
            }
            else {
                li.push(
                    <li key={i} className="page-item">
                        <a
                            href="#/"
                            className="page-link"
                            onClick={this.props.onPageChanged.bind(null, i)}
                        >{i}</a>
                    </li>
                );
            }
        }
        li.push(
            <li key='+1'
                className={"page-item " + (this.props.pageparam.nextPage ? "" : "disabled")}>
                <a
                    href="#/"
                    className="page-link"
                    onClick={this.props.onPageChanged.bind(null, this.props.pageparam.currentPage+1)}
                >Туда &#8594;</a>
            </li>);
        return (<ul className="pagination justify-content-center">{li}</ul>);
    }
};