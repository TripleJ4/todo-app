import useRealmApp from "hooks/useRealmApp"

const useCollection = (collection: string) => {
  const app = useRealmApp()
  const mongodb = app.currentUser?.mongoClient("mongodb-atlas")
  if (!mongodb) return null
  return mongodb.db("development").collection(collection)
}

export default useCollection
