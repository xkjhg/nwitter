import Nweet from "components/Nweet"
import { db } from "fBase"
import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore"
import React, { useEffect, useState } from "react"

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("")
  const [nweets, setNweets] = useState([])
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
    await addDoc(collection(db, "nweets"), {
      text: nweet,
      createdAt: Date.now(),
      createrId: userObj.uid
    })
    setNweet("")
  }
  const onChange = event => {
    const { target: { value } } = event
    setNweet(value)
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Write" maxLength={120} value={nweet} onChange={onChange} />
        <input type="submit" value="Nweet" />
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
