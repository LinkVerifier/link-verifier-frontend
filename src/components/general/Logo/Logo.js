import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as LVlogo } from '../../../assets/images/logo.svg';
import './Logo.scss';

function Logo(props) {
    return (
        <Link to="/">
            <div id="logo">
                <h3>
                    <span><LVlogo className="logo"/></span>
                    <span>link</span>
                    <span>verifier</span>
                </h3>
            </div>
        </Link>
    );
}

export default Logo;