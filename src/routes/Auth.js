import { auth } from "fBase"
import React, { useState } from "react"

const Auth = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [newAccount, setNewAccount] = useState(true)
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
      let data
      if (newAccount) {
        data = await auth.createUserWithEmailAndPassword(email, password)
      } else {
        data = await auth.signInWithEmailAndPassword(email, password)
      }
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
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
        <input type="submit" value={newAccount ? "Create Account" : "LOG IN"} />
      </form>
      <div>
        <button>Continue with Google</button>
      </div>
    </div>
  )
}

export default Auth
