import Nweet from "components/Nweet"
import NweetFactory from "components/NweetFactory"
import { db } from "fBase"
import { collection, getDocs, onSnapshot } from "firebase/firestore"
import React, { useEffect, useState } from "react"

const Home = ({ userObj }) => {
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

  return (
    <div>
      <NweetFactory userObj={userObj} />
      <div>
        {nweets.map(nweet =>
          <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.createrId === userObj.uid} />
        )}
      </div>
    </div>
  )
}

export default Home
