import React, { useEffect, useState } from 'react';

function Comments(props) {

    const [comments, setComments] = useState(props.comments);

    useEffect(() => {
        setComments(props.comments);
        console.log(props);
        setTimeout(() =>{
            console.log(comments);
        }, 2000);
        console.log(comments);
    },[]);

    
    // const commentsItems = comments.map((comment)=>{
    //     <p>comment</p>
    // });

    return (
        <div>
            <h3>Komentarze</h3>
            <h3>{comments}</h3>
        </div>
    );
}

export default Comments;