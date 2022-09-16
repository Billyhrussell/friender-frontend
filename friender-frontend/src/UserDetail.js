import {useParams } from 'react-router-dom'
import {useEffect, useState} from 'react'
import FrienderApi from './_api';
import Loading from './Loading';

function UserDetail(){
  const {username} = useParams();
  const [user, setUser] = useState(null);

  useEffect(function userInfo() {
    async function getUserInfo() {
      try{
        const user = await FrienderApi.getOneUser(username);
        setUser(user);
      } catch(err){
        console.log(err);
      }
    }
    getUserInfo();
  },[username]);


  if (!user) return (<Loading />);

  return(
    <div>
      <h2>{user.username}</h2>
      <h4> {user.fullName} </h4>
        {user.image && <img src={user.image}
        alt = {user.fullName}/>}

      <h4>Hobbies: {user.hobbies}</h4>
      <h4>interests: {user.interests}</h4>
    </div>
  )
}

export default UserDetail