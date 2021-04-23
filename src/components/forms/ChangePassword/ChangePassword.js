import React, {useState, useEffect, useContext} from 'react';
import { Tooltip, Zoom } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import './ChangePassword.scss';
import { UserInfoContext } from '../../../context/UserInfoContext';

function ChangePassword(props) {
    const [user, setUser] = useState();

    const { handleCancel } = useContext(UserInfoContext);

    useEffect(() => {
        setUser(props.user);
    }, [props]);

    const handleChangePassword = () => {

    }

    return (
        <div className="editProfile-container">
            <div className="user-photo"> 
                <img src={user && `data:image/jpeg;base64,${user.profilePicture.data}`} alt="Profile Picture" height='220px' width='220px'/>
            </div>
            <Formik
                initialValues={{oldPassword: "", newPassword: "", newPasswordConfirm: "" }}
                onSubmit={handleChangePassword}
            >
                <Form>
                    <Field className="form-control" name="oldPassword" type="password" placeholder="Hasło"/>
                    <Field className="form-control" name="newPassword" type="password" placeholder="Nowe Hasło"/>
                    <Field className="form-control" name="newPasswordConfirm" type="password" placeholder="Potwierdź nowe hasło"/>
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