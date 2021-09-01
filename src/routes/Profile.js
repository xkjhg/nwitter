import { auth } from "fBase"
import React from "react"
import { useHistory } from "react-router-dom"

const Profile = () => {
  const History = useHistory()
  const onLogOutClick = () => {
    auth.signOut()
    History.push("/")
  }
  return (
    <div>
      <button onClick={onLogOutClick}>LOG OUT</button>
    </div>
  )
}

export default Profile
