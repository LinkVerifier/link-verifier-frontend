import React, { useEffect, useState} from 'react';
import Header from '../../components/general/Header/Header';
import api from '../../util/api';
import moment from 'moment'
import './Link.scss';
import Comments from '../../components/general/Comments/Comments';
import NewComment from '../../components/forms/NewComment/NewComment';
import Footer from '../../components/general/Footer/Footer';

function Link(props) {

    const [link, setLink] = useState({});

    useEffect(() => {
        api.getLinkById(props.match.params.id).then(
            (res) => {
                setLink(res);
            }
        );
    },[]);

    return (
        <div className="link-container">
            <Header/>
            <div className="link-name">
                <span>Link: {link.linkName}</span>
            </div>
            <div className="link-info">
                <div className="stats-container">
                    <h3>Statystyki</h3>
                    <div className="stats">
                        <div className="row">
                            <span>Stopień niebezpieczeństwa:</span>
                            <span>{link.rating}</span>
                        </div>
                        <div className="row">
                            <span>Liczba ocen:</span>
                            <span>{link.c}</span>
                        </div>
                        <div className="row">
                            <span>Ostatnia ocena:</span>
                            <span>{link.rating}</span>
                        </div>
                        <div className="row">
                            <span>Liczba odsłon:</span>
                            <span>{link.views}</span>
                        </div>
                        <div className="row">
                            <span>Ostatnia odsłona:</span>
                            <span>{moment(link.lastVisitDate).format('DD.MM.YYYY')}</span>
                        </div>
                    </div>
                </div>
                <NewComment id={link.id}/>
                <Comments comments={link.comments} linkName={link.linkName}/>
            </div>
            <Footer />
        </div>
    );
}

export default Link;