import { auth, storage } from "fBase"
import { updateProfile } from "firebase/auth"
import { getDownloadURL, ref, uploadString } from "firebase/storage"
import React, { useState } from "react"
import "components/EditProfile.css"

const EditProfile = ({ refreshUser, userObj }) => {
  const [editing, setEditing] = useState(false)
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)
  const [profileImg, setProfileImg] = useState("")
  const toggleEditing = () => {
    setEditing(prev => !prev)
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
    setEditing(false)
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
    <div>
      {editing
        ? <div className="profileEditContainer">
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
            <button onClick={toggleEditing}>Cancel</button>
          </div>
        : <div>
            <button className="EditProfileBtn" onClick={toggleEditing}>
              Edit Profile
            </button>
          </div>}
    </div>
  )
}

export default EditProfile
