import { useState, createContext, ReactNode } from 'react'

import { TwitterAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase'
import {
    saveTwitterUserToLocalStorage,
    getTwitterUser,
    deleteTwitterUserFromLocalStorage,
} from '../lib/localStorage'
import { postUserToDb } from '../lib/firebaseActions'
import { useAlert } from './AlertContext'
//import { MAX_WORD_LENGTH, REVEAL_TIME_MS } from '../constants/settings'

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

    const { showError: showErrorAlert } = useAlert()

    const twitterSignIn = () => {
        if (authenticated) return

        const provider = new TwitterAuthProvider()
        signInWithPopup(auth, provider)
            .then((res) => {
                saveTwitterUserToLocalStorage(res.user)
                checkUserAuth()
            })
            .catch((err) => {
                showErrorAlert(
                    `Ups, que vergüenza para la Web2. Hubo un error iniciando sesión con Twitter.`
                )
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

                showErrorAlert(
                    `Ups, que vergüenza para la Web2. Hubo un error cerrando tu sesión con Twitter.`
                )
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
            console.log('Usuario no autenticado, intente nuevamente')
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
