import React, { useEffect, useState } from 'react'
import "./Post.css";
import { Avatar } from '@mui/material';
import {db} from "../firebase"
import firebase from 'firebase/compat/app';

function Post(props) {
  const [comments,setComments] = useState([]);
  const [comment,setComment] = useState("")
  
  const postComment = (event)=>{
    event.preventDefault();
  
    db.collection('posts').doc(props.postId).collection('comments').add({
      text: comment,
      username:props.user.displayName,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    });
    setComment("");

  }

  useEffect(()=>{
    let unsubsribe;
    if(props.postId){
      unsubsribe = db
      .collection("posts")
      .doc(props.postId)
      .collection("comments")
      .orderBy('timestamp','desc')
      .onSnapshot((snapshot)=>{
        setComments(snapshot.docs.map((doc) => doc.data()));
      });
    }
    return()=>{
      unsubsribe();
    }
   
  },[props.postId]);

  return (
    <div className='post' >
     <div className='post__header'>
        <Avatar
        alt={props.username}
        src="/static/images/avatar/1.jpg"
        sx={{ width: 24, height: 24 }}
        className='post__avatar'
        />
        <h3>{props.username}</h3>
        </div>
        <img className='post__image' src={props.imageURL}
            alt=""
        />
        <h4 className='post__text'><strong>heroicvortex319</strong>: {props.caption} </h4>

        <div className='post__comments'>
          {comments.map((comment)=>{
            return (<p>
              <b>{comment.user}</b> {comment.text}

            </p>
          )})}
        </div>
          {props.user && (
            <form className='post__Commentbox'>
          <input
             className='post__input'
             type = 'text'
             placeholder='add a comment...'
             onChange={(e)=>setComment(e.target.value)}
             value ={comment}
          />
            <button
            disabled={!comment}
            className="post__button"
            type="submit"
            onClick={postComment}
          >
            Post
          </button>


        </form>


          )}
 
    </div>
  )
}

export default Post