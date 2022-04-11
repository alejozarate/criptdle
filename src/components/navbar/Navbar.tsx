import {
    ChartBarIcon,
    CogIcon,
    InformationCircleIcon,
} from '@heroicons/react/outline'
import { GAME_TITLE } from '../../constants/strings'
import TwitterButton from '../authentication/TwitterButton'

type Props = {
    setIsInfoModalOpen: (value: boolean) => void
    setIsStatsModalOpen: (value: boolean) => void
    setIsSettingsModalOpen: (value: boolean) => void
}

export const Navbar = ({
    setIsInfoModalOpen,
    setIsStatsModalOpen,
    setIsSettingsModalOpen,
}: Props) => {
    return (
        <div className="navbar">
            <div className="navbar-content px-5">
                <InformationCircleIcon
                    className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
                    onClick={() => setIsInfoModalOpen(true)}
                />
                <p className="text-xl ml-2.5 font-bold dark:text-white flex items-center">
                    <span>
                        <a
                            href="https://discord.gg/kHvSC9WHzC"
                            rel="noreferrer"
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
                    <ChartBarIcon
                        className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
                        onClick={() => setIsStatsModalOpen(true)}
                    />
                    <CogIcon
                        className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
                        onClick={() => setIsSettingsModalOpen(true)}
                    />
                    {/* Twitter login component */}
                    <TwitterButton />
                </div>
            </div>
            <hr></hr>
        </div>
    )
}
