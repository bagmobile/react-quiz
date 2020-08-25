import React, {Component} from "react";
import classes from "./Drawer.module.css"
import Backdrop from "../../UI/Backdrop/Backdrop";

const links = [1, 2, 3];

class Drawer extends Component {

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

    renderLinks() {

        return links.map((item, index) => {
            return (<li key={index}><a href={`/`}>Item{item}</a></li>);
        });
    }
}

export default Drawer;