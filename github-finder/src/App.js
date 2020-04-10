import React, {Fragment, useState} from 'react';
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

const App = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);


    const getUserRepos = async (username) => {
        setLoading(true);
        const res = await axios
            .get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=
            ${process.env.REACT_APP_GITHUB_ID}&client_secret=
            ${process.env.REACT_APP_GITHUB_SECRET}`);

        setRepos(res.data);
        setLoading(false);
    };

    const getUser = async (username) => {
        setLoading(true);

        const res = await axios
            .get(`https://api.github.com/users/${username}?client_id=
            ${process.env.REACT_APP_GITHUB_ID}&client_secret=
            ${process.env.REACT_APP_GITHUB_SECRET}`);

        setUser(res.data);
        setLoading(false);

    };

    const searchUsers = async (text) => {
        setLoading(false);

        const res = await axios
            .get(`https://api.github.com/search/users?q=${text}&client_id=
            ${process.env.REACT_APP_GITHUB_ID}&client_secret=
            ${process.env.REACT_APP_GITHUB_SECRET}`);

        setUsers(res.data.items);
        setLoading(false);

    };

    const clearUsers = () => {
        setUsers([]);
    };

    const showAlert = (msg, type) => {
        setAlert({msg: msg, type: type});

        setTimeout(() => {
            setAlert(null);
        }, 3000)
    };

    return (
        <div className="App">

            <Router>
                <NavBar title="Github Finder" icon="fa fa-github"/>
                <div className="container">

                    <Switch>

                        <Route exact path='/' render={props => (

                            <Fragment>
                                <Alert alert={alert}/>
                                <Search searchUsers={searchUsers}
                                        showAlert={showAlert}/>

                                <Clear clearUsers={clearUsers} showClear={users.length > 0}/>

                                <Users loading={loading} users={users}/>
                            </Fragment>

                        )}>
                        </Route>
                        <Route exact path={'/about'} component={About}/>
                        <Route exact path={'/user/:login'} render={props => (
                            <User {...props}
                                  getUser={getUser}
                                  user={user}
                                  getUserRepos={getUserRepos}
                                  repos={repos}
                                  loading={loading}
                            />
                        )}/>
                    </Switch>
                </div>

            </Router>
        </div>
    );
};

export default App;
