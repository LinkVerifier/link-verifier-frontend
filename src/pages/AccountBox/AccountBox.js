import React from 'react';
import './AccountBox.css';

function AccountBox() {
    return (
        <div className="main-container">
            <div className="box-container">
                <div className="top-holder">
                    <div className="back-drop">
                    </div>
                    <div className="header-container">
                        <h2>Witaj ponownie</h2>
                        <h5>Zaloguj się, aby kontynuować ! </h5>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountBox;