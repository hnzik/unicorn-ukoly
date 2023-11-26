import { Link } from 'react-router-dom'
import { useUser } from '../Providers/UserProvider'

const HomePage: React.FC = () => {
    const userContext = useUser()

    const loginAsOwner = () => {
        userContext?.login({ id: '1', name: 'Honzik' })
    }

    const loginAsMember = () => {
        userContext?.login({ id: '2', name: 'Alice' })
    }
    return (
        <div className='flex flex-col items-center justify-center mt-4'>
            <h1 className='text-4xl font-bold mb-4'>Welcome to Lists </h1>

            <Link to='/lists' className='text-xl text-blue-500 hover:text-blue-700 transition-colors'>
                Go to lists
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
