import React from 'react';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import './NewComment.scss';
import authService from '../../../util/Authentication/auth-service';
import api from '../../../util/api';

function NewComment(props) {

    const handleNewComment = (values) =>{
        console.log(values.content);
        api.newComment(props.id, values.content,Date.now(), values.opinion).then(
            (req) => {
                console.log("dodano nowy komentarz");
            }
        )
    }

    return (
        <div className="newcomment-container">
            <h3>Dodaj Komentarz</h3>
            <Formik
                initialValues={{content: "", opinion: "" }}
                onSubmit={handleNewComment}
            >
                <Form>
                    <Field as="textarea" className="" name="content" placeholder="elo"/>
                    {/* <textarea name="content" placeholder="eloooo"></textarea> */}
                    <Field className="" name="opinion" type="text" placeholder="Email"/>
                    <button className="btn" type="submit">
                        <span>Wyślij</span>
                    </button>
                </Form>
            </Formik>
        </div>
    );
}

export default NewComment;