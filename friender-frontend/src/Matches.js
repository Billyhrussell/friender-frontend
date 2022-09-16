import { useState, useEffect } from "react";
// import UserCardList from "./UserCardList";
import FrienderApi from "./_api";
import Loading from "./Loading";


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
      <div key={u.username}>
        {u.fullName}
        {u.image && <img src={u.image}
          alt={u.fullName} />}
      </div>
    ))
    :
    <p> No matches yet!</p> }</>
  );

}

export default Matches;