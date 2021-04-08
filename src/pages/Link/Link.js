import React, { useEffect, useState} from 'react';
import Header from '../../components/general/Header/Header';
import api from '../../util/api';
import './Link.scss';

function Link(props) {

    const [link, setLink] = useState({});

    useEffect(() => {
        api.getLinkInfo(props.match.params.id).then(
            (res) => {
                setLink(res);
            }
        );
    },[]);

    return (
        <div className="link-container">
            <Header/>
            <div className="link-info">
                <span>Link: {link.link}</span>
            </div>
            <div className="stats-container">
                <h3>Statystyki</h3>
                <div className="stats">
                    <div className="row">
                        <span>Ocena</span>
                        <span>{link.rating}</span>
                    </div>
                    <div className="row">
                        <span>Liczba odwiedzeń</span>
                        <span>{link.views}</span>
                    </div>
                    <div className="row">
                        <span>Ostatnia wizyta</span>
                        <span>{link.lastVisitDate}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Link;