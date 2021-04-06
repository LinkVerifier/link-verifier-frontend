import React, {useState, useContext, useEffect } from 'react';
import AuthService from "../../../util/Authentication/auth-service";
import { withRouter } from "react-router-dom";
import { AccountBoxContext } from '../../../context/AccountBoxContext';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import { isEmail } from "validator";
import './Login.scss';


/*global FB*/

const validateLogin = (values) => {
    const errors = {};

    if(!values.email){
        errors.email = 'To pole jest wymagane !';
    } else if(!isEmail(values.email)){
        errors.email = 'Nieprawidłowy adres email !';
    }

    if(!values.password){
        errors.password = 'To pole jest wymagane !';
    }else if (values.password.length < 6 || values.password.length > 40) {
        errors.password = "Hasło musi zawierać od 6 do 40 znaków !"
    }

    return errors;
};

function Login(props) {

    const [loading, setLoading] = useState(false);
    const [facebookLoading, setFacebookLoading] = useState(false);

    const { switchToSignUp } = useContext(AccountBoxContext);

    useEffect(() => {
        initFacebookLogin();
    }, []);

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
    
    const handleLogin = (values) => {
        setLoading(true);
        AuthService.login(values.email, values.password).then(
            () => {
                props.history.push("/");
            }
        );
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
                            props.history.push("/");
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
            <Formik
                initialValues={{email: "", password: "" }}
                validate={validateLogin}
                onSubmit={handleLogin}
            >
                <Form>
                    <Field name="email" type="email" placeholder="Email"/>
                    <ErrorMessage name="email" component="div" className="alert"/>
                    <Field name="password" type="password" placeholder="Password"/>
                    <ErrorMessage name="password" component="div" className="alert"/>
                    <button type="submit">
                        {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Zaloguj się</span>
                    </button>
                </Form>
            </Formik>
            <button className="btn-sign" disabled={facebookLoading} onClick={getFacebookAccessToken}>
                    {facebookLoading && (
                        <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Facebook</span>
            </button>
            <div className="switch-windows">
                Nie posiadasz jeszcze konta ?
                <button onClick={switchToSignUp} href="#">Zarejestruj się !</button>
            </div>
        </div>
    );
}

export default withRouter(Login);