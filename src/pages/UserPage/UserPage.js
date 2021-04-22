import React, {useState, useEffect} from 'react';
import Footer from '../../components/general/Footer/Footer';
import Header from '../../components/general/Header/Header';
import authService from '../../util/Authentication/auth-service';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { Tooltip, Zoom } from '@material-ui/core';
import moment from 'moment'
import './UserPage.scss';
import api from '../../util/api';
import {Link} from 'react-router-dom';

function UserPage(props) {

    const [user, setUser] = useState();
    const [isCurrentUser, setIsCurrentUser] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentsItems, setCommentsItems] = useState([]);

    useEffect(() => {
        authService.getCurrentUser().then((res)=>{
            if(res.id===props.match.params.id) setIsCurrentUser(true);
        })
        api.getUserById(props.match.params.id).then((res)=> {
            setUser(res);
            setComments(res.comments);
        });
    }, [props]);


    useEffect(async() => {
        if(comments){
            setCommentsItems(await Promise.all(comments.map((comment) =>{
                return addComment(comment);
            })));
        }
    }, [comments]);

    const addComment = async (comment) => {
        const link = await api.getLinkById(comment.linkId);
        return  <div className="comment">
                    <div className="info">
                        <div className="link-name">Link: <Link to={"/links/"+link.id}>{link && link.linkName}</Link></div>
                        <div className="content">{comment.comment}</div>
                        <div className="details">
                            <div className="date">
                                <FontAwesomeIcon icon={faClock} />
                                &nbsp;{moment(comment.creationDate).format('DD.MM.YYYY')}
                            </div>
                        </div>
                    </div>
                    {changeOpinion(comment.opinion.name)}
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
        <div className="profile-container">
            <Header />
            <div className="profile-header" />
            <div className="profile-info" >
                <div className="user-info">
                    {isCurrentUser ?
                        <div className="user-photo"> 
                                <input type="file" id="icon-button-file"/>
                                <Tooltip TransitionComponent={Zoom} title="Zmień zdjęcie">
                                    <label htmlFor="icon-button-file">
                                        <img src={user && user.profilePicture} alt="Profile Picture" height='220px' width='220px'/>
                                    </label>
                                </Tooltip>  
                        </div>
                    : 
                        <div className="user-photo"> 
                            <img src={user && user.profilePicture} alt="Profile Picture" height='220px' width='220px'/>
                        </div>
                    }
                    <div className="user-statistics">
                        <p>Username:</p> <p>{user && user.username}</p>
                        <p>Email:</p> <p>{user && user.email}</p>
                        <p>Ilość komentarzy:</p> <p>{user && user.comments.length}</p>
                        <p>Data dołączenia:</p> <p>{moment(user && user.creationDate).format('DD.MM.YYYY')}</p>
                    </div>
                </div>
                <div className="right-container">
                    {isCurrentUser ?
                        <div className="user-name">
                            <Tooltip TransitionComponent={Zoom} title="Zmień nick">
                                <div>{user && user.username}</div>
                            </Tooltip>
                        </div>
                    :   
                        <div className="user-name">{user && user.username}</div>
                    }
                    <p>Komentarze</p>
                    <div className="user-comments">
                        {commentsItems}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default UserPage;