import { Button } from '@mui/material';
import React, { useState } from 'react';
import {storage,db} from "../firebase";
import firebase from "firebase/compat/app";
import "./ImageUpload.css";
function ImageUpload(props) {
    const [caption,setCaption] = useState("");
    const [image,setImage] = useState(null); 
    const [progress,setProgress] = useState(0);

    const handleChange = (e) =>{
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    };

    const handleUpload = ()=>{
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes)*100
                );
                setProgress(progress);
            },
            (error) =>{
                //Error function....
                console.log(error);
                alert(error.message);
            },
            () =>{
                  //complete function...
                  storage
                  .ref("images")
                  .child(image.name)
                  .getDownloadURL()
                  .then(url =>{
                      //posts inside the database
                      db.collection('posts').add({
                          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                          caption: caption,
                          imageURL: url,
                          username: props.username
                      });
                      setProgress(0);
                      setImage(null);
                      
        
                      
                  })
                  
                  setCaption("");
                
            }
        );
                      
    };

    return (
    <div className='imageupload'>
        
        <progress className='imageupload__progress' value={progress} max="100"/>
        <input type='text' placeholder='Enter a caption....' onChange={event =>setCaption(event.target.value)}/>
        <input type='file' onChange={handleChange} />
        <Button className='imageupload__button' onClick={handleUpload}>Upload</Button>
    </div>
  )
}

export default ImageUpload