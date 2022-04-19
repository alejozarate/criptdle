import { useEffect, useState } from 'react'
import { BaseModal } from './BaseModal'

import {
    HARD_MODE_DESCRIPTION,
    HIGH_CONTRAST_MODE_DESCRIPTION,
} from '../../constants/strings'

import { getRanking, rankeredUser } from '../../lib/firebaseActions'

type Props = {
    isOpen: boolean
    handleClose: () => void
}

export const RankingModal = ({ isOpen, handleClose }: Props) => {
    const [ranking, setRanking] = useState<rankeredUser[]>([])

    useEffect(() => {
        getRanking()
            .then((ranking) => {
                setRanking(ranking)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])

    return (
        <BaseModal
            title="Twitter Ranking"
            isOpen={isOpen}
            handleClose={handleClose}
        >
            <div className="flex flex-col mt-2 divide-y">
                <table>
                    <thead>
                        <tr>
                            <th className="text-blue-400 text-xl">Twitter</th>
                            <th className="text-xl">Score</th>
                            <th className="text-xl">Copinhas</th>
                        </tr>
                    </thead>

                    <tbody>
                        {ranking.map((user) => (
                            <tr key={user.userId}>
                                <td>@{user.username}</td>
                                <td>{user.score}</td>
                                <td>{user.copinha || 0}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </BaseModal>
    )
}
