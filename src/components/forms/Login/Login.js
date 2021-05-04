import React, { useState, useContext, useEffect } from "react";
import AuthService from "../../../util/Authentication/auth-service";
import { withRouter } from "react-router-dom";
import { AccountBoxContext } from "../../../context/AccountBoxContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { isEmail } from "validator";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./Login.scss";

 /*global FB*/

const validateLogin = (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = "To pole jest wymagane!";
    } else if (!isEmail(values.email)) {
        errors.email = "Nieprawidłowy adres email!";
    }

    if (!values.password) {
        errors.password = "To pole jest wymagane!";
    } else if (values.password.length < 6 || values.password.length > 40) {
        errors.password = "Hasło musi zawierać od 6 do 40 znaków!";
    }

    return errors;
};

function Login(props) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [facebookLoading, setFacebookLoading] = useState(false);

    const { switchToSignUp } = useContext(AccountBoxContext);

    const handleLogin = (values, { setFieldError }) => {
        setLoading(true);
        AuthService.login(values.email, values.password)
            .then((res) => {
                props.history.push("/");
            })
            .catch((error) => {
                setLoading(false);
                setMessage(error.response.data.infoMessage)
            });
    };

    const getFacebookAccessToken = () => {
        setFacebookLoading(true);
        FB.login(
            function (response) {
                if (response.status === "connected") {
                    console.log(response);
                    const facebookLoginRequest = {
                        accessToken: response.authResponse.accessToken,
                    };
                    AuthService.facebookLogin(
                        facebookLoginRequest.accessToken,
                        Date.now()
                    ).then(() => {
                        props.history.push("/");
                    });
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
            <span className="alert">{message}</span>
            <Formik
                initialValues={{ email: "", password: "" }}
                validate={validateLogin}
                onSubmit={handleLogin}
            >
                {({ errors, values }) => (
                    <Form>
                        <Field
                            className="form-control"
                            name="email"
                            type="email"
                            placeholder="Email"
                        />
                        <ErrorMessage
                            name="email"
                            component="div"
                            className="alert"
                        />
                        <Field
                            className="form-control"
                            name="password"
                            type="password"
                            placeholder="Hasło"
                        />
                        <ErrorMessage
                            name="password"
                            component="div"
                            className="alert"
                        />
                        <button className="btn" type="submit">
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Zaloguj się</span>
                        </button>
                    </Form>
                )}
            </Formik>
            <button
                className="btn btn-fb"
                disabled={facebookLoading}
                onClick={getFacebookAccessToken}
            >
                {facebookLoading && (
                    <span className="spinner-border spinner-border-sm"></span>
                )}
                <span className="fb-icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-facebook"
                        viewBox="0 0 16 16"
                    >
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                    </svg>
                </span>
                <span>Zaloguj się za pomocą Facebooka</span>
            </button>
            <div className="switch-windows">
                Nie posiadasz jeszcze konta?
                <button onClick={switchToSignUp} href="#">
                    Zarejestruj się!
                </button>
            </div>
        </div>
    );
}

export default withRouter(Login);
