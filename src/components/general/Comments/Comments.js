import React, { useEffect } from 'react';

function Comments(props) {

    useEffect(() => {
        console.log(props.comments)
    },[]);

    return (
        <div>
            <h3>Komentarze</h3>
        </div>
    );
}

export default Comments;