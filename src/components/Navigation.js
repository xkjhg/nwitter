import React from "react"
import { Link } from "react-router-dom"
import "components/Navigation.css"

const Navigation = ({ userObj }) => {
  return (
    <nav className="nav">
      <Link to="/">Home</Link>
      <Link to="/profile">
        {userObj.displayName}'s Profile
      </Link>
    </nav>
  )
}

export default Navigation
