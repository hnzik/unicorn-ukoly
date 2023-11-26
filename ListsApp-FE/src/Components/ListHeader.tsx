import { useRef, useState } from 'react'
import { useUser } from '../Providers/UserProvider'
import ListUsersModal from './Modals/ListUsersModal'
import { User } from '../Types/User'
import EditIcon from '@mui/icons-material/Edit'

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
                    className='text-xl font-bold text-gray-800 w-full'
                    defaultValue={listName}
                    disabled={!isUserOwner}
                    ref={ref}
                    onBlur={(e) => onListNameChange(e.currentTarget.value)}
                />
                <div className='flex w-full justify-items-end'>
                    {isUserOwner && (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className='ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        >
                            Manage Users
                        </button>
                    )}

                    {!isUserOwner && (
                        <button
                            onClick={() => onRemoveUser(userContext?.user?.id || '')}
                            className='ml-auto bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        >
                            Leave
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
                <button
                    className={`px-4 py-2 mr-2 ${currentFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setFilter('all')}
                >
                    All
                </button>
                <button
                    className={`px-4 py-2 mr-2 ${currentFilter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setFilter('completed')}
                >
                    Resolved
                </button>
                <button
                    className={`px-4 py-2 ${currentFilter === 'uncompleted' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setFilter('uncompleted')}
                >
                    Unresolved
                </button>
            </div>

            <div className='my-4'>
                <input type='text' placeholder='Add new item' className='border p-2 mr-2' ref={addItemInputRef} />
                <button
                    className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                    onClick={() => {
                        onAddItem(addItemInputRef.current?.value || '')
                        addItemInputRef.current!.value = ''
                    }}
                >
                    Add Item
                </button>
            </div>
        </div>
    )
}

export default ListHeader
