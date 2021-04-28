import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import ProgressBar from 'react-bootstrap/ProgressBar';
import moment from 'moment';
import api from "../../../util/api";
import "./LinksStatistics.scss";

function LinksStatistics(props) {
    const [isDangerousActive, setIsDangerousActive] = useState(false);
    const [isMostVisitActive, setIsMostVisitActive] = useState(false);
    const [isRecentAddActive, setIsRecentAddActive] = useState(false);

    const [dangerousLinks, setDangerousLinks] = useState();
    const [mostVisitLinks, setMostVisitLinks] = useState();
    const [recentLinks, setRecentLinks] = useState();

    useEffect(() => {
        setIsDangerousActive(true);
        api.getDetailsLinks("new", 5).then((res) => {
            setRecentLinks(
                res.map((link) => (
                    <Link className="link" to={`/links/${link.id}`}>
                        <p className="link-name">Link: {link.linkName}</p>
                        <div className="link-views">
                            {moment(link.creationDate).format('DD.MM.YYYY')}
                            <FontAwesomeIcon icon={faCalendarAlt}/>
                        </div>
                    </Link>
                ))
            );
        });
        api.getDetailsLinks("most_visited", 5).then((res) => {
            setMostVisitLinks(
                res.map((link) => (
                    <Link className="link" to={`/links/${link.id}`}>
                        <p className="link-name">Link: {link.linkName}</p>
                        <div className="link-views">
                            {link.views}
                            <FontAwesomeIcon icon={faEye}/>
                        </div>
                    </Link>
                ))
            );
        });
        api.getDetailsLinks("most_dangerous", 5).then((res) => {
            console.log(res);
            setDangerousLinks(
                res.map((link) => (
                    <Link className="link" to={`/links/${link.id}`}>
                        <p className="link-name">Link: {link.linkName}</p>
                        <ProgressBar>
                            <ProgressBar striped variant="danger" now={link.rating} label={`${link.rating}%`}/>
                            <ProgressBar striped variant="success" now={100-link.rating}/>
                        </ProgressBar>
                    </Link>
                ))
            );
        });
    }, []);

    const handleIsDangerousActive = () => {
        setIsDangerousActive(true);
        setIsMostVisitActive(false);
        setIsRecentAddActive(false);
    };

    const handleIsMostVisitActive = () => {
        setIsDangerousActive(false);
        setIsMostVisitActive(true);
        setIsRecentAddActive(false);
    };

    const handleIsRecentAddActive = () => {
        setIsDangerousActive(false);
        setIsMostVisitActive(false);
        setIsRecentAddActive(true);
    };

    return (
        <div className="statistics-container">
            <h3>Linki</h3>
            {/* <ProgressBar now={40} /> */}
            <div className="links-statistics">
                <div className="nav-buttons">
                    <button onClick={handleIsDangerousActive}>
                        Najniebezpieczniejsze
                    </button>
                    <button onClick={handleIsMostVisitActive}>
                        Najczęściej wyszukiwane
                    </button>
                    <button onClick={handleIsRecentAddActive}>
                        Ostatnio dodane
                    </button>
                </div>
                <div className="statistics-content">
                    {isDangerousActive && (
                        <div className="content">{dangerousLinks}</div>
                    )}
                    {isMostVisitActive && (
                        <div className="content">{mostVisitLinks}</div>
                    )}
                    {isRecentAddActive && (
                        <div className="content">{recentLinks}</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LinksStatistics;
