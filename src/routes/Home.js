import Nweet from "components/Nweet"
import { v4 as uuidv4 } from "uuid"
import { db, storage } from "fBase"
import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore"
import { getDownloadURL, ref, uploadString } from "firebase/storage"
import React, { useEffect, useState } from "react"

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("")
  const [nweets, setNweets] = useState([])
  const [attachment, setAttachment] = useState()
  const getNweets = async () => {
    const dbNweets = await getDocs(collection(db, "nweets"))
    dbNweets.forEach(doc => {
      const nweetObj = {
        ...doc.data(),
        id: doc.id
      }
      setNweets(prev => [nweetObj, ...prev])
    })
  }
  useEffect(() => {
    getNweets()
    onSnapshot(collection(db, "nweets"), snapshot => {
      const nweetArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setNweets(nweetArray)
    })
  }, [])
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
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Write" maxLength={120} value={nweet} onChange={onChange} />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
        {attachment &&
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>CLEAR</button>
          </div>}
      </form>
      <div>
        {nweets.map(nweet =>
          <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.createrId === userObj.uid} />
        )}
      </div>
    </div>
  )
}

export default Home
