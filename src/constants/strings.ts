export const GAME_TITLE = process.env.REACT_APP_GAME_NAME!
export const GAME_URL = process.env.REACT_APP_GAME_URL!

export const WIN_MESSAGES = ['Buen trabajo!', 'Genial', 'Correcto!']
export const GAME_COPIED_MESSAGE = 'Copiado al portapapeles'
export const NOT_ENOUGH_LETTERS_MESSAGE = 'No has completado suficientes letras'
export const WORD_NOT_FOUND_MESSAGE = 'Palabra no encontrada'
export const HARD_MODE_ALERT_MESSAGE =
    'El modo difícil solo puede ser seleccionado al comienzo'
export const HARD_MODE_DESCRIPTION =
    'Todas las pistas reveladas deben ser usadas en el próximo intento'
export const HIGH_CONTRAST_MODE_DESCRIPTION = 'Para mejorar el contraste'
export const TWITTER_ACCOUNT_DESCRIPTION =
    'Activa o desactiva tu cuenta de Twitter'
export const CORRECT_WORD_MESSAGE = (solution: string) =>
    `La palabra era ${solution}`
export const WRONG_SPOT_MESSAGE = (guess: string, position: number) =>
    `Debes usar la letra ${guess} en la posición ${position}`
export const NOT_CONTAINED_MESSAGE = (letter: string) =>
    `El intento debe contener la letra ${letter}`
export const ENTER_TEXT = 'Enter'
export const DELETE_TEXT = 'Borrar'
export const STATISTICS_TITLE = 'Estadísticas'
export const GUESS_DISTRIBUTION_TEXT = 'Distribución del intento'
export const NEW_WORD_TEXT = 'Nueva palabra en'
export const SHARE_TEXT = 'Compartir'
export const TOTAL_TRIES_TEXT = 'Total de intentos'
export const SUCCESS_RATE_TEXT = 'Tasa de éxito'
export const CURRENT_STREAK_TEXT = 'Racha actual'
export const BEST_STREAK_TEXT = 'Mejor racha'
export const NEXT_PAGINATION_TEXT = 'Siguiente'
export const PREVIOUS_PAGINATION_TEXT = 'Atras'
