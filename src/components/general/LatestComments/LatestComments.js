import React, { useEffect, useState } from "react";
import api from "../../../util/api";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';
import "./LatestComments.scss";

function LastestComments(props) {
    const [recentComments, setRecentComments] = useState();

    useEffect(() => {
        api.getRecentComments("date", 5).then(async (res) => {
            console.log(res);
            setRecentComments(await Promise.all(
                    res.map((comment) => {
                        return addComment(comment);
                    })
                )
            );
        });
    }, []);

    const addComment = async (comment) => {
        if(comment===null){
            return 
        }
        const user = await api.getUserById(comment.userId);
        const link = await api.getLinkById( comment.linkId);
        return (
            <div key={comment.id} className="comment">
                <Link to={'/users/'+user.id}>
                    <div className="user-photo">
                        <img src={user && `data:image/jpeg;base64,${user.profilePicture.data}`} alt="Profile Picture" height='100px' width='100px'/>
                    </div>
                </Link>
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
        <div className="latest-comments">
            <h3>Najnowsze komentarze</h3>
            <div className="latest-table">{recentComments}</div>
        </div>
    );
}

export default LastestComments;
