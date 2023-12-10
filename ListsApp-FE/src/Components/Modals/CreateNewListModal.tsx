import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface CreateNewListModalProps {
    isOpen: boolean
    onClose: () => void
    onCreateList: (listName: string) => void
}

const CreateNewListModal: React.FC<CreateNewListModalProps> = ({ isOpen, onClose, onCreateList }) => {
    const [listName, setListName] = useState('')
    const {t} = useTranslation()

    if (!isOpen) return null

    return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'>
        <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800'>
            <div className='mt-3 text-center'>
                <h3 className='text-lg leading-6 font-medium text-gray-900 dark:text-gray-200'>{t('components.createNewList.createList')}</h3>
                <div className='mt-2 px-7 py-3'>
                    <input
                        type='text'
                        placeholder={t('components.createNewList.enterListName')}
                        className='mb-3 px-3 py-2 border dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-300'
                        onChange={(e) => setListName(e.target.value)}
                    />
                    <button
                        className='bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800 text-white font-bold py-2 px-4 rounded'
                        onClick={() => {
                            onCreateList(listName)
                        }}
                    >
                        {t('components.createNewList.create')}
                    </button>
                </div>
                <div className='items-center px-4 py-3'>
                    <button
                        id='ok-btn'
                        className='px-4 py-2 bg-red-500 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-800 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700'
                        onClick={onClose}
                    >
                        {t('components.createNewList.close')}
                    </button>
                </div>
            </div>
        </div>
    </div>

    )
}

export default CreateNewListModal
