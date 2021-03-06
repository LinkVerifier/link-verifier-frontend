import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Footer from "../../components/general/Footer/Footer";
import Header from "../../components/general/Header/Header";
import authService from "../../util/Authentication/auth-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import moment from "moment";
import "./UserPage.scss";
import api from "../../util/api";
import { Link } from "react-router-dom";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import EditProfile from "../../components/forms/EditProfile/EditProfile";
import ChangePassword from "../../components/forms/ChangePassword/ChangePassword";
import { UserInfoContext } from "../../context/UserInfoContext";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

function UserPage(props) {
    const [user, setUser] = useState();
    const [image, setImage] = useState();
    const [isCurrentUser, setIsCurrentUser] = useState(false);
    const [currentUser, setCurrentUser] = useState();
    const [comments, setComments] = useState([]);
    const [commentsItems, setCommentsItems] = useState([]);
    const [isEditProfileActive, setIsEditProfileActive] = useState(false);
    const [isChangePasswordActive, setIsChangePasswordActive] = useState(false);

    useEffect(() => {
        authService.getCurrentUser().then((res) => {
            if (res && res.id === props.match.params.id) setIsCurrentUser(true);
            setCurrentUser(res);
        });
        api.getUserById(props.match.params.id).then((res) => {
            setUser(res);
            setImage(
                `data:` +
                    res.profilePicture.type +
                    `;base64,` +
                    res.profilePicture.data
            );
            setComments(res.comments);
        });
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

    const addComment = async (comment) => {
        if (comment === null) {
            return;
        }
        const user = await api.getUserByCommentId(comment.id);
        const link = await api.getLinkByCommentId(comment.id);
        return (
            <div key={comment.id} className="comment">
                <div className="info">
                    <div className="link-name">
                        Link:{" "}
                        <Link to={"/links/" + link.id}>
                            {link && link.linkName}
                        </Link>
                    </div>
                    <div className="content">{comment.comment}</div>
                    <div className="details">
                        <div className="date">
                            <FontAwesomeIcon icon={faClock} />
                            &nbsp;
                            {moment(comment.creationDate).format("DD.MM.YYYY")}
                        </div>
                    </div>
                </div>
                <div className="rightSide-comment">
                    {currentUser &&
                        (currentUser.id === user.id ||
                            currentUser.roles.some(
                                (el) => (el.name = "ROLE_ADMIN")
                            )) && (
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
    };

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
                    <div className="opinion negative">Nieprzyzwoita tre????</div>
                );
            case "SAFE":
                return <div className="opinion positive">Bezpieczna</div>;
            case "RELIABLE":
                return <div className="opinion positive">Wiarygodna</div>;
            default:
                return "Brak";
        }
    };

    const changePassword = () => {
        setIsChangePasswordActive(true);
    };
    const editProfile = () => {
        setIsEditProfileActive(true);
    };

    const deleteUser = () => {
        api.deleteUser(user.id).then(() => props.history.push("/"));
    };

    const deleteComment = (id) => {
        api.deleteComment(id).then(() =>
            api.getUserById(props.match.params.id).then((res) => {
                setComments(res.comments);
            })
        );
    };

    const handleCancel = () => {
        setIsEditProfileActive(false);
        setIsChangePasswordActive(false);
        api.getUserById(props.match.params.id).then((res) => {
            setUser(res);
            setImage(
                `data:` +
                    res.profilePicture.type +
                    `;base64,` +
                    res.profilePicture.data
            );
        });
    };

    const contextValue = { handleCancel };

    return (
        <UserInfoContext.Provider value={contextValue}>
            <div className="profile-container">
                <Header />
                <div className="profile-header" />
                <div className="profile-info">
                    {isEditProfileActive || isChangePasswordActive ? (
                        <div className="user-info">
                            {isEditProfileActive ? (
                                <EditProfile user={user} />
                            ) : (
                                <ChangePassword user={user} />
                            )}
                        </div>
                    ) : (
                        <div className="user-info">
                            <div className="user-photo">
                                <img
                                    src={image && image}
                                    alt="Profile Picture"
                                    height="220px"
                                    width="220px"
                                />
                            </div>
                            <div className="user-statistics">
                                <p>Nazwa U??ytkownika:</p>{" "}
                                <p>{user && user.username}</p>
                                <p>Email:</p> <p>{user && user.email}</p>
                                <p>Ilo???? komentarzy:</p>{" "}
                                <p>
                                    {(user &&
                                        user.comments &&
                                        user.comments.length) ||
                                        "0"}
                                </p>
                                <p>Data do????czenia:</p>{" "}
                                <p>
                                    {moment(user && user.creationDate).format(
                                        "DD.MM.YYYY"
                                    )}
                                </p>
                            </div>
                            {isCurrentUser && (
                                <ButtonGroup
                                    disableElevation
                                    variant="contained"
                                    color="inherit"
                                >
                                    <Button onClick={changePassword}>
                                        Zmie?? has??o
                                    </Button>
                                    <Button onClick={editProfile}>
                                        Edytuj Profil
                                    </Button>
                                </ButtonGroup>
                            )}
                            {currentUser &&
                                currentUser.roles.some(
                                    (el) => el.name === "ROLE_ADMIN"
                                ) && (
                                    <ButtonGroup
                                        disableElevation
                                        variant="contained"
                                        color="inherit"
                                    >
                                        <Button onClick={deleteUser}>
                                            Usu?? u??ytkownika
                                        </Button>
                                    </ButtonGroup>
                                )}
                        </div>
                    )}
                    <div className="right-container">
                        <div className="user-name">{user && user.username}</div>
                        <p>Komentarze</p>
                        <div className="user-comments">{commentsItems}</div>
                    </div>
                </div>
                <Footer />
            </div>
        </UserInfoContext.Provider>
    );
}

export default withRouter(UserPage);
