import React, {Component} from "react";
import classes from "./Layout.module.css";
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";
import {AUTH} from "../../store/reducers/types";
import {connect} from "react-redux";

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
                    isAuthenticated={this.props.isAuthenticated}
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

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state[AUTH].token
    }
}

export default connect(mapStateToProps)(Layout);
