import {Navigate, useParams } from 'react-router-dom'
import {useEffect, useState, useContext } from 'react'
import FrienderApi from './_api';
import Loading from './Loading';
import Button from './Button';
import { useNavigate } from "react-router-dom";
import userContext from "./userContext";

function UserDetail({cantfind}){
  const { currentUser } = useContext(userContext);
  const {username} = useParams();
  const [user, setUser] = useState(null);
  const [errors, setFormErrors] = useState([])

  const navigate = useNavigate();

  useEffect(function userInfo() {
    async function getUserInfo() {
      try{
        const user = await FrienderApi.getOneUser(username);
        setUser(user);
      } catch(err){
        console.log("EDOR", err);
        setFormErrors(err)
      }
    }
    getUserInfo();
  },[username]);


  async function likeUser(){
    const resp = await FrienderApi.likeOneUser(username);
    console.log("RESP", resp)
  
    if (resp === "It's a match!") {
      alert ("It's a match!")
      navigate("/matches")
    }
    else {
    navigate("/users")
    }
  }

  async function dislikeUser(){
    await FrienderApi.dislikeOneUser(username);
    navigate("/users")
  }


  if (!user && errors.length < 1) return (<Loading />);

  return(
    <div>
      {errors.length > 0
      ?
      <Navigate to={cantfind} />
      :
      <>
      <h2>{user.username}</h2>
      <h4> {user.fullName} </h4>
        {user.image && <img src={user.image}
        alt = {user.fullName}/>}

      <h4>Hobbies: {user.hobbies}</h4>
      <h4>interests: {user.interests}</h4>
      {user.username !== currentUser.username
      ?
      <Button like={likeUser} dislike={dislikeUser} />
      :
      null
      }
      </>
}
    </div>
  )
}

export default UserDetail