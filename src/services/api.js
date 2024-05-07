import {
  collection,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore"
import { db } from "../firebase-config"

export function getAllUsers() {
  const usersCollectionRef = collection(db, "users")
  const data = getDocs(usersCollectionRef)
  return data.then((res) =>
    res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  )
}

export default async function fetchUserByID(id) {
  if (!id) return null

  const docRef = doc(db, "users", id)
  const docSnap = await getDoc(docRef)
  return docSnap.data()
}

export async function createUser({ data, image }) {
  if (!data) return null

  const usersCollectionRef = collection(db, "users")
  await addDoc(usersCollectionRef, { ...data, image })
}
export async function editUser({ updatedData, id }) {
  if (!id) return null

  const userDoc = doc(db, "users", id)
  await updateDoc(userDoc, updatedData)
}
export async function deleteUser({ id }) {
  if (!id) return null

  const userDoc = doc(db, "users", id)
  await deleteDoc(userDoc)
}
