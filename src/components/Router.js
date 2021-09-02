import React from "react"
import { HashRouter as Router, Route, Switch } from "react-router-dom"
import Auth from "routes/Auth"
import Home from "routes/Home"
import Profile from "routes/Profile"
import Navigation from "components/Navigation"

const AppRouter = ({ isLoggedin, userObj }) => {
  return (
    <Router>
      {isLoggedin && <Navigation />}
      <Switch>
        {isLoggedin
          ? <div>
              <Route exact path="/">
                <Home userObj={userObj} />
              </Route>
              <Route exact path="/profile">
                <Profile />
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
