import React, { useState } from 'react'
import { User } from '../../Types/User'
import { useTranslation } from 'react-i18next'

interface ListUsersModalProps {
    isOpen: boolean
    onClose: () => void
    users: User[]
    onAddUser: (userName: string) => void
    onRemoveUser: (userId: string) => void
}

const ListUsersModal: React.FC<ListUsersModalProps> = ({ isOpen, onClose, users, onAddUser, onRemoveUser }) => {
    const [userName, setUserName] = useState('')
    const {t} = useTranslation()

    if (!isOpen) return null

    return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full' id='my-modal'>
        <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800'>
            <div className='mt-3 text-center'>
                <h3 className='text-lg leading-6 font-medium text-gray-900 dark:text-gray-200'>{t('components.listUsers.mangeUsers')}</h3>
                <div className='mt-2 px-4 py-3'>
                    <input
                        type='text'
                        placeholder={t('components.listUsers.enterName')}
                        className='mb-3 px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <button
                        className='bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-full'
                        onClick={() => {
                            onAddUser(userName)
                            setUserName('')
                        }}
                    >
                        {t('components.listUsers.add')}
                    </button>
                </div>
                <div className='mt-4'>
                    <ul>
                        {users.map((user) => (
                            <li key={user.id} className='flex justify-between items-center py-2'>
                                <span className='dark:text-gray-200'>{user.name}</span>
                                {!user.isOwner && (
                                    <button
                                        className='bg-red-500 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-800 text-white font-bold py-1 px-2 rounded text-xs'
                                        onClick={() => onRemoveUser(user.id)}
                                    >
                                        {t('components.listUsers.remove')}
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='items-center px-4 py-3'>
                    <button
                        id='ok-btn'
                        className='px-4 py-2 bg-gray-500 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700'
                        onClick={onClose}
                    >
                        {t('components.listUsers.close')}
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default ListUsersModal
