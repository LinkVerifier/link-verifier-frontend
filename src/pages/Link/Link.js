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
        </div>
    );
}

export default Link;