import React, { useState,useContext, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import './NewComment.scss';
import api from '../../../util/api';
import { CommentsContext } from '../../../context/CommentsContext';

const validateComment = (values) => {
    const errors = {};

    if(values.opinion===""){
        errors.opinion = 'To pole jest wymagane!';
    }

    return errors;
};

function NewComment(props) {

    const [isUser, setIsUser] = useState(false);
    const { handleComments } = useContext(CommentsContext);

    useEffect(()=>{
        if(localStorage.getItem('token')!==null){
            setIsUser(true);
        }
    },[])

    const handleNewComment = (values) =>{
        if(localStorage.getItem('token')===null){
            props.history.push('/login');
        }else{
            api.newComment(props.id, values.content,Date.now(), values.opinion).then(
                handleComments
                // window.location.reload()
            );
        }
    }

    return (
        <div className="newcomment-container">
            <h3>Dodaj Komentarz</h3>
            {isUser ?
            <Formik
                initialValues={{content: "", opinion: "" }}
                validate={validateComment}
                onSubmit={handleNewComment}
            >
                <Form>
                    <Field as="textarea" className="" name="content" placeholder="Twoje doświadczenie z linkiem"/>
                    <Field name="opinion" as="select" >
                        {/* <MenuItem value="VIRUS">Wirus</MenuItem>
                        <MenuItem value={10}>Ten</MenuItem> */}
                        <option value="" disabled hidden>Wybierz jedną z opcji...</option>
                        <option value="VIRUS" className="negative">Wirus</option>
                        <option value="FAKE_NEWS" className="negative">Fake News</option>
                        <option value="FRAUD" className="negative">Oszustwo</option>
                        <option value="INDECENT_CONTENT" className="negative">Nieprzyzwoita treść</option>
                        <option value="NEUTRAL" className="neutral">Neutralna</option>
                        <option value="SAFE" className="positive">Bezpieczna</option>
                        <option value="RELIABLE" className="positive">Wiarygodna</option>
                    </Field>
                    <ErrorMessage name="opinion" component="div" className="alert"/>
                    <button className="btn" type="submit">
                        <span>Wyślij</span>
                    </button>
                </Form>
            </Formik>
            : <p><Link to='/login'>Zaloguj się </Link>
                aby dodać Komentarz</p>}
        </div>
    );
}

export default withRouter(NewComment);