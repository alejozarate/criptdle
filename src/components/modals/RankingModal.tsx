import { useContext, useEffect, useState } from 'react'
import { BaseModal } from './BaseModal'

import { getRanking, rankeredUser } from '../../lib/firebaseActions'
import {
    NEXT_PAGINATION_TEXT,
    PREVIOUS_PAGINATION_TEXT,
} from '../../constants/strings'

import { TwitterCtx } from '../../context/TwitterContext'
import { MAX_QTY_USERS_PER_PAGE } from '../../constants/settings'

type Props = {
    isOpen: boolean
    handleClose: () => void
}

export const RankingModal = ({ isOpen, handleClose }: Props) => {
    const [ranking, setRanking] = useState<rankeredUser[]>([])
    const [page, setPage] = useState(1)
    const [renderedRanking, setRenderedRanking] = useState<rankeredUser[]>([])
    const [pageQty, setPageQty] = useState<Number>(1)

    const context = useContext(TwitterCtx)

    useEffect(() => {
        context?.checkUserAuth()
    }, [context])

    useEffect(() => {
        getRanking()
            .then((ranking) => {
                setRanking(ranking)
                setPageQty(Math.ceil(ranking.length / MAX_QTY_USERS_PER_PAGE))
            })
            .catch((e) => {
                alert(e)
            })
    }, [isOpen])

    useEffect(() => {
        const handlePagination = () => {
            const start = (page - 1) * MAX_QTY_USERS_PER_PAGE
            const end = page * MAX_QTY_USERS_PER_PAGE
            setRenderedRanking(ranking.slice(start, end))
        }
        handlePagination()
    }, [ranking, page])

    return (
        <BaseModal
            title="Twitter Ranking"
            isOpen={isOpen}
            handleClose={handleClose}
        >
            <div className="flex flex-col items-center mt-2 dark:text-white">
                <p className="mb-4">
                    El score se determina por la cantidad de intentos para
                    adivinar cada palabra. A menor cantidad de intentos mejor
                    puntaje, como si estuvieses jugando al Golf.{' '}
                    {context?.authenticated ? (
                        ''
                    ) : (
                        <span>
                            Para participar tenés que{' '}
                            <span
                                onClick={context?.twitterSignIn}
                                className={'underline cursor-pointer'}
                            >
                                loguearte con Twitter.
                            </span>
                        </span>
                    )}
                </p>
                <table className="w-full">
                    {renderedRanking.length > 0 ? (
                        <thead>
                            <tr>
                                <th className="text-xl text-blue-400">
                                    Twitter
                                </th>
                                <th className="text-xl">Score</th>
                                <th className="text-xl">Copinhas</th>
                            </tr>
                        </thead>
                    ) : (
                        ''
                    )}
                    <tbody>
                        {renderedRanking.map((user) => (
                            <tr key={user.userId}>
                                <td>@{user.username}</td>
                                <td>{user.score}</td>
                                <td>{user.copinha || 0}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    {ranking.length > MAX_QTY_USERS_PER_PAGE && (
                        <div className="grid grid-cols-2 mt-8">
                            <button
                                className="col-start-1 col-end-2 px-2 py-1 mr-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 disabled:opacity-75"
                                onClick={() => setPage(page - 1)}
                                disabled={page === 1}
                            >
                                {PREVIOUS_PAGINATION_TEXT}
                            </button>

                            <button
                                className="col-start-2 col-end-3 px-2 py-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 disabled:opacity-75"
                                onClick={() => setPage(page + 1)}
                                disabled={page >= pageQty}
                            >
                                {NEXT_PAGINATION_TEXT}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </BaseModal>
    )
}
