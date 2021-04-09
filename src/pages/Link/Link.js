import React, { useEffect, useState} from 'react';
import Header from '../../components/general/Header/Header';
import api from '../../util/api';
import moment from 'moment'
import './Link.scss';

function Link(props) {

    const [link, setLink] = useState({});

    useEffect(() => {
        api.getLinkInfo(props.match.params.id).then(
            (res) => {
                setLink(res);
            }
        );
        console.log(link)
    },[]);

    return (
        <div className="link-container">
            <Header/>
            <div className="link-info">
                <span>Link: {link.linkName}</span>
            </div>
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
                        <span>{moment(link.lastVisitDate).format('DD/MM/YYYY')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Link;