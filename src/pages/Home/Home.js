import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Footer from "../../components/general/Footer/Footer";
import Header from "../../components/general/Header/Header";
import ScrollInNav from "../../components/general/ScrollinNav/ScrollInNav";
import Logo from '../../components/general/Logo/Logo';
import api from "../../util/api";
import "./Home.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import authService from '../../util/Authentication/auth-service';
import LinksStatistics from "../../components/general/LinksStatistics/LinksStatistics";


function Home(props) {
    const [link, setLink] = useState("");
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState();
    const [statistics, setStatistics] = useState();

    useEffect(() => {
        if(localStorage.getItem('token') !== null){
            setIsLogged(true);
            authService.getCurrentUser().then((res)=>setUser(res))
        }
        api.getStatistics().then((res) => setStatistics(res));
    },[]);

    const logout = () =>{
        localStorage.removeItem('token');
        window.location.reload();
    }

    const handleOnChangeLink = (e) =>{
        const link = e.target.value
        setLink(link);
    }

    const submitSearch = (e) =>{
        e.preventDefault();
        api.link(link, Date.now()).then(
            (res) => {
                props.history.push(`/links/${res}`);
                window.location.reload();
            }
        );
    }

    return (
        <div className="home-container">
            <ScrollInNav scrollInHeight={250}>
                <Header />
            </ScrollInNav>
            <div className="home-header">
                <div className="top-header">
                    <Logo />
                    {isLogged ?
                        <div className="menu-button">
                            <Link to={(user && '/users/'+user.id) || '/'}>
                                <FontAwesomeIcon icon={faUser} size="lg"/>
                                <span>Mój profil</span>
                            </Link>
                            <Link to="#" onClick={logout}>
                                <FontAwesomeIcon icon={faSignOutAlt} size="lg"/>
                                <span>Wyloguj się</span>
                            </Link>
                        </div> 
                        :
                        <div className="menu-button">
                            <Link to='/login'>
                                <FontAwesomeIcon icon={faSignInAlt} size="lg"/>
                                <span>Zaloguj się</span>
                            </Link>
                        </div>
                    }
                </div>
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
                <div className="wave wave1"></div>
                <div className="wave wave2"></div>
                <div className="wave wave3"></div>
                <div className="wave wave4"></div>
            </div>
            <div className="home-content">
                <div className="circles-container">
                    <div className="circle circle1">
                        <FontAwesomeIcon icon={faUsers} size="4x"/>
                        <span>Liczba użytkowników</span>
                        <span className="count">{statistics && statistics.users}</span>
                    </div>
                    <div className="circle circle2">
                        <FontAwesomeIcon icon={faLink} size="4x"/>
                        <span>Liczba linków</span>
                        <span className="count">{statistics && statistics.links}</span>
                    </div>
                    <div className="circle circle3">
                        <FontAwesomeIcon icon={faComment} size="4x"/>
                        <span>Liczba komentarzy</span>
                        <span className="count">{statistics && statistics.comments}</span>
                    </div>
                </div>
                <div className="latest-comments">
                    <h3>Najnowsze komentarze</h3>
                    <div className="latest-table">

                    </div>
                </div>
                <LinksStatistics/>
            </div>
            <Footer />
        </div>
    );
}

export default withRouter(Home);
