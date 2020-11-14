import React from 'react';
import Layout from "./hoc/Layout/Layout";
import Quiz from "./containers/Quiz/Quiz";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizList from "./containers/QuizList/QuizList";
import {AUTH} from "./store/reducers/types";
import {connect} from "react-redux";
import Logout from "./components/Logout/Logout";
import {autoLogin} from "./store/actions/auth";


class App extends React.Component{

    componentDidMount() {
        this.props.autoLogin();
    }

    render() {
        console.log(this.props);
        return (
            <Layout>
                <Switch>
                    {!this.props.isAuthenticated && <Route path={`/auth`} component={Auth}/>}
                    {this.props.isAuthenticated && <Route path={`/quiz-creator`} component={QuizCreator}/>}
                    <Route path={`/quiz/:id`} component={Quiz}/>
                    <Route path={`/`} component={QuizList} exact/>
                    {this.props.isAuthenticated && <Route path={`/logout`} component={Logout}/> }
                    <Redirect to={`/`}/>
                </Switch>
            </Layout>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state[AUTH].token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        autoLogin: () => dispatch(autoLogin())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
