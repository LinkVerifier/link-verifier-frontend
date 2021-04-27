import React, {useState, useEffect, useContext} from 'react';
import { Tooltip, Zoom } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { Formik, Form, Field} from 'formik';
import './EditProfile.scss';
import { UserInfoContext } from '../../../context/UserInfoContext';
import api from '../../../util/api';

function EditProfile(props) {

    const [user, setUser] = useState();
    const [image, setImage] = useState();

    const { handleCancel } = useContext(UserInfoContext);

    useEffect(() => {
        setUser(props.user);
        setImage(`data:`+props.user.profilePicture.type+`;base64,`+props.user.profilePicture.data);
    }, [props]);

    const handleEditProfile = (values) =>{
        if(values.username !== user.username && values.file !== null){
            api.putUsername(values.username).then(
                ()=> {
                    api.putFile(values.file).then(
                        ()=> {
                            handleCancel();
                        }
                    )
                }
            )
        }else if(values.username !== user.username && values.file === null){
            api.putUsername(values.username).then(
                ()=> {
                    handleCancel();
                }
            )
        }else if(values.username === user.username && values.file !== null){
            api.putFile(values.file).then(
                ()=> {
                    handleCancel();
                }
            )
        }else{
            handleCancel();
        }
    }
    const handleImage = async (e, formProps) =>{
        const file = await readFileDataAsBase64(e);
        formProps.setFieldValue('file', e.target.files[0])
        setImage(file);
    }

    const readFileDataAsBase64 = (e) => {
        const file = e.target.files[0];
    
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
    
            reader.onload = (event) => {
                resolve(event.target.result);
            };
    
            reader.onerror = (err) => {
                reject(err);
            };
    
            reader.readAsDataURL(file);
        });
    }

    return (
        <div className="editProfile-container">
            <div className="user-photo"> 
                {/* <input accept="image/*" type="file" id="icon-button-file" onChange={handlerImage}/> */}
                <Tooltip TransitionComponent={Zoom} title="Zmień zdjęcie">
                    <label htmlFor="icon-button-file">
                        <img src={image && image} alt="Zdjęcie" height='220px' width='220px'/>
                    </label>
                </Tooltip>
            </div>
            <Formik
                initialValues={{username: props.user.username, file: null }}
                onSubmit={handleEditProfile}
            >
                {(formProps)=>(
                    <Form>
                        <input name="file" accept="image/*" type="file" id="icon-button-file" className="input-image" onChange={(e)=>handleImage(e, formProps)}/>
                        <Field className="form-control" name="username" type="text" placeholder="Username"/>
                        <ButtonGroup disableElevation variant="contained" color="inherit">
                            <Button onClick={handleCancel}>Anuluj</Button>
                            <Button type="submit">Zatwierdź</Button>
                        </ButtonGroup>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default EditProfile;