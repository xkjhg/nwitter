import { db, storage } from "fBase"
import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"
import React, { useState } from "react"
import "components/Nweet.css"

const Nweet = ({ nweetObj, isOwner, userObj }) => {
  const [editing, setEditing] = useState(false)
  const [newNweet, setNewNweet] = useState(nweetObj.text)
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you Sure you want to delete this Nweet?")
    if (ok) {
      await deleteDoc(doc(db, "nweets", nweetObj.id))
      await deleteObject(ref(storage, `${nweetObj.attachmentUrl}`))
    }
  }
  const toggleEditing = () => {
    setEditing(prev => !prev)
  }
  const onSubmit = async event => {
    event.preventDefault()
    await updateDoc(doc(db, "nweets", nweetObj.id), {
      text: newNweet
    })
    setEditing(false)
  }
  const onChange = event => {
    const { target: { value } } = event
    setNewNweet(value)
  }
  return (
    <div>
      {editing
        ? <div className="editNweet">
            <form onSubmit={onSubmit}>
              <input
                type="text"
                placeholder="Edit your Nweet"
                value={newNweet}
                onChange={onChange}
                required
              />
              <input type="submit" value="Update" />
            </form>
            <button onClick={toggleEditing}>Cancel</button>
          </div>
        : <div className="nweet">
            <div className="nweetProfile">
              {userObj.photoURL
                ? <img className="profileImg" src={userObj.photoURL} />
                : <div className="profileCircle" />}
              <h3>
                {userObj.displayName}
              </h3>
            </div>
            <h4 className="nweetText">
              {nweetObj.text}
            </h4>
            {nweetObj.attachmentUrl && <img className="nweetImg" src={nweetObj.attachmentUrl} />}
            {isOwner &&
              <div className="nweetEditDel">
                <button className="nweetDeleteBtn" onClick={onDeleteClick}>
                  DEL
                </button>
                <button className="nweetEditBtn" onClick={toggleEditing}>
                  EDIT
                </button>
              </div>}
          </div>}
    </div>
  )
}

export default Nweet
