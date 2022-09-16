import { Link } from "react-router-dom"

function UserCard({ user}){
  const {username, fullName, hobbies, interests, zipcode, radius, image} = user;
  console.log("INSIDE USER CARD")

  console.log(username, fullName, hobbies, interests, zipcode, radius, image)

  return (
    <Link to={`/users/${username}`}>
      <div>
        {fullName}
        {image && <img src={image}
        alt = {fullName}/>}
       </div>
    </Link>
  )
}

export default UserCard;