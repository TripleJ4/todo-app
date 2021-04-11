import { useContext } from "react"
import { RealmAppContext } from "components/providers/RealmAppProvider"

const useRealmApp = () => {
  const app = useContext(RealmAppContext)
  if (!app) {
    throw new Error(
      `You must call useRealmApp() inside of a <RealmAppProvider />`
    )
  }
  return app
}

export default useRealmApp
