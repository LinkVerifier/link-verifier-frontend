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
import authService from '../../../util/Authentication/auth-service';


function Header(props) {

    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState();
    const [link, setLink] = useState('');

    useEffect(() => {
        if(localStorage.getItem('token') !== null){
            setIsLogged(true);
            authService.getCurrentUser().then((res)=>setUser(res))
        }
    }, []);

    const logout = () =>{
        localStorage.removeItem('token');
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
            <form className="input-container">
                <input
                    type="text" 
                    value={link}
                    placeholder="Link"
                    onChange={handleOnChangeLink}
                />
                <button onClick={submitSearch} type="submit">
                    <FontAwesomeIcon icon={faSearch} size="2x"/>
                </button>
            </form>
            {isLogged ?
                <div className="menu-button">
                    <Link to={user && '/users/'+user.id}>
                        <FontAwesomeIcon icon={faUser} size="lg"/>
                        <span>Mój profil</span>
                    </Link>
                    <Link to="#" onClick={logout}>
                        <FontAwesomeIcon icon={faSignOutAlt} size="lg"/>
                        <span>Wyloguj się</span>
                    </Link>
                </div> :
                <div className="menu-button">
                    <Link to='/login'>
                        <FontAwesomeIcon icon={faSignInAlt} size="lg"/>
                        <span>Zaloguj się</span>
                    </Link>
                </div>
            }
        </div>
    );
}

export default withRouter(Header);