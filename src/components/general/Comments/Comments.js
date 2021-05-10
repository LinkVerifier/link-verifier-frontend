import React, { useEffect, useState, useContext } from "react";
import api from "../../../util/api";
import "./Comments.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import moment from "moment";
import { Tooltip, Zoom } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import authService from "../../../util/Authentication/auth-service";
import { CommentsContext } from "../../../context/CommentsContext";

function Comments(props) {
    const [comments, setComments] = useState([]);
    const [commentsItems, setCommentsItems] = useState([]);
    const { handleComments } = useContext(CommentsContext);
    // const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {}, []);

    useEffect(() => {
        setComments(props.comments);
    }, [props]);

    useEffect(async () => {
        if (comments) {
            setCommentsItems(
                await Promise.all(
                    comments.map((comment) => {
                        return addComment(comment);
                    })
                )
            );
        }
    }, [comments]);

    const handleLike = (id) => {
        api.putLike(id).then((res) => {
            api.getLinkById(props.match.params.id).then((res) => {
                setComments(res.comments);
            });
        });
    };

    const handleUnLike = (id) => {
        api.putDisLike(id).then((res) => {
            api.getLinkById(props.match.params.id).then((res) => {
                setComments(res.comments);
            });
        });
    };

    const deleteComment = (id) => {
        api.deleteComment(id).then(handleComments);
    };

    const addComment = async (comment) => {
        if (comment !== null) {
            const user = await api.getUserByCommentId(comment.id);
            const currentUser = await authService.getCurrentUser();

            return (
                <div key={comment.id} className="comment">
                    <Link to={"/users/" + user.id}>
                        <div className="user-photo">
                            <img
                                src={
                                    user &&
                                    `data:image/jpeg;base64,${user.profilePicture.data}`
                                }
                                alt="Profile Picture"
                                height="100px"
                                width="100px"
                            />
                        </div>
                    </Link>
                    <div className="info">
                        <Link to={"/users/" + user.id}>
                            <div className="user-name">{user.username}</div>
                        </Link>
                        <div className="content">{comment.comment}</div>
                        <div className="details">
                            <div className="date">
                                <FontAwesomeIcon icon={faClock} />
                                &nbsp;
                                {moment(comment.creationDate).format(
                                    "DD.MM.YYYY"
                                )}
                            </div>
                            <div className="likes">
                                <Tooltip
                                    TransitionComponent={Zoom}
                                    title="Polecam"
                                >
                                    <div
                                        className="thumbs"
                                        onClick={(e) => handleLike(comment.id)}
                                    >
                                        <FontAwesomeIcon
                                            icon={faThumbsUp}
                                            size="sm"
                                        />
                                        {comment.usersWhoLike
                                            ? comment.usersWhoLike.length
                                            : "0"}
                                    </div>
                                </Tooltip>
                                <Tooltip
                                    TransitionComponent={Zoom}
                                    title="Nie polecam"
                                >
                                    <div
                                        className="thumbs"
                                        onClick={() => handleUnLike(comment.id)}
                                    >
                                        <FontAwesomeIcon
                                            icon={faThumbsDown}
                                            size="sm"
                                        />
                                        {comment.usersWhoDislike
                                            ? comment.usersWhoDislike.length
                                            : "0"}
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                    <div className="rightSide-comment">
                        {/* {checkClaim(currentUser, user)} */}
                        {(currentUser.id === user.id || currentUser.roles.some(el => el.name="ROLE_ADMIN")) && (
                            <IconButton
                                aria-label="delete"
                                size="small"
                                onClick={() => deleteComment(comment.id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        )}
                        {changeOpinion(comment.opinion.name)}
                    </div>
                </div>
            );
        }
    };

    // const checkClaim = (currentUser, user) => {
    //     if (currentUser.id === user.id || currentUser.roles.some(el => el.name="ROLE_ADMIN")) {
    //         return (
    //             <IconButton
    //                 aria-label="delete"
    //                 size="small"
    //                 onClick={() => deleteComment(comment.id)}
    //             >
    //                 <DeleteIcon />
    //             </IconButton>
    //         );
    //     }
    // };

    const changeOpinion = (opinion) => {
        switch (opinion) {
            case "VIRUS":
                return <div className="opinion negative">Wirus</div>;
            case "FAKE_NEWS":
                return <div className="opinion negative">Fake News</div>;
            case "FRAUD":
                return <div className="opinion negative">Oszustwo</div>;
            case "NEUTRAL":
                return <div className="opinion neutral">Neutralny</div>;
            case "INDECENT_CONTENT":
                return (
                    <div className="opinion negative">Nieprzyzwoita treść</div>
                );
            case "SAFE":
                return <div className="opinion positive">Bezpieczna</div>;
            case "RELIABLE":
                return <div className="opinion positive">Wiarygodna</div>;
            default:
                return "Brak";
        }
    };

    return (
        <div>
            <h3>Komentarze</h3>
            <div className="comments-container">{commentsItems}</div>
        </div>
    );
}

export default withRouter(Comments);
