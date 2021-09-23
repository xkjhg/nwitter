import EditProfile from "components/EditProfile"
import React from "react"
import "routes/Profile.css"

const Profile = ({ refreshUser, userObj }) => {
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
      <div className="profileBtn">
        <EditProfile userObj={userObj} refreshUser={refreshUser} />
      </div>
    </div>
  )
}

export default Profile
