import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
    isOpen: boolean
    handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
    return (
        <BaseModal
            title="¿Cómo jugar?"
            isOpen={isOpen}
            handleClose={handleClose}
        >
            <p className="text-sm text-gray-500 dark:text-gray-300">
                Descubre la palabra en 6 intentos. Después de cada uno, el color
                de las cajas cambiará para mostrar cuán cerca estuviste de cada
                palabra.
            </p>

            <div className="flex justify-center mt-4 mb-1">
                <Cell
                    isRevealing={true}
                    isCompleted={true}
                    value="S"
                    status="correct"
                />
                <Cell value="O" />
                <Cell value="L" />
                <Cell value="O" />
                <Cell value="W" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-300">
                La letra S está en el lugar correcto.
            </p>

            <div className="flex justify-center mt-4 mb-1">
                <Cell value="W" />
                <Cell value="A" />
                <Cell
                    isRevealing={true}
                    isCompleted={true}
                    value="L"
                    status="present"
                />
                <Cell value="M" />
                <Cell value="I" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-300">
                La letra L está presente en la palabra pero en el lugar
                incorrecto.
            </p>

            <div className="flex justify-center mt-4 mb-1">
                <Cell value="E" />
                <Cell value="T" />
                <Cell value="H" />
                <Cell
                    isRevealing={true}
                    isCompleted={true}
                    value="U"
                    status="absent"
                />
                <Cell value="R" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-300">
                La letra U no está en ningún lugar de la palabra.
            </p>

            <p className="mt-6 text-xs italic text-gray-500 dark:text-gray-300">
                Es una versión de código abierto del juego de adivinar palabras
                que todos conocemos y amamos -{' '}
                <a
                    href="https://github.com/cwackerfuss/react-wordle"
                    className="font-bold underline outline-0"
                >
                    mirá el código acá
                </a>{' '}
            </p>
        </BaseModal>
    )
}
