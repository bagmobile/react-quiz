import React, {Component} from "react";
import classes from "./Drawer.module.css"
import Backdrop from "../../UI/Backdrop/Backdrop";
import {NavLink} from "react-router-dom";

class Drawer extends Component {

    renderLinks(links) {

        return links.map((item, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={item.to}
                        exact={item.exact}
                        activeClassName={classes.active}
                        onClick={this.props.onMenuClose}
                    >{item.label}
                    </NavLink>
                </li>
            );
        });
    }

    render() {
        const cls = [classes.Drawer];
        let links = [
            {to: `/`, label: `List of Quiz`, exact: true}
        ];

        if(this.props.isAuthenticated){
            links.push(
                {to: `/quiz-creator`, label: `Quiz creator`, exact: false},
                {to: `/logout`, label: `Log Out`, exact: false}
            );
        } else {
           links.push( {to: `/auth`, label: `Log In`, exact: false})
        }

        if (!this.props.isOpen) {
            cls.push(classes.close);
        }
        return (
            <>
                <Backdrop isOpen={this.props.isOpen} onClick={this.props.onMenuClose}/>
                <nav className={cls.join(` `)}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
            </>
        );
    }
}

export default Drawer;
