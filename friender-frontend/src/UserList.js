import { useState, useEffect } from "react";
import FrienderApi from "./_api";
import Loading from "./Loading";

import UserCardList from "./UserCardList"

function UserList() {
  const [users, setUsers] = useState(null);

  useEffect(function getUsersOnMount() {
    async function listUsers() {
      let users = await FrienderApi.getAllUsers();
      setUsers(users);
    }
    listUsers()
  }, []);

  if (!users) return <Loading />;



  console.log("INSIDE USER LIST")
  return (
    <div>

      <UserCardList users={users}/>
      {/* {users.map(u => (
        <UserCard
          key={u.username}
          username={u.username}
          fullName={u.fullName}
          hobbies={u.hobbies}
          interests={u.interests}
          zipcode={u.zipcode}
          radius={u.radius}
          image={u.image}
          />
        ))} */}
    </div>

  );


}
export default UserList