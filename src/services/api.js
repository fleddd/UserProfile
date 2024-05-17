import {
  collection,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  addDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore"
import { db } from "../firebase-config"
import { auth } from "../firebase-config"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  updateEmail,
  updatePassword,
} from "firebase/auth"

export async function getAllUsers(uid) {
  const usersCollectionRef = collection(db, `users/${uid}/employees`)
  const data = getDocs(usersCollectionRef)
  return data.then((res) =>
    res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  )
}

export default async function fetchUserByID(uid, id) {
  if (!id) return null

  const docRef = doc(db, `users/${uid}/employees`, id)
  const docSnap = await getDoc(docRef)
  return docSnap.data()
}

export async function editUser({ updatedData, id, uid }) {
  if (!id) return null

  const userDoc = doc(db, `users/${uid}/employees`, id)
  await setDoc(userDoc, { data: updatedData }, { merge: true })
}
export async function deleteUser({ id, uid }) {
  if (!id) return null

  const userDoc = doc(db, `users/${uid}/employees`, id)
  await deleteDoc(userDoc)
}

export async function signupUser({ email, password }) {
  return createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      const user = userCredential.user
      const userData = {
        email: user.email,
        uid: user.uid,
        // Add any other user data you want to store
      }
      return createUserInDB(user.uid, userData)
    }
  )
}
export async function loginUser({ email, password }) {
  return signInWithEmailAndPassword(auth, email, password)
}

export async function createUserInDB(uid, data) {
  if (!uid || !data) throw new Error("Something wrong with data")

  const usersCollectionRef = doc(db, "users", uid)
  await setDoc(usersCollectionRef, { data })
}

export async function addEmployee({ uid, data }) {
  console.log(uid, data)
  const employeeCollectionRef = collection(db, `/users/${uid}/employees`)
  await addDoc(employeeCollectionRef, { data })
}
export async function updateUserData(email, password) {
  if (!email) throw new Error("Invalid email!")
  const auth = getAuth()
  const user = auth.currentUser
  await updateEmail(user, email)
  if (password) await updatePassword(user, password)
}
