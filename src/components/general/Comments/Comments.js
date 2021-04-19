import React, { useEffect, useState } from 'react';
import api from '../../../util/api';
import './Comments.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import moment from 'moment';

function Comments(props) {

    const [comments, setComments] = useState([]);
    const [commentsItems, setCommentsItems] = useState([]);

    useEffect(() => {
        setComments(props.comments);
    }, [props]);

    useEffect(async() => {
        if(comments){
            setCommentsItems(await Promise.all(comments.map((comment) =>{
                return addComment(comment);
            })));
        }
    }, [comments]);

    const handleLike = () =>{

    }
    const handleUnLike = () =>{

    }


    const addComment = async (comment) => {
        const user = await api.getUserById(comment.userId);

        return  <div className="comment">
                    <div className="user-photo"><img src={user.profilePicture} alt="Profile Picture" height='100px' width='100px'/></div>
                    <div className="info">
                        <div className="user-name">{user.username}</div>
                        <div className="content">{comment.comment}</div>
                        <div className="details">
                            <div className="date">
                                <FontAwesomeIcon icon={faClock} />
                                &nbsp;{moment(comment.creationDate).format('DD.MM.YYYY')}
                            </div>
                            <div className="likes">
                                <div className="thumbs" onClick={handleLike}>
                                    <FontAwesomeIcon icon={faThumbsUp} size='sm'/>
                                    {comment.usersWhoLike ? comment.usersWhoLike : '0'}
                                </div>
                                <div className="thumbs" onClick={handleUnLike}>
                                    <FontAwesomeIcon icon={faThumbsDown} size='sm'/>
                                    {comment.usersWhoDisLike ? comment.usersWhoDisLike : '0'}
                                </div>
                            </div>
                        </div>
                    </div>
                    {changeOpinion(comment.opinion.name)}
                    {/* <div className="opinion">{changeOpinion(comment.opinion.name)}</div> */}
                </div>
    }

    const changeOpinion = (opinion) => {
        switch (opinion) {
            case 'VIRUS':
                return <div className="opinion negative">Wirus</div>;
            case 'FAKE_NEWS':
                return <div className="opinion negative">Fake News</div>;
            case 'FRAUD':
                return <div className="opinion negative">Oszustwo</div>;
            case 'NEUTRAL':
                return <div className="opinion neutral">Neutralny</div>;
            case 'INDECENT_CONTENT':
                return <div className="opinion negative">Nieprzyzwoita treść</div>;
            case 'SAFE':
                return <div className="opinion positive">Bezpieczna</div>;
            case 'RELIABLE':
                return <div className="opinion positive">Wiarygodna</div>;
            default:
                return 'Brak';
        }
    }

    return (
        <div>
            <h3>Komentarze</h3>
            <div className="comments-container">{commentsItems}</div>
        </div>
    );
};

export default Comments;