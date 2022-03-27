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
  apiKey: 'AIzaSyDOI0kDE2RGTWEP9cfbSzyeX1K_lFB6WMU',
  authDomain: 'todo-list-auth-e7eb3.firebaseapp.com',
  databaseURL:
    'https://todo-list-auth-e7eb3-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'todo-list-auth-e7eb3',
  storageBucket: 'todo-list-auth-e7eb3.appspot.com',
  messagingSenderId: '446437704958',
  appId: '1:446437704958:web:28d7d17323a735d177d1af',
  measurementId: 'G-XY57EGRFE6',
}
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const googleProvider = new GoogleAuthProvider()

const signInWithGoogle = async () => {
  try {
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
  } catch (err) {
    console.error(err)
  }
}
const logInWithEmailAndPassword = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
}
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const { user } = res
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    })
  } catch (err) {
    console.error(err)
  }
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
