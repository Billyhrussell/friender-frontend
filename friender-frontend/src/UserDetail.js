import {Navigate, useParams } from 'react-router-dom'
import {useEffect, useState, useContext } from 'react'
import FrienderApi from './_api';
import Loading from './Loading';
import SwipeButton from './SwipeButton';
import { useNavigate } from "react-router-dom";
import userContext from "./userContext";
import {Card, CardBody, CardTitle, CardText} from 'reactstrap'
import './UserDetail.css'

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
    <>
      {errors.length > 0
      ?
      <Navigate to={cantfind} />
      :
      <>
      <Card style={{
          width: '80vh',
          height: '80vh',
          margin: '1rem',
          padding: '0.5rem',
          alignItems: "center",
          backgroundColor: 'rgba(36, 28, 9, 0.33)'
        }}>
        <CardBody >
        <CardTitle className = 'cardTitle' tag='h5'
        style={{padding: '2rem'}}>
      <h2>{user.username}</h2>
      <h4> {user.fullName} </h4>
      </CardTitle>
        {user.image && <img src={user.image}
        alt = {user.fullName}
        style={{
          maxHeight: "50vh",
          width: "auto",
        }}/>}

      <CardText className='cardText'
      style={{padding: '2rem'}}
      >
      <h4>Hobbies blahgkh garighi shgilhs ierlughsleuirg: {user.hobbies}</h4>
      <h4>interests: {user.interests}</h4>
      </CardText>
      {user.username !== currentUser.username
      ?
      <SwipeButton like={likeUser} dislike={dislikeUser} />
      :
      null
    }
    </CardBody>
      </Card>
      </>
}
    </>
  )
}

export default UserDetail