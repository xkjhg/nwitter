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
    let profileImgUrl = ""
    if (profileImg !== "") {
      const attachmentRef = ref(storage, `${userObj.uid}/profileImg`)
      const response = await uploadString(attachmentRef, profileImg, "data_url")
      profileImgUrl = await getDownloadURL(response.ref)
    }
    if (userObj.displayName !== newDisplayName) {
      updateProfile(auth.currentUser, {
        displayName: newDisplayName
      }).then(() => refreshUser())
    } else if (userObj.photoURL !== profileImgUrl) {
      updateProfile(auth.currentUser, {
        photoURL: profileImgUrl
      })
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
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Your display name"
          value={newDisplayName}
          onChange={onChange}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="UPDATE" />
      </form>
      <button onClick={onLogOutClick}>LOG OUT</button>
    </div>
  )
}

export default Profile
