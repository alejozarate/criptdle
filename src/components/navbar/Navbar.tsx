import {
    ChartBarIcon,
    CogIcon,
    InformationCircleIcon,
    StarIcon,
} from '@heroicons/react/outline'
import { GAME_TITLE } from '../../constants/strings'
import { TwitterCtx } from '../../context/TwitterContext'
import { postUserToDb } from '../../lib/firebaseActions'

import UAuth from '@uauth/js'
import { createContext, useContext, useState } from 'react'

type Props = {
    setIsInfoModalOpen: (value: boolean) => void
    setIsStatsModalOpen: (value: boolean) => void
    setIsRankingModalOpen: (value: boolean) => void
    setIsSettingsModalOpen: (value: boolean) => void
}

const uauth = new UAuth({
    clientID: 'c393e2c7-3dda-47d6-a571-a936680d87ae',
    redirectUri: 'https://criptdle-git-hackathon-alejozarate.vercel.app/',
    scope: 'openid wallet',
})

interface AppContextInterface {
    authenticated: boolean
    setAuthenticated: (authenticated: boolean) => void
    username: String | null
    setUsername: (username: string | null) => void
    UnstoppableSignIn: () => void
    UnstoppableSignOut: () => void
    checkUserAuth: () => void
}

export const UnstoppableCtx = createContext<AppContextInterface | null>(null)

export const Navbar = ({
    setIsInfoModalOpen,
    setIsStatsModalOpen,
    setIsRankingModalOpen,
    setIsSettingsModalOpen,
}: Props) => {
    const [authenticated, setAuthenticated] = useState<boolean>(false)
    const [username, setUsername] = useState<string | null>('')

    window.login = async () => {
        try {
            const authorization = await uauth.loginWithPopup()
            const displayName = authorization.idToken.sub
            const uid = authorization.idToken.wallet_address || ''

            console.log('Logged in ')
            console.log(authorization)
            console.log('Domain name: ', displayName)
            console.log('ETH address: ', uid)

            postUserToDb({ displayName, uid })
        } catch (error) {
            console.error(error)
        }
    }

    window.logout = async () => {
        await uauth.logout()
        console.log('Logged out with Unstoppable')
    }

    return (
        <div className="navbar">
            <div className="px-5 navbar-content">
                <div className="flex">
                    <InformationCircleIcon
                        className="w-6 h-6 mr-2 cursor-pointer dark:stroke-white"
                        onClick={() => setIsInfoModalOpen(true)}
                    />
                    <ChartBarIcon
                        className="w-6 h-6 mr-3 cursor-pointer dark:stroke-white"
                        onClick={() => setIsStatsModalOpen(true)}
                    />
                    <CogIcon
                        className="w-6 h-6 mr-3 cursor-pointer dark:stroke-white"
                        onClick={() => setIsSettingsModalOpen(true)}
                    />
                </div>
                <p className="absolute items-center hidden text-xl font-bold sm:flex ml-center dark:text-white">
                    <span>
                        <a
                            href="https://discord.gg/kHvSC9WHzC"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <img
                                src="./solow.png"
                                alt="Solow"
                                className="sLogo"
                            />
                        </a>
                    </span>
                    <span>{GAME_TITLE}</span>
                </p>
                <div className="right-icons">
                    <StarIcon
                        onClick={() => setIsRankingModalOpen(true)}
                        className="w-6 h-6 mr-3 cursor-pointer dark:stroke-white"
                    />
                    <button onClick={() => window.login()}>
                        Login with Unstoppable
                    </button>
                </div>
            </div>
            <hr></hr>
        </div>
    )
}
