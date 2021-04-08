import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import Header from '../../components/general/Header/Header';
import api from '../../util/api';
import './Home.scss';

function Home(props) {

    const [link, setLink] = useState('');
    const [linkId, setLinkId] = useState('');

    const handleOnChangeLink = (e) =>{
        const link = e.target.value
        setLink(link);
    }

    const submitSearch = (e) =>{
        api.link(link, Date.now()).then(
            (res) => {
                setLinkId(res);
                props.history.push({
                    pathname: `/links/${linkId}`,
                    linkId
                });
            }
        );
    }

    return (
        <div className="home-container">
            <Header />
        </div>
    );
}

export default Home;