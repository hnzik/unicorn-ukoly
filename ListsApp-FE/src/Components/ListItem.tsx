import { Item } from '../Types/List'

interface ListItemProps {
    item: Item
    isUserOwner: boolean
    onRemove: (id: string) => void
    handleCheckboxChange: (id: string) => void
}

const ListItem: React.FC<ListItemProps> = ({ item, isUserOwner, handleCheckboxChange, onRemove }) => {
    const { isCompleted, name, id } = item

    return (
        <div className='flex items-center justify-between bg-gray-100 p-3 rounded-md mb-2'>
            <div className='flex items-center'>
                <input
                    type='checkbox'
                    checked={isCompleted}
                    onChange={() => handleCheckboxChange(id)}
                    className='form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500'
                />
                <span className={`ml-2 select-none ${isCompleted ? 'line-through text-gray-400' : 'text-gray-700'}`}>{name}</span>
            </div>
            <button className='text-red-500 hover:text-red-700 transition-colors' onClick={() => onRemove(id)}>
                Remove
            </button>
        </div>
    )
}

export default ListItem
