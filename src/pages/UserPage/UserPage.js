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
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import EditProfile from '../../components/forms/EditProfile/EditProfile';
import ChangePassword from '../../components/forms/ChangePassword/ChangePassword';
import { UserInfoContext } from '../../context/UserInfoContext';

function UserPage(props) {

    const [user, setUser] = useState();
    const [image, setImage] = useState();
    const [isCurrentUser, setIsCurrentUser] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentsItems, setCommentsItems] = useState([]);
    const [isEditProfileActive, setIsEditProfileActive] = useState(false);
    const [isChangePasswordActive, setIsChangePasswordActive] = useState(false);

    useEffect(() => {
        authService.getCurrentUser().then((res)=>{
            if(res.id===props.match.params.id) setIsCurrentUser(true);
        })
        api.getUserById(props.match.params.id).then((res)=> {
            setUser(res);
            setImage(`data:`+res.profilePicture.type+`;base64,`+res.profilePicture.data)
            console.log(res.profilePicture);
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

    const changePassword = () => {
        setIsChangePasswordActive(true);
    }
    const editProfile = () => {
        setIsEditProfileActive(true);
    }

    const handleCancel = () => {
        setIsEditProfileActive(false);
        setIsChangePasswordActive(false);
        api.getUserById(props.match.params.id).then((res)=> {
            // console.log(res);
            setUser(res);
            setImage(`data:`+res.profilePicture.type+`;base64,`+res.profilePicture.data);
        });
    }

    const contextValue = { handleCancel };

    return (
        <UserInfoContext.Provider value={contextValue}>
            <div className="profile-container">
                <Header />
                <div className="profile-header" />
                <div className="profile-info" >
                    {isEditProfileActive || isChangePasswordActive ? 
                        <div className="user-info">
                            {isEditProfileActive ?
                                <EditProfile user={user}/>
                            :
                                <ChangePassword user={user}/>
                            }
                        </div>
                    :
                        <div className="user-info">
                            <div className="user-photo">
                                <img src={image && image} alt="Profile Picture" height='220px' width='220px'/>
                            </div>
                            <div className="user-statistics">
                                <p>Username:</p> <p>{user && user.username}</p>
                                <p>Email:</p> <p>{user && user.email}</p>
                                <p>Ilość komentarzy:</p> <p>{user && user.comments && user.comments.length || '0'}</p>
                                <p>Data dołączenia:</p> <p>{moment(user && user.creationDate).format('DD.MM.YYYY')}</p>
                            </div>
                            {isCurrentUser && 
                                <ButtonGroup disableElevation variant="contained" color="inherit">
                                    <Button onClick={changePassword}>Zmień hasło</Button>
                                    <Button onClick={editProfile}>Edytuj Profil</Button>
                                </ButtonGroup>
                            }
                        </div>
                    }
                    <div className="right-container">
                        <div className="user-name">{user && user.username}</div>
                        <p>Komentarze</p>
                        <div className="user-comments">
                            {commentsItems}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </UserInfoContext.Provider>
    );
}

export default UserPage;