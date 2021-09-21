import { auth, storage } from "fBase"
import { updateProfile } from "firebase/auth"
import { getDownloadURL, ref, uploadString } from "firebase/storage"
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import "routes/Profile.css"

const Profile = ({ refreshUser, userObj }) => {
  const History = useHistory()
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)
  const [profileImg, setProfileImg] = useState("")
  const onLogOutClick = () => {
    auth.signOut()
    History.push("/")
  }
  const onChange = event => {
    const { target: { value } } = event
    setNewDisplayName(value)
  }
  const onSubmit = async event => {
    event.preventDefault()
    if (profileImg !== "") {
      const attachmentRef = ref(storage, `${userObj.uid}/profileImg`)
      const response = await uploadString(attachmentRef, profileImg, "data_url")
      const profileImgUrl = await getDownloadURL(response.ref)
      updateProfile(auth.currentUser, {
        photoURL: profileImgUrl
      }).then(() => refreshUser())
      setProfileImg("")
    }
    if (userObj.displayName !== newDisplayName) {
      updateProfile(auth.currentUser, {
        displayName: newDisplayName
      }).then(() => refreshUser())
    }
  }
  const onFileChange = event => {
    const { target: { files } } = event
    const theFile = files[0]
    const reader = new FileReader()
    reader.onloadend = finishedEvent => {
      const { target: { result } } = finishedEvent
      setProfileImg(result)
    }
    if (theFile) {
      reader.readAsDataURL(theFile)
    }
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
      <form className="profileEdit" onSubmit={onSubmit}>
        <input
          className="displayNameEdit"
          type="text"
          placeholder="Your display name"
          value={newDisplayName}
          onChange={onChange}
        />
        <label className="profileImgUp" for="profileImgEdit">
          Profile Image
        </label>
        <input id="profileImgEdit" type="file" accept="image/*" onChange={onFileChange} />
        <input className="ProfileEditSubmit" type="submit" value="UPDATE" />
      </form>
      <button className="LogOutBtn" onClick={onLogOutClick}>
        LOG OUT
      </button>
    </div>
  )
}

export default Profile
