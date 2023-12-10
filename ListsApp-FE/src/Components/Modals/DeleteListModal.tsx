import { useTranslation } from "react-i18next"

interface ListUsersModalProps {
    isOpen: boolean
    listId: string
    onClose: () => void
    onDelete: (listId: string) => void
}

const DeleteListModal: React.FC<ListUsersModalProps> = ({ isOpen, listId, onClose, onDelete }) => {
    const {t} = useTranslation()

    if (!isOpen) return null

    return (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'>
            <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800'>
                <div className='mt-3 text-center'>
                    <h3 className='text-lg leading-6 font-medium text-gray-900 dark:text-gray-200'>Delete list</h3>
                    <div className='mt-2 px-4 py-3'>
                        <button
                            className='bg-red-500 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-800 text-white font-bold py-2 px-4 rounded w-full'
                            onClick={() => {
                                onDelete(listId)
                            }}
                        >
                            {t('components.deleteList.delete')}
                        </button>
                    </div>
                    <div className='items-center px-4 py-3'>
                        <button
                            id='ok-btn'
                            className='px-4 py-2 bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800 text-white text-base font-medium rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700'
                            onClick={onClose}
                        >
                            {t('components.deleteList.close')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteListModal
