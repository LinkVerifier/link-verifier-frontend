import React from 'react';
import './Footer.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function Footer(props) {
    return (
        <div className="footer-container">
            <div className="made-with">
                <span>
                    Made with&nbsp; 
                    <FontAwesomeIcon icon={faHeart} color='red'/>
                    &nbsp;by
                </span>
                <span>Julia Kozłowska, Mateusz Niewiadomski, Kamil Olszewski</span>
            </div>
            <span>©&nbsp;2021</span>
        </div>
    );
}

export default Footer;