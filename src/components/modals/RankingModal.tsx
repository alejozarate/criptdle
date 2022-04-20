import { useEffect, useState } from 'react'
import { BaseModal } from './BaseModal'

import { getRanking, rankeredUser } from '../../lib/firebaseActions'
import {
    NEXT_PAGINATION_TEXT,
    PREVIOUS_PAGINATION_TEXT,
} from '../../constants/strings'

type Props = {
    isOpen: boolean
    handleClose: () => void
}

const MAX_QTY_USERS_PER_PAGE = 10

export const RankingModal = ({ isOpen, handleClose }: Props) => {
    const [ranking, setRanking] = useState<rankeredUser[]>([])
    const [page, setPage] = useState(1)
    const [renderedRanking, setRenderedRanking] = useState<rankeredUser[]>([])
    const [pageQty, setPageQty] = useState<Number>(1)

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
            <div className="flex flex-col items-center mt-2">
                <p className="mb-4">
                    El score se determina por la cantidad de intentos en cada
                    palabra del mes. A menor cantidad mejor posicion vas a
                    tener. Para participar logueate con Twitter.
                </p>
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="text-blue-400 text-xl">Twitter</th>
                            <th className="text-xl">Score</th>
                            <th className="text-xl">Copinhas</th>
                        </tr>
                    </thead>

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
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-4 col-start-1 col-end-2 disabled:opacity-75"
                                onClick={() => setPage(page - 1)}
                                disabled={page === 1}
                            >
                                {PREVIOUS_PAGINATION_TEXT}
                            </button>

                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded col-start-2 col-end-3 disabled:opacity-75"
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
