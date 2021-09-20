import React, { useEffect, useState } from "react"
import "components/App.css"
import AppRouter from "components/Router"
import { auth } from "fBase"
import { onAuthStateChanged, updateProfile } from "firebase/auth"

function App() {
  const [init, setInit] = useState(false)
  const [userObj, setUserObj] = useState(null)
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
          updateProfile: args => updateProfile(user, args)
        })
      } else {
        setUserObj(null)
      }
      setInit(true)
    })
  }, [])
  const refreshUser = () => {
    const user = auth.currentUser
    setUserObj({
      displayName: user.displayName,
      photoURL: user.photoURL,
      uid: user.uid,
      updateProfile: args => updateProfile(user, args)
    })
  }
  return (
    <div>
      {init
        ? <AppRouter refreshUser={refreshUser} isLoggedin={Boolean(userObj)} userObj={userObj} />
        : <h1>Initializing...</h1>}
      <footer>
        &copy; Nwitter {new Date().getFullYear()}
      </footer>
    </div>
  )
}

export default App
