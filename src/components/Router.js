import React, { useState } from "react"
import { HashRouter as Router, Route, Switch } from "react-router-dom"
import Auth from "../routes/Auth"
import Home from "../routes/Home"

const AppRouter = () => {
  const [isLoggedin, setIsLoggedIn] = useState()
  return (
    <Router>
      <Switch>
        {isLoggedin
          ? <div>
              <Route exact path="/">
                <Home />
              </Route>
            </div>
          : <Route exact path="/">
              <Auth />
            </Route>}
      </Switch>
    </Router>
  )
}

export default AppRouter
