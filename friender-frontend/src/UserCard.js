import { Link } from "react-router-dom"

function UserCard({ username, fullName, hobbies, interests, zipcode, radius, image}){

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