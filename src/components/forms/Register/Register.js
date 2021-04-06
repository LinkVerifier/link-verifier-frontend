
import React, { useContext } from "react";
import { isEmail } from "validator";
import { Formik, Form, Field, ErrorMessage} from 'formik';
import AuthService from "../../../util/Authentication/auth-service";
import { AccountBoxContext } from '../../../context/AccountBoxContext';
import './Register.scss';


const validateRegister = (values) => {
    const errors = {};
    
    if(!values.username){
        errors.username = 'To pole jest wymagane !';
    }

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

function Register(props) {

    const { switchToSignIn } = useContext(AccountBoxContext);

    const handleRegister = (values) => {
        AuthService.register(values.username, values.email, values.password).then(
            () => {
                console.log("zarejestrowano !");
                switchToSignIn();
            }
        );
    };

    return (
        <div>
            <Formik
                initialValues={{username: "", email: "", password: "" }}
                validate={validateRegister}
                onSubmit={handleRegister}
            >
                <Form>
                    <Field name="username" type="text" placeholder="Username"/>
                    <ErrorMessage name="username" component="div" className="alert"/>
                    <Field name="email" type="email" placeholder="Email" />
                    <ErrorMessage name="email" component="div" className="alert"/>
                    <Field name="password" type="password" placeholder="Password"/>
                    <ErrorMessage name="password" component="div" className="alert"/>
                    <button type="submit">Zarejestruj</button>
                </Form>
            </Formik>
            <div className="switch-windows">
                Masz już konto ?
                <button onClick={switchToSignIn}>Zaloguj się !</button>
            </div>
        </div>
    );
}

export default Register;