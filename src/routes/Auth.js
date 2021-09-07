import AuthForm from "components/AuthForm"
import { auth } from "fBase"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import React from "react"

const Auth = () => {
  const onSocialClick = async event => {
    const { target: { name } } = event
    let provider
    if (name === "google") {
      provider = new GoogleAuthProvider()
    }
    await signInWithPopup(auth, provider)
  }

  return (
    <div>
      <AuthForm />
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
      </div>
    </div>
  )
}

export default Auth
