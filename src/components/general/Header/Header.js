import React, { useEffect, useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import api from '../../../util/api';
import Logo from '../Logo/Logo'
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
                <button onClick={submitSearch}>Szukaj</button>
            </div>
            {isLogged ?
                <div>
                    <Link to='/profile'>Mój profil</Link>
                    <button onClick={logout}>Wyloguj</button>
                </div> :
                <Link to='/login'>Zaloguj</Link>
            }
            {/* <Link to="/about">About</Link> */}
            {/* <FontAwesomeIcon icon={faSignOutAlt} size="4x" className="logout-icon"/> */}
        </div>
    );
}

export default withRouter(Header);