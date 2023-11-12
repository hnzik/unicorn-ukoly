import { useState } from 'react'
import CreateNewListModal from '../Components/Modals/CreateNewListModal'
import { useLists } from '../Providers/ListProvider'
import { Link } from 'react-router-dom'
import DeleteListModal from '../Components/Modals/DeleteListModal'
import { useUser } from '../Providers/UserProvider'

const Lists: React.FC = () => {
    const listProvider = useLists()
    const user = useUser()

    const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false)
    const [isDeleteListModalId, setIsDeleteListModalId] = useState('')

    if (!user || !user.user || !user.user.id) return <div>To view lists you must be signed in</div>

    let listData = listProvider.getListsByUserId(user.user.id)

    const onCreateList = (listName: string) => {
        listProvider.setLists([
            ...listProvider.lists,
            {
                id: (listProvider.lists.length + 1).toString(),
                name: listName,
                items: [],
                users: [
                    {
                        id: user!.user!.id,
                        name: user!.user!.name,
                        isOwner: true,
                    },
                ],
            },
        ])

        setIsCreateListModalOpen(false)
        listData = listProvider.getListsByUserId(user!.user!.id)
    }

    const onDeleteList = (listId: string) => {
        listProvider.setLists(listProvider.lists.filter((list) => list.id !== listId))
        setIsDeleteListModalId('')
    }

    return (
        <div>
            <CreateNewListModal
                isOpen={isCreateListModalOpen}
                onClose={() => setIsCreateListModalOpen(false)}
                onCreateList={onCreateList}
            />

            <DeleteListModal
                listId={isDeleteListModalId}
                isOpen={isDeleteListModalId !== ''}
                onClose={() => setIsDeleteListModalId('')}
                onDelete={onDeleteList}
            />

            <h1 className='text-2xl font-bold text-gray-800 mb-4 text-center'>Lists</h1>
            <div className='flex flex-col items-center'>
                <div className='flex justify-end mb-4'>
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        onClick={() => setIsCreateListModalOpen(true)}
                    >
                        Create New List
                    </button>
                </div>

                {listData.map((list) => (
                    <div key={list.id} className='bg-gray-100 p-3 rounded-md mb-2 w-full md:w-1/2 flex'>
                        <Link className='' key={list.id} to={`/listDetail/${list.id}`}>
                            <div key={list.id}>
                                <div className='flex items-center justify-between'>
                                    <span className='text-gray-700'>{list.name}</span>
                                </div>
                            </div>
                        </Link>

                        {list.users.find((listUser) => listUser.id === user!.user!.id)?.isOwner && (
                            <button
                                className='ml-auto text-red-500 hover:text-red-700 transition duration-300 ease-in-out'
                                onClick={() => setIsDeleteListModalId(list.id)}
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Lists
