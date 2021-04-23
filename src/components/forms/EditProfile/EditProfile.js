import React, {useState, useEffect, useContext} from 'react';
import { Tooltip, Zoom } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import './EditProfile.scss';
import { UserInfoContext } from '../../../context/UserInfoContext';

function EditProfile(props) {

    const [user, setUser] = useState();

    const { handleCancel } = useContext(UserInfoContext);

    useEffect(() => {
        setUser(props.user);
    }, [props]);

    const handleEditProfile = () =>{

    }

    return (
        <div className="editProfile-container">
            <div className="user-photo"> 
                {/* <input accept="image/*" type="file" id="icon-button-file" onChange={handlerImage}/> */}
                <Tooltip TransitionComponent={Zoom} title="Zmień zdjęcie">
                    <label htmlFor="icon-button-file">
                        <img src={user && `data:image/jpeg;base64,${user.profilePicture.data}`} alt="Profile Picture" height='220px' width='220px'/>
                    </label>
                </Tooltip>
            </div>
            <Formik
                initialValues={{username: "" }}
                onSubmit={handleEditProfile}
            >
                <Form>
                    <input accept="image/*" type="file" id="icon-button-file" className="input-image"/>
                    <Field className="form-control" name="username" type="text" placeholder="Username"/>
                    <ButtonGroup disableElevation variant="contained" color="inherit">
                        <Button onClick={handleCancel}>Anuluj</Button>
                        <Button type="submit">Zatwierdź</Button>
                    </ButtonGroup>
                </Form>
            </Formik>
        </div>
    );
}

export default EditProfile;