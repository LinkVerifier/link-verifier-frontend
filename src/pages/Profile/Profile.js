import React from 'react';
import Footer from '../../components/general/Footer/Footer';
import Header from '../../components/general/Header/Header';
import './Profile.scss';

function Profile(props) {
    return (
        <div className="profile-container">
            <Header />
            <Footer />
        </div>
    );
}

export default Profile;