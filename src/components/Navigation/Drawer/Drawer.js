import React, {Component} from "react";
import classes from "./Drawer.module.css"
import Backdrop from "../../UI/Backdrop/Backdrop";
import {NavLink} from "react-router-dom";

const links = [
    {to: `/`, label: `List of Quiz`, exact: true},
    {to: `/auth`, label: `Auth`, exact: false},
    {to: `/quiz-creator`, label: `Quiz creator`, exact: false}
    ];

class Drawer extends Component {

    renderLinks() {

        return links.map((item, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={item.to}
                        exact={item.exact}
                        activeClassName={classes.active}
                        onClick={this.props.onMenuClose}
                    >{item.label}</NavLink>
                </li>
            );
        });
    }

    render() {
        const cls = [classes.Drawer];

        if (!this.props.isOpen) {
            cls.push(classes.close);
        }
        return (
            <>
                <Backdrop isOpen={this.props.isOpen} onClick={this.props.onMenuClose}/>
                <nav className={cls.join(` `)}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
            </>
        );
    }
}

export default Drawer;