import React, {Component} from "react";
import classes from "./Layout.module.css";
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";

class Layout extends Component {

    state = {
        menu: false
    }

    handleMenuToggle = () => {
        this.setState({menu: !this.state.menu})
    }

    handleMenuClose = () => {
        this.setState({menu: false})
    }

    render() {

        return (
            <div className={classes.Layout}>
                <Drawer
                    isOpen={this.state.menu}
                    onMenuClose={this.handleMenuClose}
                />

                <MenuToggle
                    isOpen={this.state.menu}
                    onToggle={this.handleMenuToggle}
                />


                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default Layout;