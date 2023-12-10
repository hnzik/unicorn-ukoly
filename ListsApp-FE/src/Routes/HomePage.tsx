import { Link } from 'react-router-dom'
import { useUser } from '../Providers/UserProvider'
import { useTranslation } from 'react-i18next'

const HomePage: React.FC = () => {
    const userContext = useUser()
    const {t} = useTranslation()

    const loginAsOwner = () => {
        userContext?.login({ id: '1', name: 'Honzik' })
    }

    const loginAsMember = () => {
        userContext?.login({ id: '2', name: 'Alice' })
    }
    return (
    <div className='flex flex-col items-center justify-center mt-4'>
        <h1 className='text-4xl font-bold mb-4 text-gray-900 dark:text-gray-200'>{t("pages.home.welcome")}</h1>

        <Link to='/lists' className='text-xl text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors'>
            {t("pages.home.gotolist")}
        </Link>

        <button className='bg-blue-400 hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 rounded p-2 text-white mt-4' onClick={loginAsOwner}>
            {t("pages.home.loginasowner")}
        </button>
        <button className='bg-blue-400 hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 rounded p-2 text-white mt-4' onClick={loginAsMember}>
            {t("pages.home.loginasmember")}
        </button>
    </div>
    )
}

export default HomePage
