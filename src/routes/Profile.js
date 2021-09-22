import EditProfile from "components/EditProfile"
import { auth } from "fBase"
import React from "react"
import { useHistory } from "react-router-dom"
import "routes/Profile.css"

const Profile = ({ refreshUser, userObj }) => {
  const History = useHistory()
  const onLogOutClick = () => {
    auth.signOut()
    History.push("/")
  }
  return (
    <div className="profileContainer">
      <div className="profileInfo">
        {userObj.photoURL
          ? <img className="profileImg" src={userObj.photoURL} />
          : <div className="profileCircle" />}
        <h3 className="profileDisplayName">
          {userObj.displayName}
        </h3>
      </div>
      <EditProfile userObj={userObj} refreshUser={refreshUser} />
      <button className="LogOutBtn" onClick={onLogOutClick}>
        LOG OUT
      </button>
    </div>
  )
}

export default Profile
