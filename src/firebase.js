import { initializeApp } from 'firebase/app'
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth'
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyB55G9myiJAkovyebaTTFGQmsgUL94UZGo',
  authDomain: 'todo-list-33455.firebaseapp.com',
  projectId: 'todo-list-33455',
  storageBucket: 'todo-list-33455.appspot.com',
  messagingSenderId: '191774894703',
  appId: '1:191774894703:web:4fe0f5d2f39dbad86bbb9a',
  measurementId: 'G-4Y57B6HNNH',
}
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const googleProvider = new GoogleAuthProvider()

const signInWithGoogle = async () => {
  const res = await signInWithPopup(auth, googleProvider)
  const { user } = res
  const q = query(collection(db, 'users'), where('uid', '==', user.uid))
  const docs = await getDocs(q)
  if (docs.docs.length === 0) {
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name: user.displayName,
      authProvider: 'google',
      email: user.email,
    })
  }
  return res
}
const logInWithEmailAndPassword = async (email, password) => {
  const res = await signInWithEmailAndPassword(auth, email, password)
  return res
}
const registerWithEmailAndPassword = async (name, email, password) => {
  const res = await createUserWithEmailAndPassword(auth, email, password)
  const { user } = res
  await addDoc(collection(db, 'users'), {
    uid: user.uid,
    name,
    authProvider: 'local',
    email,
  })
  return res
}
const sendPasswordReset = async (email) => {
  await sendPasswordResetEmail(auth, email)
}
const logout = async () => {
  await signOut(auth)
}
export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
}
