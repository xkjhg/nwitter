import Nweet from "components/Nweet"
import NweetFactory from "components/NweetFactory"
import { db } from "fBase"
import { collection, getDocs, onSnapshot } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import "routes/Home.css"

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
    <div className="homeContainer">
      <NweetFactory userObj={userObj} />
      <div className="nweetContainer">
        {nweets.map(nweet =>
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            userObj={userObj}
            isOwner={nweet.createrId === userObj.uid}
          />
        )}
      </div>
    </div>
  )
}

export default Home
