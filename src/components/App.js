import React, { useEffect, useState } from "react"
import AppRouter from "components/Router"
import { auth } from "fBase"
import { onAuthStateChanged } from "firebase/auth"

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedin, setIsLoggedIn] = useState(false)
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  }, [])
  return (
    <div>
      {init ? <AppRouter isLoggedin={isLoggedin} /> : "Initializing..."}
      <footer>
        &copy; Nwitter {new Date().getFullYear()}
      </footer>
    </div>
  )
}

export default App
