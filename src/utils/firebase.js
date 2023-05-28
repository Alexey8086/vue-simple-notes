// Import necessary Firebase modules
import { initializeApp } from 'firebase/app'
import { doc, getFirestore, collection, getDocs, getDoc  } from 'firebase/firestore'
import { getAuth, updateProfile, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"


// Initialize Firebase app
const firebaseConfig = {
  apiKey: process.env.VUE_APP_DB_KEY,
  authDomain: "vue-simple-notes.firebaseapp.com",
  projectId: "vue-simple-notes",
  storageBucket: "vue-simple-notes.appspot.com",
  messagingSenderId: "651137149001",
  appId: "1:651137149001:web:c7d1a8f5914b930df5f798"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore(app)
const Collection = collection

// Sign In function
export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    await userCredential?.user.getIdToken(true)
    return userCredential?.user
  } catch (error) {
    if (error.code) throw error
    else throw new Error(error.code)
  }
}

// Sign Up function
export async function signUp({email, password, username}) {
    try {
        const user = auth.currentUser
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        await userCredential.user.getIdToken(true)

        await updateProfile(user, {
          displayName: username,
          photoURL: 'test'
        })

        return userCredential.user
    } catch (e) {
        throw new Error(`Error in signUp firebase function: ${e}`)
    }

}

// update user Profile changing all user fields: email, password, displayName, photoUrl
export async function updateProfileCustom(body) {
    try {
      const user = auth.currentUser

      const userCredential = await updateProfile(user, {...body})
      
      customLog(userCredential)
      return userCredential
    } catch (e) {
        throw new Error(`Error in updateProfile firebase function: ${e}`)
    }
  }

// Get document from a collection function
export async function getDocument(collection, docId) {
    try {
        const docRef = doc(db, collection, docId)
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
            return docSnap.data()
        } else {
          return null
        }
    } catch (e) {
        throw new Error('Error in getDocument firebase function: ', e)
    }
}

// Get all documents with same uid in collection (other words getting all docs which was created by single user)
export async function getDocumentsByUid(collection, uid) {
    try {
      const querySnapshot = await Collection(db, collection).where('uid', '==', uid).get()
      const documents = []
      querySnapshot.forEach((item) => {
        documents.push(item.data())
      })
      return documents
    } catch (e) {
        throw new Error('Error in getDocumentsByUid firebase function: ', e)
    }
}