import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import api from '../../util/api';
import './Home.scss';

function Home(props) {

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
            }
        );
    }

    return (
        <div className="home-container">
            <div className="header-container">
                <div className="header-nav">
                    <div id="logo">
                        <h3>
                            <span><Logo className="logo"/></span>
                            <span>link</span>
                            <span>verifier</span>
                        </h3>
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
                <div>
                    <input 
                        type="text" 
                        value={link}
                        placeholder="Link"
                        onChange={handleOnChangeLink}
                    />
                    <button onClick={submitSearch}>Szukaj</button>
                </div>
            </div>
        </div>
    );
}

export default Home;