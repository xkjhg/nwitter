import { db, storage } from "fBase"
import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"
import React, { useState } from "react"
import "components/Nweet.css"
import { Link } from "react-router-dom"

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
            <Link
              to={{
                pathname: `/detail/${nweetObj.createdAt}`,
                state: { nweetObj, isOwner, userObj }
              }}
            >
              <div className="nweetProfile">
                <h3>
                  {userObj.photoURL && <img src={userObj.photoURL} width="50px" height="50px" />}
                  {userObj.displayName}
                </h3>
              </div>
              <h4>
                {nweetObj.text}
              </h4>
              {nweetObj.attachmentUrl &&
                <img src={nweetObj.attachmentUrl} width="50px" height="50px" />}
              {isOwner &&
                <div>
                  <button onClick={onDeleteClick}>DELETE</button>
                  <button onClick={toggleEditing}>EDIT</button>
                </div>}
            </Link>
          </div>}
    </div>
  )
}

export default Nweet
