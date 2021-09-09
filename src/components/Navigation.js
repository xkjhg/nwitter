import React from "react"
import { Link } from "react-router-dom"
import "components/Navigation.css"
import { getDownloadURL, ref } from "firebase/storage"
import { storage } from "fBase"

const Navigation = ({ userObj }) => {
  const logoUrl = getDownloadURL(ref(storage, "nwitter/logo.jpg"))
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/">
            <img src={logoUrl} width="50px" height="50px" />
          </Link>
        </li>
        <li>
          <Link to="/profile">
            {userObj.displayName}'s Profile
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
