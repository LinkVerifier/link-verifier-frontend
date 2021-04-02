import React, { useState, useRef, useContext, useEffect } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../../util/Authentication/auth-service";
import {withRouter} from "react-router-dom";
import './Login.scss';
import { AccountBoxContext } from '../../../context/AccountBoxContext';

/*global FB*/

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div> 
        );
    }
};

function Login(props) {
    const form = useRef();
    const checkBtn = useRef();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [facebookLoading, setFacebookLoading] = useState(false);
    const [message, setMessage] = useState("");

    const { switchToSignUp } = useContext(AccountBoxContext);

    useEffect(() => {
        console.log(AuthService.getCurrentUser());
        if (AuthService.getCurrentUser() !== null) {
            console.log("elo");
            props.history.push("/");
        }
        initFacebookLogin();
    }, []);

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };
    
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const initFacebookLogin = () => {
        window.fbAsyncInit = function () {
            FB.init({
                appId: '857334021514094',
                autoLogAppEvents: true,
                xfbml: true,
                version: "v7.0",
            });
        };
    };
    
    const handleLogin =(e) => {
        e.preventDefault();
    
        setMessage("");
        setLoading(true);
    
        form.current.validateAll();
    
        if (checkBtn.current.context._errors.length === 0) {
        AuthService.login(email, password).then(
            () => {
                console.log("zalogowano");
                props.history.push("/");
            },
            (error) => {
            const resMessage =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
    
            setMessage(resMessage);
            }
        );
        } else {
            setLoading(false);
        }
    };

    const getFacebookAccessToken = () => {
        setFacebookLoading(true);
        FB.login(
          function (response) {
            if (response.status === "connected") {
              const facebookLoginRequest = {
                accessToken: response.authResponse.accessToken,
              };
              AuthService.facebookLogin(facebookLoginRequest.accessToken).then(
                () => {
                    console.log("zalogowano");
                    props.history.push("/");
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString();
        
                    setMessage(resMessage);
                }
            );
            } else {
                setFacebookLoading(false);
                console.log(response);
            }
          },
          { scope: "email" }
        );
    };

    return (
        <div>
            <Form onSubmit={handleLogin} ref={form}>
                <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    validations={[required]}
                    placeholder="Email"
                />
                <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    validations={[required]}
                    placeholder="Password"
                />
                <button className="btn-sign" disabled={loading}>
                    {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Sign In</span>
                </button>

                <button className="btn-sign" disabled={facebookLoading} onClick={getFacebookAccessToken}>
                    {facebookLoading && (
                        <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Facebook</span>
                </button>

                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
            <div className="switch-windows">
                Nie posiadasz jeszcze konta ?
                <button onClick={switchToSignUp}>Zarejestruj się !</button>
            </div>
        </div>
    );
}

export default withRouter(Login);