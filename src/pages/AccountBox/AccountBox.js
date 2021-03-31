import React, { useState } from 'react';
import Login from '../../components/forms/Login/Login';
import Register from '../../components/forms/Register/Register';
import { motion } from "framer-motion"
import './AccountBox.scss';
import { AccountBoxContext } from '../../context/AccountBoxContext';

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
    duration: 2.5,
    stiffness: 30,
}

function AccountBox() {

    const [isExpended, setExpended] = useState(false);
    const [active, setActive] = useState("singin");

    const handleExpended = () => {
        setExpended(true);
        setTimeout(() => {
            setExpended(false);
        }, expandingTransition.duration * 1000 - 1500)
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
                                    <h2>Witaj nowy użytkowniku</h2>
                                    <h5>Zarejestruj się aby kontynuować ! </h5>
                                </div>}
                        </div>
                    </div>
                    <div className="form-wrapper">
                        {active === "singin" && <Login />}
                        {active === "singup" && <Register/>}
                    </div>
                </div>
            </div>
        </AccountBoxContext.Provider>
    );
}

export default AccountBox;