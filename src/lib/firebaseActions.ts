import { db } from '../firebase'
import {
    doc,
    setDoc,
    updateDoc,
    getDoc,
    getDocs,
    collection,
} from 'firebase/firestore'
import { getTwitterUser } from './localStorage'

interface dataUser {
    displayName: string
    uid: string
}

export interface rankeredUser {
    sort: any
    map: any
    userId: string
    username: string
    score: number
    copinha: number
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
        const newUser = {
            username: data.displayName,
            userId: data.uid,
            score: null,
        }
        await setDoc(doc(db, 'users', newUser.userId), newUser)
    }
}

export const updateScore = async (newScore: number) => {
    const localStorageUser = getTwitterUser()
    const docRef = doc(db, 'users', localStorageUser.uid)

    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        const { score } = docSnap.data()
        await updateDoc(doc(db, 'users', localStorageUser.uid), {
            score: score + newScore,
        })
    } else {
        alert('No se pudo actualizar el score')
    }
}

export const getRanking = async () => {
    let users: any = []
    const querySnapshot = await getDocs(collection(db, 'users'))
    querySnapshot.forEach((doc) => {
        const { userId, username, score } = doc.data()
        if (score || score === 0) {
            users.push({
                userId,
                username,
                score,
            })
        }
    })

    let orderedRanking = users.sort(
        (a: { score: number }, b: { score: number }) => {
            return b.score - a.score
        }
    )

    return orderedRanking
}

getRanking()
