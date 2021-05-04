import React, { useEffect, useState } from "react";
import Header from "../../components/general/Header/Header";
import api from "../../util/api";
import moment from "moment";
import "./Link.scss";
import Comments from "../../components/general/Comments/Comments";
import NewComment from "../../components/forms/NewComment/NewComment";
import Footer from "../../components/general/Footer/Footer";
import ScrollInNav from "../../components/general/ScrollinNav/ScrollInNav";
import { CommentsContext } from "../../context/CommentsContext";
import ProgressBar from 'react-bootstrap/ProgressBar';

function Link(props) {
    const [link, setLink] = useState({});
    const [comments, setComments] = useState([]);

    useEffect(() => {
        api.patchLinkAddViews(props.match.params.id);
        api.getLinkById(props.match.params.id).then((res) => {
            setLink(res);
            setComments(res.comments);
        });
    }, []);

    const handleComments = () => {
        api.getLinkById(props.match.params.id).then((res) => {
            setLink(res);
            setComments(res.comments);
        });
    };

    const contextValue = { handleComments };

    return (
        <CommentsContext.Provider value={contextValue}>
            <div className="link-container">
                <Header />
                <ScrollInNav scrollInHeight={50}>
                    <Header />
                </ScrollInNav>
                <div className="link-name">
                    <span>Link: {link.linkName}</span>
                </div>
                <div className="link-info">
                    <div className="stats-container">
                        <h3>Statystyki</h3>
                        <div className="stats">
                            <div className="row">
                                <span>Stopień niebezpieczeństwa:</span>
                                <ProgressBar>
                                    <ProgressBar
                                        striped
                                        variant="danger"
                                        now={link.rating}
                                        label={`${link.rating}%`}
                                    />
                                    <ProgressBar
                                        striped
                                        variant="success"
                                        now={100 - link.rating}
                                    />
                                </ProgressBar>
                            </div>
                            <div className="row">
                                <span>Liczba ocen:</span>
                                <span>
                                    {link.comments && link.comments.length}
                                </span>
                            </div>
                            <div className="row">
                                <span>Ostatnia ocena:</span>
                                <span>
                                    {link.lastCommentDate
                                        ? moment(link.lastCommentDate).format(
                                              "DD.MM.YYYY"
                                          )
                                        : "Brak ocen"}
                                </span>
                            </div>
                            <div className="row">
                                <span>Liczba odsłon:</span>
                                <span>{link.views}</span>
                            </div>
                            <div className="row">
                                <span>Ostatnia odsłona:</span>
                                <span>
                                    {moment(link.lastVisitDate).format(
                                        "DD.MM.YYYY"
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                    <NewComment id={link.id} />
                    <Comments comments={comments} linkName={link.linkName} />
                </div>
                <Footer />
            </div>
        </CommentsContext.Provider>
    );
}

export default Link;
