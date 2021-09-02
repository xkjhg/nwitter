import React, { useEffect, useState } from "react"
import AppRouter from "components/Router"
import { auth } from "fBase"
import { onAuthStateChanged } from "firebase/auth"

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedin, setIsLoggedIn] = useState(false)
  const [userObj, setUserObj] = useState(null)
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setIsLoggedIn(true)
        setUserObj(user)
      } else {
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  }, [])
  return (
    <div>
      {init ? <AppRouter isLoggedin={isLoggedin} userObj={userObj} /> : "Initializing..."}
      <footer>
        &copy; Nwitter {new Date().getFullYear()}
      </footer>
    </div>
  )
}

export default App
