import React from 'react';
import { withRouter } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import './NewComment.scss';
import authService from '../../../util/Authentication/auth-service';
import api from '../../../util/api';

function NewComment(props) {

    const handleNewComment = (values) =>{
        if(localStorage.getItem('token')===null){
            props.history.push('/login');
        }else{
            api.newComment(props.id, values.content,Date.now(), values.opinion).then(
                window.location.reload()
            );
        }
    }

    return (
        <div className="newcomment-container">
            <h3>Dodaj Komentarz</h3>
            <Formik
                initialValues={{content: "", opinion: "" }}
                onSubmit={handleNewComment}
            >
                <Form>
                    <Field as="textarea" className="" name="content" placeholder="Twoje doświadczenie z linkiem"/>
                    {/* <textarea name="content" placeholder="eloooo"></textarea> */}
                    <Field name="opinion" as="select">
                        {/* <option value="VIRUS">Wybierz jedną z opcji</option> */}
                        <option value="VIRUS">Wirus</option>
                        <option value="FAKE_NEWS">Fake News</option>
                        <option value="FRAUD">Oszustwo</option>
                        <option value="INDECENT_CONTENT">Nieprzyzwoita treść</option>
                        <option value="SAFE">Bezpieczna</option>
                        <option value="NEUTRAL">Neutralna</option>
                        <option value="RELIABLE">Zaufana</option>
                    </Field>
                    <button className="btn" type="submit">
                        <span>Wyślij</span>
                    </button>
                </Form>
            </Formik>
        </div>
    );
}

export default withRouter(NewComment);