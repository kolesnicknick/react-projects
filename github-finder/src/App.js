import React, {Component, Fragment} from 'react';
import './App.css';
import NavBar from "./components/layout/NavBar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import axios from 'axios';
import Search from "./components/users/Search";
import Clear from "./components/users/Clear";
import Alert from "./components/layout/Alert";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import About from "./components/pages/About";

class App extends Component {
    state = {
        repos: [],
        users: [],
        user: {},
        loading: false,
        alert: null
    };

    getUserRepos = async (username) => {
        this.setState({loading: true});

        const res = await axios
            .get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=
            ${process.env.REACT_APP_GITHUB_ID}&client_secret=
            ${process.env.REACT_APP_GITHUB_SECRET}`);

        this.setState({repos: res.data, loading: false});
    };

    getUser = async (username) => {
        this.setState({loading: true});

        const res = await axios
            .get(`https://api.github.com/users/${username}?client_id=
            ${process.env.REACT_APP_GITHUB_ID}&client_secret=
            ${process.env.REACT_APP_GITHUB_SECRET}`);

        this.setState({user: res.data, loading: false});
    };
    searchUsers = async (text) => {
        this.setState({loading: true});

        const res = await axios
            .get(`https://api.github.com/search/users?q=${text}&client_id=
            ${process.env.REACT_APP_GITHUB_ID}&client_secret=
            ${process.env.REACT_APP_GITHUB_SECRET}`);

        this.setState({users: res.data.items, loading: false});
    };

    clearUsers = () => {
        this.setState({users: []});
    };

    setAlert = (msg, type) => {
        this.setState({alert: {msg: msg, type: type}});

        setTimeout(() => {
            this.setState({alert: null})
        }, 3000)
    };

    render() {
        const {user, users, loading, repos} = this.state;
        return (
            <div className="App">

                <Router>
                    <NavBar title="Github Finder" icon="fa fa-github"/>
                    <div className="container">

                        <Switch>

                            <Route exact path='/' render={props => (

                                <Fragment>
                                    <Alert alert={this.state.alert}/>
                                    <Search searchUsers={this.searchUsers}
                                            setAlert={this.setAlert}/>

                                    <Clear clearUsers={this.clearUsers} showClear={users.length > 0}/>

                                    <Users loading={loading} users={users}/>
                                </Fragment>

                            )}>
                            </Route>
                            <Route exact path={'/about'} component={About}/>
                            <Route exact path={'/user/:login'} render={props => (
                                <User {...props}
                                      getUser={this.getUser}
                                      user={user}
                                      getUserRepos={this.getUserRepos}
                                      repos={repos}
                                      loading={loading}
                                />
                            )}/>
                        </Switch>
                    </div>

                </Router>
            </div>
        );
    }
}

export default App;
