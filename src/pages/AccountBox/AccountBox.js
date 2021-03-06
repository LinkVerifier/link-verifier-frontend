import React, { useState, useEffect } from 'react';
import Login from '../../components/forms/Login/Login';
import Register from '../../components/forms/Register/Register';
import { motion } from "framer-motion"
import { AccountBoxContext } from '../../context/AccountBoxContext';
import astronauta from '../../assets/images/astronauta.png';
import planeta from '../../assets/images/planeta.png';
import gwiazdeczka from '../../assets/images/gwiazdeczka.png'; 
import { withRouter } from "react-router-dom";
import Logo from '../../components/general/Logo/Logo'

import './AccountBox.scss';


const variants = {
    expanded: {
        width: "200%",
        height: "2000px"
    },
    collapsed: {
        width: "110%",
        height: "800px"
    },
};

const expandingTransition = {
    type: "spring",
    duration: .5,
    stiffness: 30,
}

function AccountBox(props) {

    const [isExpended, setExpended] = useState(false);
    const [active, setActive] = useState("singin");

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            props.history.push("/");
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleExpended = () => {
        setExpended(true);
        setTimeout(() => {
            setExpended(false);
        }, expandingTransition.duration * 1000 + 500)
    }

    const switchToSignIn = () => {
        handleExpended();
        setTimeout(()=>{
            setActive("singin");
        }, 500);
    }

    const switchToSignUp = () => {
        handleExpended();
        setTimeout(()=>{
            setActive("singup");
        }, 500);
    }

    const contextValue = { switchToSignIn, switchToSignUp };

    return (
        <AccountBoxContext.Provider value={contextValue}>
            <div className="main-container">
                <div className="box-container">
                    <div className="left-holder">
                        <motion.div
                            className="back-drop"
                            initial={false}
                            animate={isExpended ? "expanded" : "collapsed"}
                            variants={variants}
                            transition={expandingTransition}>
                        </motion.div>
                        <div className="info-container">
                            {active === "singin" && 
                                <div>
                                    <h2>Witaj ponownie</h2>
                                    <h5>Zaloguj si??, aby kontynuowa?? ! </h5>
                                </div>}
                            {active === "singup" && 
                                <div>
                                    <h2>Witaj nowy u??ytkowniku !</h2>
                                    <h5>Zarejestruj si?? aby kontynuowa?? ! </h5>
                                </div>}
                        </div>
                    </div>
                    <div className="form-wrapper">
                        {active === "singin" && <Login />}
                        {active === "singup" && <Register/>}
                    </div>
                    <Logo />
                    <div className="circle"></div>
                    <div className="image-in-circle">
                        <img className="img-astronauta" src={astronauta} alt="astronauta"></img>
                        <img className="img-gwiazdeczka" src={gwiazdeczka} alt="gwiazdeczka"></img>
                        <img className="img-planeta" src={planeta} alt="planeta"></img>
                    </div>
                </div>
            </div>
        </AccountBoxContext.Provider>
    );
}

export default withRouter(AccountBox);