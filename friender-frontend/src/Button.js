/** Handles like/dislike of a user's profile */
function Button({like, dislike}){
  return (
    <>
    <button onClick={like}>
      LIKE ME!
    </button>
    <button onClick={dislike}>
      DON'T LIKE ME?
    </button>
    </>
  )

}
export default Button;