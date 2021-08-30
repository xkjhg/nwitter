import React, { useState } from "react"
import AppRouter from "components/Router"
import { auth } from "fBase"

function App() {
  console.log(auth.currentUser)
  const [isLoggedin, setIsLoggedIn] = useState(false)
  return (
    <div>
      <AppRouter isLoggedin={isLoggedin} />
      <footer>
        &copy; Nwitter {new Date().getFullYear()}
      </footer>
    </div>
  )
}

export default App
