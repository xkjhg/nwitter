import { auth } from "fBase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import React, { useState } from "react"
import "components/AuthForm.css"

const AuthForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [newAccount, setNewAccount] = useState(false)
  const [error, setError] = useState("")
  const onChange = event => {
    const { target: { name, value } } = event
    if (name === "email") {
      setEmail(value)
    } else if (name === "password") {
      setPassword(value)
    }
  }
  const onSubmit = async event => {
    event.preventDefault()
    try {
      if (newAccount) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
    } catch (error) {
      setError(Array(error)[0].message.split("/")[1].replace(").", ""))
    }
  }
  const toggleAccount = () => {
    setNewAccount(prev => !prev)
  }
  return (
    <div className="authFormContainer">
      <form className="authForm" onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          required
        />
        <input type="submit" value={newAccount ? "Create Account" : "Sign In"} />
      </form>
      <span className="toggleAuth" onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
      <h4 className="errorAuth">
        {error}
      </h4>
    </div>
  )
}

export default AuthForm
