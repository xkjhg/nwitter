import { auth } from "fBase"
import { updateProfile } from "firebase/auth"
import React, { useState } from "react"
import { useHistory } from "react-router-dom"

const Profile = ({ refreshUser, userObj }) => {
  const History = useHistory()
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)
  const onLogOutClick = () => {
    auth.signOut()
    History.push("/")
  }
  const onChange = event => {
    const { target: { value } } = event
    setNewDisplayName(value)
  }
  const onSubmit = event => {
    event.preventDefault()
    if (userObj.displayName !== newDisplayName) {
      updateProfile(auth.currentUser, {
        displayName: newDisplayName
      }).then(() => refreshUser())
    }
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Your display name"
          value={newDisplayName}
          onChange={onChange}
        />
        <input type="submit" value="UPDATE" />
      </form>
      <button onClick={onLogOutClick}>LOG OUT</button>
    </div>
  )
}

export default Profile
