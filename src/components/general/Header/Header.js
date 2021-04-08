import React, { useEffect, useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import api from '../../../util/api';
import Logo from '../Logo/Logo';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import './Header.scss';


function Header(props) {

    const [isLogged, setIsLogged] = useState(false);
    const [link, setLink] = useState('');

    useEffect(() => {
        if(localStorage.getItem('user') !== null){
            setIsLogged(true);
        }
    }, []);

    const logout = () =>{
        localStorage.removeItem('user');
        window.location.reload();
    }

    const handleOnChangeLink = (e) =>{
        const link = e.target.value
        setLink(link);
    }

    const submitSearch = (e) =>{
        api.link(link, Date.now()).then(
            (res) => {
                props.history.push(`/links/${res}`);
                window.location.reload();
            }
        );
    }

    return (
        <div className="header-container">
            <Logo />
            <div className="input-container">
                <input
                    type="text" 
                    value={link}
                    placeholder="Link"
                    onChange={handleOnChangeLink}
                />
                <button onClick={submitSearch}>
                    <FontAwesomeIcon icon={faSearch} size="2x"/>
                </button>
            </div>
            {isLogged ?
                <div className="menu-button">
                    <Link to='/profile'>
                        <FontAwesomeIcon icon={faUser} size="lg"/>
                        <span>Mój profil</span>
                    </Link>
                    <Link to={props.myroute} onClick={logout}>
                        <FontAwesomeIcon icon={faSignOutAlt} size="lg"/>
                        <span>Wyloguj się</span>
                    </Link>
                </div> :
                <Link to='/login'>
                    <FontAwesomeIcon icon={faSignInAlt} size="lg"/>
                    <span>Zaloguj się</span>
                </Link>
            }
            {/* <Link to="/about">About</Link> */}
            {/* <FontAwesomeIcon icon={faSignOutAlt} size="4x" className="logout-icon"/> */}
        </div>
    );
}

export default withRouter(Header);