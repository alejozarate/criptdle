import { useState, createContext, ReactNode } from 'react'

import { TwitterAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase'
import {
    saveTwitterUserToLocalStorage,
    getTwitterUser,
    deleteTwitterUserFromLocalStorage,
} from '../lib/localStorage'
import { postUserToDb } from '../lib/firebaseActions'

interface AppContextInterface {
    authenticated: boolean
    setAuthenticated: (authenticated: boolean) => void
    username: String | null
    setUsername: (username: string | null) => void
    twitterSignIn: () => void
    twitterSignOut: () => void
    checkUserAuth: () => void
}

export const TwitterCtx = createContext<AppContextInterface | null>(null)

// Provider in your app

type Props = {
    children?: ReactNode
}

export const TwitterProvider = ({ children }: Props) => {
    const [authenticated, setAuthenticated] = useState<boolean>(false)
    const [username, setUsername] = useState<string | null>('')

    const twitterSignIn = () => {
        const provider = new TwitterAuthProvider()
        signInWithPopup(auth, provider)
            .then((res) => {
                saveTwitterUserToLocalStorage(res.user)
                checkUserAuth()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const twitterSignOut = () => {
        auth.signOut()
            .then(() => {
                setAuthenticated(false)
                setUsername('')
                deleteTwitterUserFromLocalStorage()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const checkUserAuth = () => {
        const twitterData = getTwitterUser()
        const { displayName, uid } = twitterData

        if (displayName || uid) {
            setAuthenticated(true)
            setUsername(displayName)
            postUserToDb({ displayName, uid })
        } else {
            console.log('twitter user not recognized')
        }
    }

    return (
        <TwitterCtx.Provider
            value={{
                authenticated,
                setAuthenticated,
                username,
                setUsername,
                twitterSignIn,
                twitterSignOut,
                checkUserAuth,
            }}
        >
            {children}
        </TwitterCtx.Provider>
    )
}
