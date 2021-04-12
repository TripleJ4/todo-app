import { useState } from "react"
import * as Realm from "realm-web"
import useRealmApp from "hooks/useRealmApp"

import { Layout, Typography, Button } from "antd"

import LoginForm from "components/forms/LoginForm"
import CreateAccountForm from "components/forms/CreateAccountForm"

const { Title } = Typography

type FormType = "login" | "create-account"

const AuthForms = () => {
  const app = useRealmApp()
  const [form, setForm] = useState<FormType>("login")

  const handleLogin = async ({ email, password }) => {
    try {
      await app.logIn(Realm.Credentials.emailPassword(email, password))
    } catch (err) {
      console.warn(err)
    }
  }

  const handleRegistrationAndLogin = async ({ email, password }) => {
    try {
      await app.emailPasswordAuth.registerUser(email, password)
      return await app.logIn(Realm.Credentials.emailPassword(email, password))
    } catch (err) {
      console.warn(err)
    }
  }

  return (
    <div className="max-w-md mx-auto shadow-lg p-8 m-8">
      {form === "login" && (
        <>
          <Title>Log In</Title>
          <LoginForm onFinish={handleLogin} />
          <Button type="link" onClick={() => setForm("create-account")}>
            Create account
          </Button>
        </>
      )}
      {form === "create-account" && (
        <>
          <Title>Create Account</Title>
          <CreateAccountForm onFinish={handleRegistrationAndLogin} />
          <Button type="link" onClick={() => setForm("login")}>
            Log In
          </Button>
        </>
      )}
    </div>
  )
}

export default AuthForms
