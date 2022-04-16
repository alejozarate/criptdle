import { db } from '../firebase'
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore'
import { getTwitterUser } from './localStorage'

interface dataUser {
    displayName: string
    uid: string
}

const checkUserExists = async (uid: string) => {
    const docRef = doc(db, 'users', uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        return true
    }
    return false
}

export const postUserToDb = async (data: dataUser) => {
    const exists = await checkUserExists(data.uid)

    if (exists) {
        return
    } else {
        console.log('no existe')
        const newUser = {
            username: data.displayName,
            userId: data.uid,
            score: 0,
        }
        await setDoc(doc(db, 'users', newUser.userId), newUser)
        console.log('creado')
    }
}

export const updateScore = async (newScore: number) => {
    const localStorageUser = getTwitterUser()

    await updateDoc(doc(db, 'users', localStorageUser.uid), {
        score: newScore,
    })
}
