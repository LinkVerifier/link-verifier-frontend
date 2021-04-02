import React, { useEffect } from 'react';
import AuthService from '../../util/Authentication/auth-service';

function Home(props) {

    useEffect(() => {
        console.log(AuthService.getCurrentUser());
    }, []);

    return (
        <div>
            
        </div>
    );
}

export default Home;