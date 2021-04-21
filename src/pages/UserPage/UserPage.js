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

function UserPage(props) {

    const [user, setUser] = useState();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        api.getUserById(props.match.params.id).then((res)=> {
            console.log(res);
            setUser(res);
            setComments(res.comments);
        });
    },[]);

    const addComments = (comments) => {
        return  comments.map(comment =>
            <div className="comment">
                <div className="info">
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
    )}

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
                    <div className="user-photo"><img src={user && user.profilePicture} alt="Profile Picture" height='200px' width='200px'/></div>
                    <div className="user-statistics">
                        <span>Statystyki</span>
                        <p>Data utworzenia konta: {moment(user && user.creationDate).format('DD.MM.YYYY')}</p>
                    </div>
                </div>
                <div className="right-container">
                    <div className="user-name">{user && user.username}</div>
                    <p>Komentarze</p>
                    <div className="user-comments">
                        {addComments(comments)}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default UserPage;