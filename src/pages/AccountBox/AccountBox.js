import React, { useState } from 'react';
import Login from '../../components/forms/Login/Login';
import Register from '../../components/forms/Register/Register';
import { motion } from "framer-motion"
import './AccountBox.scss';
import { AccountBoxContext } from '../../context/AccountBoxContext';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import astronauta from '../../assets/images/astronauta.png';
import robal from '../../assets/images/robal.png';
import planeta from '../../assets/images/planeta.png';
import gwiazdeczka from '../../assets/images/gwiazdeczka.png'; 
import rakieta from '../../assets/images/rakieta.png';
import krolik from '../../assets/images/krolik.png';
import chomiczek from '../../assets/images/chomiczek.png';
import kometa from '../../assets/images/kometa.png';


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

function AccountBox() {

    const [isExpended, setExpended] = useState(false);
    const [active, setActive] = useState("singin");

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
                        <div className="header-container">
                            {active === "singin" && 
                                <div>
                                    <h2>Witaj ponownie</h2>
                                    <h5>Zaloguj się, aby kontynuować ! </h5>
                                </div>}
                            {active === "singup" && 
                                <div>
                                    <h2>Witaj nowy użytkowniku !</h2>
                                    <h5>Zarejestruj się aby kontynuować ! </h5>
                                </div>}
                        </div>
                    </div>
                    <div className="form-wrapper">
                        {active === "singin" && <Login />}
                        {active === "singup" && <Register/>}
                    </div>
                    <div id="logo">
                        <h3>
                            <span><Logo className="logo"/></span>
                            <span>link</span>
                            <span>verifier</span>
                        </h3>
                    </div>
                    <div className="circle">
                    <img src={chomiczek}></img>
                    </div>
                    <div className="image-in-circle">
                        <img className="img-astronauta" src={astronauta}></img>
                        <img className="img-gwiazdeczka" src={gwiazdeczka}></img>
                        <img className="img-planeta" src={planeta}></img>
                    </div>
                </div>
            </div>
        </AccountBoxContext.Provider>
    );
}

export default AccountBox;