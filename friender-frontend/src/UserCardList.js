import UserCard from "./UserCard"

function UserCardList({ users }) {
  console.log("INSIDE USER CARD  LIST")
  return (
    <div>
      {users.map(user =>
        <UserCard key={user.username} user={user}  />)}
    </div>
  );
}

export default UserCardList;