import { useRef, useState } from 'react'
import { useUser } from '../Providers/UserProvider'
import ListUsersModal from './Modals/ListUsersModal'
import { User } from '../Types/User'
import EditIcon from '@mui/icons-material/Edit'
import { useTranslation } from 'react-i18next'

interface ListHeaderProps {
    listName: string
    listUsers: User[]
    currentFilter: 'all' | 'completed' | 'uncompleted'
    setFilter: (filter: 'all' | 'completed' | 'uncompleted') => void
    onListNameChange: (listName: string) => void
    onAddItem: (itemName: string) => void
    onAddUser: (userName: string) => void
    onRemoveUser: (userId: string) => void
}

const ListHeader: React.FC<ListHeaderProps> = ({
    currentFilter,
    listName,
    listUsers,
    onAddUser,
    onAddItem,
    setFilter,
    onRemoveUser,
    onListNameChange,
}) => {
    const userContext = useUser()
    const ref = useRef<HTMLInputElement>(null)
    const addItemInputRef = useRef<HTMLInputElement>(null)
    const isUserOwner = listUsers.find((user) => user.id === userContext?.user?.id)?.isOwner || false
    const [isModalOpen, setIsModalOpen] = useState(false)
    const {t} = useTranslation()

    return (
    <div>
        <div className='flex mb-4 w-full items-center'>
            {isUserOwner && (
                <button
                    onClick={() => {
                        ref?.current?.focus()
                    }}
                >
                    <EditIcon className='mr-2' />
                </button>
            )}
            <input
                className='text-xl font-bold text-gray-800 dark:text-gray-200 w-full dark:bg-gray-700 dark:border-gray-600'
                defaultValue={listName}
                disabled={!isUserOwner}
                ref={ref}
                onBlur={(e) => onListNameChange(e.currentTarget.value)}
            />
            <div className='flex w-full justify-items-end'>
                {isUserOwner && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className='ml-auto bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800 text-white font-bold py-2 px-4 rounded'
                    >
                        {t('components.listHeader.manageUser')}
                    </button>
                )}

                {!isUserOwner && (
                    <button
                        onClick={() => onRemoveUser(userContext?.user?.id || '')}
                        className='ml-auto bg-red-500 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-800 text-white font-bold py-2 px-4 rounded'
                    >
                        {t('components.listHeader.leave')}
                    </button>
                )}

                <ListUsersModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onAddUser={onAddUser}
                    onRemoveUser={onRemoveUser}
                    users={listUsers}
                />
            </div>
        </div>
        <div className='mb-4'>
            {['all', 'completed', 'uncompleted'].map((filterType) => (
                <button
                    key={filterType}
                    className={`px-4 py-2 mr-2 ${currentFilter === filterType ? 'bg-blue-500 dark:bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-600'}`}
                    onClick={() => setFilter(filterType as 'all' | 'completed' | 'uncompleted')}
                >
                {t(`components.listHeader.${filterType}`)}
                </button>
            ))}
        </div>

        <div className='my-4'>
            <input type='text' placeholder={t('components.listHeader.addNewItem')} className='border p-2 mr-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200' ref={addItemInputRef} />
            <button
                className='bg-green-500 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-800 text-white font-bold py-2 px-4 rounded'
                onClick={() => {
                    onAddItem(addItemInputRef.current?.value || '')
                    addItemInputRef.current!.value = ''
                }}
            >
                {t('components.listHeader.addItem')}
            </button>
        </div>
    </div>
    )
}

export default ListHeader
