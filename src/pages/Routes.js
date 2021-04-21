import React from 'react';
import {
    withRouter,
    Switch,
    Route,
} from "react-router-dom";
import AccountBox from '../pages/AccountBox/AccountBox';
import Home from '../pages/Home/Home';
import Link from "../pages/Link/Link";
import UserPage from "../pages/UserPage/UserPage";
import queryString from 'query-string';
import api from '../util/api';

function Routes(props) {
    const checkConfirm = () =>{
        let params = queryString.parse(props.location.search)
        api.putConfirmProfile(params.userId, params.token).then(
            (res) => console.log(res)
        )
    }
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={AccountBox}/>
            <Route path="/links/:id" component={Link}/>
            <Route path="/users/:id" component={UserPage}/>
            <Route path="/profile" component={UserPage}/>
            <Route path="/auth/signup/confirm" render={() => <div>{checkConfirm()}</div>} />
        </Switch>
    );
}

export default withRouter(Routes);