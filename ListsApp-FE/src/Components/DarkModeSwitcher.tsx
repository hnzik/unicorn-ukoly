import { useTranslation } from "react-i18next"
import { useColorMode } from "../Providers/ColorModeProvider"

const DarkModeSwitcher:React.FC = () => {
    const {t} = useTranslation()
    const { colorMode, setColorMode } = useColorMode()
    const isDark = colorMode === 'dark'

    return (
        <button
            className='ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded'
            onClick={() => {
                setColorMode(isDark ? 'light' : 'dark')
            }}
        >
            {t('components.darkModeSwitcher.toggle') + ' ' + (isDark ? t('components.darkModeSwitcher.light') : t('components.darkModeSwitcher.dark'))}
        </button>
    )
}

export default DarkModeSwitcher