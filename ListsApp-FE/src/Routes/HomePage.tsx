import { Link } from 'react-router-dom'
import { useUser } from '../Providers/UserProvider'

const HomePage: React.FC = () => {
    const userContext = useUser()

    const loginAsOwner = () => {
        userContext?.login({ id: '1', name: 'Jan Mráz' })
    }

    const loginAsMember = () => {
        userContext?.login({ id: '2', name: 'Pepa Mráz' })
    }
    return (
        <div className='flex flex-col items-center justify-center mt-4'>
            <h1 className='text-4xl font-bold mb-4'>Welcome to Lists </h1>

            <Link to='/listDetail/1' className='text-xl text-blue-500 hover:text-blue-700 transition-colors'>
                Go to example list
            </Link>

            <button className='bg-blue-400 rounded p-2 text-white mt-4' onClick={loginAsOwner}>
                Login as Owner
            </button>
            <button className='bg-blue-400 rounded p-2 text-white mt-4' onClick={loginAsMember}>
                Login as Member
            </button>
        </div>
    )
}

export default HomePage
