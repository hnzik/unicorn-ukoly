import { useState } from 'react'

interface CreateNewListModalProps {
    isOpen: boolean
    onClose: () => void
    onCreateList: (listName: string) => void
}

const CreateNewListModal: React.FC<CreateNewListModalProps> = ({ isOpen, onClose, onCreateList }) => {
    const [listName, setListName] = useState('')

    if (!isOpen) return null

    return (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'>
            <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
                <div className='mt-3 text-center'>
                    <h3 className='text-lg leading-6 font-medium text-gray-900'>Create list</h3>
                    <div className='mt-2 px-7 py-3'>
                        <input
                            type='text'
                            placeholder='Enter list name'
                            className='mb-3 px-3 py-2 border rounded'
                            onChange={(e) => setListName(e.target.value)}
                        />
                        <button
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                            onClick={() => {
                                onCreateList(listName)
                            }}
                        >
                            Create
                        </button>
                    </div>
                    <div className='items-center px-4 py-3'>
                        <button
                            id='ok-btn'
                            className='px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300'
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateNewListModal
