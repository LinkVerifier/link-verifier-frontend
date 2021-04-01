import React, { useState, useRef, useContext } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../../Authentication/auth-service";
import './Login.scss';
import { AccountBoxContext } from '../../../context/AccountBoxContext';

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div> 
        );
    }
};

function Login() {
    const form = useRef();
    const checkBtn = useRef();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const { switchToSignUp } = useContext(AccountBoxContext);

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };
    
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
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

export default Login;