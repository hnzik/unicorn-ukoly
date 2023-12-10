import { Link } from 'react-router-dom'
import { useUser } from '../Providers/UserProvider'
import LanguageSwitcher from './LanguageSwitcher'
import { useTranslation } from 'react-i18next'
import DarkModeSwitcher from './DarkModeSwitcher'

const Layout: React.FC = () => {
    const userContext = useUser()
    const {t} = useTranslation()

    return (
        <nav className='bg-gray-800 text-white p-4 flex w-full items-center'>
            <div>
                <Link to='/lists' className='text-white px-3 py-2 rounded-md text-sm font-medium'>
                    {t('components.layout.lists')}
                </Link>
            </div>
            <div className='flex gap-3 justify-center items-center ml-auto'>
                <LanguageSwitcher/>
                <DarkModeSwitcher />
                <div>{userContext?.user ? <span>{t('components.layout.hello')}, {userContext.user.name}</span> : <span>{t('components.layout.noUser')}</span>}</div>
            </div>
        </nav>
    )
}

export default Layout
