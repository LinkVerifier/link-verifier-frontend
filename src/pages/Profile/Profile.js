import React, {useState, useEffect} from 'react';
import Footer from '../../components/general/Footer/Footer';
import Header from '../../components/general/Header/Header';
import authService from '../../util/Authentication/auth-service';
import moment from 'moment'
import './Profile.scss';

function Profile(props) {

    const [user, setUser] = useState();

    useEffect(() => {
        authService.getCurrentUser().then((res)=> {
            console.log(res);
            setUser(res);
        });
    },[]);

    const addComments = () => {
        // return user.comments.map((comment) =>{
        //     <div className="comment">
        //         <div className="user-photo"><img src={user.profilePicture} alt="Profile Picture" height='100px' width='100px'/></div>
        //         <div className="info">
        //             <div className="user-name">{user.username}</div>
        //             <div className="content">{comment.comment}</div>
        //             <div className="details">
        //                 <div className="date">
        //                     <FontAwesomeIcon icon={faClock} />
        //                     &nbsp;{moment(comment.creationDate).format('DD.MM.YYYY')}
        //                 </div>
        //                 <div className="likes">
        //                     <Tooltip TransitionComponent={Zoom} title="Polecam">
        //                         <div className="thumbs" onClick={ (e) => handleLike(comment.id, e)}>
        //                             <FontAwesomeIcon icon={faThumbsUp} size='sm'/>
        //                             {comment.usersWhoLike ? comment.usersWhoLike.length : '0'}
        //                         </div>
        //                     </Tooltip>
        //                     <Tooltip TransitionComponent={Zoom} title="Nie polecam">
        //                         <div className="thumbs" onClick={() => handleUnLike(comment.id)}>
        //                             <FontAwesomeIcon icon={faThumbsDown} size='sm'/>
        //                             {comment.usersWhoDisLike ? comment.usersWhoDisLike.length : '0'}
        //                         </div>
        //                     </Tooltip>
        //                 </div>
        //             </div>
        //         </div>
        //         {changeOpinion(comment.opinion.name)}
        //         {/* <div className="opinion">{changeOpinion(comment.opinion.name)}</div> */}
        //     </div>
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
                    <div className="user-comments">
                        <p>Komentarze</p>
                        {user && addComments()}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Profile;