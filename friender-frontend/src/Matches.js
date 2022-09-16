import { useState, useEffect } from "react";
// import UserCardList from "./UserCardList";
import FrienderApi from "./_api";
import Loading from "./Loading";
import {Card, CardBody, CardTitle, CardText} from 'reactstrap'
import './Matches.css'


/** Show current user's matches */
function Matches() {
  const [users, setUsers] = useState(null);

  useEffect(function getMatchesOnMount() {
    async function listUsers() {
      let users = await FrienderApi.getMatches();
      setUsers(users);
    }
    listUsers();
  }, []);

  if (!users) return <Loading />;

  return (<>
  {users.length > 0
  ?
  users.map(u => (
    <Card className="oneCard">
      <CardTitle className='cardTitle' tag="h5">
        {u.username}
      </CardTitle>

      <div className='image' key={u.username}>
        {u.fullName}
        {u.image && <img src={u.image}
          alt={u.fullName} />}

        <CardText className='cardText'>
          <h4>Hobbies: {u.hobbies}sssssssss</h4>
          <h4>interests: {u.interests}</h4>
        </CardText>
      </div>
    </Card>
    ))
    :
    <p> No matches yet!</p> }</>
  );

}

export default Matches;