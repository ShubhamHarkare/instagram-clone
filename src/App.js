import { Input, Modal} from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import './App.css';
import Post from './components/Post';
import {db,auth} from "./firebase.js";
import ImageUpload from './components/ImageUpload';

//Material UI styling//
/**********************************/
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};







function App() {
  const [posts, setPosts] = useState([]);
  const [openSignIn,setopenSignIn] = useState(false);
  const [open,setOpen] = useState(true);
  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [user,setUser] = useState(null);
  useEffect(()=>{
    const unsubsribe = auth.onAuthStateChanged((authUser)=>{
      if (authUser){
        console.log(authUser);
        setUser(authUser);


      }else{
        // user has logged out
        setUser(null)
      }
    })
    return ()=>{
      unsubsribe();
    }
  },[user,username])

  // useEffect -> runs a code based on a specific condition
  useEffect(()=>{

    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>{
      //Every time their is a change in the docs on firebase this piece of code will run.
      setPosts(snapshot.docs.map(doc=>({
        id:doc.id,
        post:doc.data()
      })))
    })
  },[])

  const signUp = (event) =>{
    //Prevents the form from reloading every time the page refreshes
    event.preventDefault();
    // Firebase user authentication
    auth
    .createUserWithEmailAndPassword(email,password) 
    .then((authUser)=>{
      return authUser.user.updateProfile({
        displayName : username
      })
    })
    .catch((err)=>{alert(err.message)})
  }
  const signIn = (event)=>{
    event.preventDefault();
    auth.signInWithEmailAndPassword(email,password )
    .catch((error) => alert(error.message))

    setopenSignIn(false);
  
  }
  
  
  return (
    


    <div className="App">
      
      <Modal
        open={open}
        onClose={()=>{setOpen(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          
          <form className='app__signup'>
          <center>
              <img 
              className='app_headerImage'
              src = "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt = ""
              />
              </center>
              <Input
                placeholder='username'
                type='text'
                value ={username}
                onChange={(e)=>setUsername(e.target.value)}

              />
              <Input
                placeholder='email'
                type = 'text'
                value = {email}
                onChange={(e)=>setEmail(e.target.value)}
              />
              <Input
                placeholder='password'
                type = 'password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
              <Button onClick={signUp}>Sign Up</Button>


            
          </form>
          
          </Typography>
        </Box>
      </Modal>
      {/* Modal 2 */}
      <Modal
        open={openSignIn}
        onClose={()=>{setopenSignIn(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          
          <form className='app__signup'>
          <center>
              <img 
              className='app_headerImage'
              src = "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt = ""
              />
              </center>
              
              <Input
                placeholder='email'
                type = 'text'
                value = {email}
                onChange={(e)=>setEmail(e.target.value)}
              />
              <Input
                placeholder='password'
                type = 'password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
              <Button onClick={signIn}>Sign In</Button>


            
          </form>
          
          </Typography>
        </Box>
      </Modal>



      
      <div className='app__header'>
      <img className='app__headerImage' 
      src='https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png'
      alt='Instagram'
      />
            {user ? (
        <Button type='submit' onClick={()=>auth.signOut()}>LogOut</Button>
      ):
      <div className='login__container'>
      <Button type='submit' onClick={()=>{setopenSignIn(true)}}>Sign In</Button>
      <Button type='submit' onClick={()=>{setOpen(true)}}>Sign Up</Button>
      </div>
      }


      </div>

      <div className='app__post'>
      <div className='app__post__2'>
        { posts.map(({id,post})=>{
          return <Post postId={id} user={user} key={id} imageURL={post.imageURL} username={post.username} caption={post.caption} />
        })}
        {user?.displayName ?(
          <ImageUpload username={user.displayName}/>):(
            <h3>Login to Upload</h3>
          )}

          </div>


      </div>

      
      


    </div>
  );
}

export default App;
