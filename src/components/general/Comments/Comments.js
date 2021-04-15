import React, { useEffect, useState } from 'react';
import './Comments.scss';

function Comments(props) {

    const [comments, setComments] = useState([]);
    const [commentsItems, setCommentsItems] = useState([]);
    const [link, setLink] = useState('');

    useEffect(() => {
    },[]);

    useEffect(() => {
        setLink(props.linkName);
        setComments(props.comments);
    }, [props]);

    useEffect(() => {
        if(comments){
            setCommentsItems(comments.map(comment => 
                <div>
                    Treść: {comment.comment}
                    Opinia: {comment.opinion.name}
                    {/* LikeUp: {comment.usersWhoLike.length}
                    LikeDown: {comment.usersWhoDisLike.length} */}
                </div>
                ));
        }
    }, [comments]);

    // const numbers = [1, 2, 3, 4, 5];
    // const listItems = numbers.map((number) =>
    //     <li>{number}</li>
    // );

    // const list = props.comments.map((item) =>(
    //     <li>item</li>
    // ));

    return (
        <div>
            <h3>Komentarze</h3>
            <div className="comments-container">{commentsItems}</div>
        </div>
    );
};

export default Comments;