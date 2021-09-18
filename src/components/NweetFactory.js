import React, { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { db, storage } from "fBase"
import { addDoc, collection } from "firebase/firestore"
import { getDownloadURL, ref, uploadString } from "firebase/storage"
import "components/NweetFactory.css"

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState("")
  const [attachment, setAttachment] = useState("")
  const onSubmit = async event => {
    event.preventDefault()
    let attachmentUrl = ""
    if (attachment !== "") {
      const attachmentRef = ref(storage, `${userObj.uid}/${uuidv4()}`)
      const response = await uploadString(attachmentRef, attachment, "data_url")
      attachmentUrl = await getDownloadURL(response.ref)
    }
    const nweetHome = {
      text: nweet,
      createdAt: Date.now(),
      createrId: userObj.uid,
      attachmentUrl
    }
    await addDoc(collection(db, "nweets"), nweetHome)
    setNweet("")
    setAttachment("")
  }
  const onChange = event => {
    const { target: { value } } = event
    setNweet(value)
  }
  const onFileChange = event => {
    const { target: { files } } = event
    const theFile = files[0]
    const reader = new FileReader()
    reader.onloadend = finishedEvent => {
      const { target: { result } } = finishedEvent
      setAttachment(result)
    }
    if (theFile) {
      reader.readAsDataURL(theFile)
    }
  }
  const onClearAttachment = () => setAttachment(null)
  return (
    <form className="newNweetForm" onSubmit={onSubmit}>
      <textarea
        className="newNweetTxt"
        rows="5"
        type="text"
        placeholder="Write"
        maxLength={120}
        value={nweet}
        onChange={onChange}
      />
      <label className="newNweetImg" for="input-file">
        Image
      </label>
      <input id="input-file" type="file" accept="image/*" onChange={onFileChange} />
      <input className="newNweetSubmit" type="submit" value="Nweet" />
      {attachment &&
        <div className="preview">
          <img className="previewImg" src={attachment} />
          <button className="previewImgClear" onClick={onClearAttachment}>
            CLEAR
          </button>
        </div>}
    </form>
  )
}

export default NweetFactory
