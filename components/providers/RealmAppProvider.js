import { useState, useEffect, createContext } from "react"
import * as Realm from "realm-web"
import { useQueryClient } from "react-query"

export const RealmAppContext = createContext()

const RealmAppProvider = ({ appId, children }) => {
  const [app, setApp] = useState(new Realm.App(appId))
  useEffect(() => {
    setApp(new Realm.App(appId))
  }, [appId])

  // Wrap the Realm.App object's user state with React state
  const [currentUser, setCurrentUser] = useState(app.currentUser)
  const queryClient = useQueryClient()

  async function logIn(credentials) {
    await app.logIn(credentials)
    // If successful, app.currentUser is the user that just logged in
    setCurrentUser(app.currentUser)
  }
  async function logOut() {
    // Log out the currently active user
    await app.currentUser?.logOut()
    // If another user was logged in too, they're now the current user.
    // Otherwise, app.currentUser is null.
    setCurrentUser(app.currentUser)

    // Clear all data
    queryClient.clear()
  }

  const wrapped = { ...app, currentUser, logIn, logOut }

  return (
    <RealmAppContext.Provider value={wrapped}>
      {children}
    </RealmAppContext.Provider>
  )
}

export default RealmAppProvider
