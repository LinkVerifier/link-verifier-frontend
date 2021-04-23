import React, {useState, useEffect, useContext} from 'react';
import { Tooltip, Zoom } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import './ChangePassword.scss';
import { UserInfoContext } from '../../../context/UserInfoContext';

const validateChangePassword = (values) => {
    const errors = {};

    if(!values.oldPassword){
        errors.oldPassword = 'To pole jest wymagane!';
    }

    if(!values.newPassword){
        errors.newPassword = 'To pole jest wymagane!';
    }else if (values.newPassword.length < 6 || values.newPassword.length > 40) {
        errors.newPassword = "Hasło musi zawierać od 6 do 40 znaków!"
    }

    if(!values.newPasswordConfirm){
        errors.newPasswordConfirm = 'To pole jest wymagane!';
    }

    if(values.newPassword !== values.newPasswordConfirm){
        errors.newPasswordConfirm = 'Podane hasła powinny być identyczne!';
    }

    return errors;
};


function ChangePassword(props) {
    const [user, setUser] = useState();

    const { handleCancel } = useContext(UserInfoContext);

    useEffect(() => {
        setUser(props.user);
    }, [props]);

    const handleChangePassword = () => {

    }

    return (
        <div className="changePassword-container">
            <div className="user-photo"> 
                <img src={user && `data:image/jpeg;base64,${user.profilePicture.data}`} alt="Profile Picture" height='220px' width='220px'/>
            </div>
            <Formik
                initialValues={{oldPassword: "", newPassword: "", newPasswordConfirm: "" }}
                onSubmit={handleChangePassword}
                validate={validateChangePassword}
            >
                <Form>
                    <Field className="form-control" name="oldPassword" type="password" placeholder="Hasło"/>
                    <ErrorMessage name="oldPassword" component="div" className="alert"/>
                    <Field className="form-control" name="newPassword" type="password" placeholder="Nowe Hasło"/>
                    <ErrorMessage name="newPassword" component="div" className="alert"/>
                    <Field className="form-control" name="newPasswordConfirm" type="password" placeholder="Potwierdź nowe hasło"/>
                    <ErrorMessage name="newPasswordConfirm" component="div" className="alert"/>
                    <ButtonGroup disableElevation variant="contained" color="inherit">
                        <Button onClick={handleCancel}>Anuluj</Button>
                        <Button type="submit">Zatwierdź</Button>
                    </ButtonGroup>
                </Form>
            </Formik>
        </div>
    );
}

export default ChangePassword;