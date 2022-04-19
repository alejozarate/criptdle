import { BaseModal } from './BaseModal'
import { SettingsToggle } from './SettingsToggle'
import {
    HARD_MODE_DESCRIPTION,
    HIGH_CONTRAST_MODE_DESCRIPTION,
} from '../../constants/strings'

type Props = {
    isOpen: boolean
    handleClose: () => void
    isHardMode: boolean
    handleHardMode: Function
    isDarkMode: boolean
    handleDarkMode: Function
    isHighContrastMode: boolean
    handleHighContrastMode: Function
    isTwitterEnabled: boolean
    handleTwitterUser: Function
}

export const SettingsModal = ({
    isOpen,
    handleClose,
    isHardMode,
    handleHardMode,
    isDarkMode,
    handleDarkMode,
    isHighContrastMode,
    handleHighContrastMode,
    isTwitterEnabled,
    handleTwitterUser,
}: Props) => {
    return (
        <BaseModal
            title="Configuración"
            isOpen={isOpen}
            handleClose={handleClose}
        >
            <div className="flex flex-col mt-2 divide-y">
                <SettingsToggle
                    settingName="Modo difícil"
                    flag={isHardMode}
                    handleFlag={handleHardMode}
                    description={HARD_MODE_DESCRIPTION}
                />
                <SettingsToggle
                    settingName="Modo oscuro"
                    flag={isDarkMode}
                    handleFlag={handleDarkMode}
                />
                <SettingsToggle
                    settingName="Modo de alto contraste"
                    flag={isHighContrastMode}
                    handleFlag={handleHighContrastMode}
                    description={HIGH_CONTRAST_MODE_DESCRIPTION}
                />
                <SettingsToggle
                    settingName="Twitter linkeado"
                    flag={isTwitterEnabled}
                    handleFlag={handleTwitterUser}
                    description={'Activar o desactiva tu usuario de Twitter'}
                />
            </div>
        </BaseModal>
    )
}
