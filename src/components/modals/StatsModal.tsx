import Countdown from 'react-countdown'
import { StatBar } from '../stats/StatBar'
import { Histogram } from '../stats/Histogram'
import { GameStats } from '../../lib/localStorage'
import { shareStatus } from '../../lib/share'
import { tomorrow } from '../../lib/words'
import { BaseModal } from './BaseModal'
import {
    STATISTICS_TITLE,
    GUESS_DISTRIBUTION_TEXT,
    NEW_WORD_TEXT,
    SHARE_TEXT,
} from '../../constants/strings'
import { WORDS_DESCRIPTION } from '../../constants/worddescription'
import { solution } from '../../lib/words'

type Props = {
    isOpen: boolean
    handleClose: () => void
    guesses: string[]
    gameStats: GameStats
    isGameLost: boolean
    isGameWon: boolean
    handleShareToClipboard: () => void
    isHardMode: boolean
    isDarkMode: boolean
    isHighContrastMode: boolean
    numberOfGuessesMade: number
}

export const StatsModal = ({
    isOpen,
    handleClose,
    guesses,
    gameStats,
    isGameLost,
    isGameWon,
    handleShareToClipboard,
    isHardMode,
    isDarkMode,
    isHighContrastMode,
    numberOfGuessesMade,
}: Props) => {
    if (gameStats.totalGames <= 0) {
        return (
            <BaseModal
                title={STATISTICS_TITLE}
                isOpen={isOpen}
                handleClose={handleClose}
            >
                <StatBar gameStats={gameStats} />
            </BaseModal>
        )
    }
    return (
        <BaseModal title={''} isOpen={isOpen} handleClose={handleClose}>
            <div className="items-center sm:flex">
                <div className="flex flex-col space-beetwen">
                    <div>
                        <p className="mb-4 text-xl font-medium leading-6 text-gray-900 underline text-md dark:text-gray-100">
                            {solution}
                        </p>
                        <p className="italic font-bold text-center text-gray-900 sm:px-1 text-md dark:text-gray-100">
                            {WORDS_DESCRIPTION[solution.toLowerCase()]}*
                        </p>
                    </div>
                    <div className="mt-6">
                        <small className="dark:text-white">
                            * Las definiciones son de{' '}
                            <a
                                href="https://www.defilatam.com/definiciones"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline outline-none"
                            >
                                DeFi Latam
                            </a>{' '}
                        </small>
                        <br />
                        <small className="dark:text-white mb-4 outline-none">
                            ** Para seguir aprendiendo de cripto sumate al{' '}
                            <a
                                href="https://discord.com/invite/kHvSC9WHzC"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                            >
                                discord de Solow
                            </a>
                        </small>
                    </div>
                </div>
                <div>
                    <h3 className="font-medium leading-6 text-gray-900 text-md dark:text-gray-100">
                        {STATISTICS_TITLE}
                    </h3>
                    <StatBar gameStats={gameStats} />
                    <h4 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
                        {GUESS_DISTRIBUTION_TEXT}
                    </h4>
                    <Histogram
                        gameStats={gameStats}
                        numberOfGuessesMade={numberOfGuessesMade}
                    />
                    {(isGameLost || isGameWon) && (
                        <div className="mt-5 sm:mt-6 dark:text-white">
                            <h5>{NEW_WORD_TEXT}</h5>
                            <div>
                                <Countdown
                                    className="text-lg font-medium text-gray-900 dark:text-gray-100"
                                    date={tomorrow}
                                    daysInHours={true}
                                />
                            </div>
                            <button
                                type="button"
                                className="w-full px-4 py-2 mt-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                onClick={() => {
                                    shareStatus(
                                        guesses,
                                        isGameLost,
                                        isHardMode,
                                        isDarkMode,
                                        isHighContrastMode,
                                        handleShareToClipboard
                                    )
                                }}
                            >
                                {SHARE_TEXT}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </BaseModal>
    )
}
