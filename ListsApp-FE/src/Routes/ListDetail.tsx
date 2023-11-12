import { useState } from 'react'
import ListItem from '../Components/ListItem'
import { List } from '../Types/List'
import ListHeader from '../Components/ListHeader'
import { useLists } from '../Providers/ListProvider'
import { useParams } from 'react-router'

const ListDetail: React.FC = () => {
    const { id } = useParams()

    const listProvider = useLists()

    const listData = listProvider.lists.find((list) => list.id === id) || ({} as List)

    const [filter, setFilter] = useState<'all' | 'completed' | 'uncompleted'>('all')

    const filteredItems = listData.items.filter((item) => {
        if (filter === 'completed') return item.isCompleted
        if (filter === 'uncompleted') return !item.isCompleted
        return true
    })

    const updateList = (list: List) => {
        listProvider.updateList(listData.id, list)
    }

    const handleCheckboxChange = (id: string) => {
        const item = listData.items.find((item) => item.id === id)
        if (!item) return

        item.isCompleted = !item.isCompleted
        updateList({ ...listData })
    }

    const onRemove = (id: string) => {
        updateList({
            ...listData,
            items: listData.items.filter((item) => item.id !== id),
        })
    }

    const onAddItem = (itemName: string) => {
        const newItem = {
            id: Math.random().toString(),
            name: itemName,
            isCompleted: false,
        }

        updateList({
            ...listData,
            items: [...listData.items, newItem],
        })
    }

    const onAddUser = (userName: string) => {
        const newUser = {
            id: Math.random().toString(),
            name: userName,
            isOwner: false,
        }

        updateList({
            ...listData,
            users: [...listData.users, newUser],
        })
    }

    const onRemoveUser = (userId: string) => {
        updateList({
            ...listData,
            users: listData.users.filter((user) => user.id !== userId),
        })
    }

    const onListNameChange = (listName: string) => {
        if (listName.length === 0) return

        updateList({
            ...listData,
            name: listName,
        })
    }

    return (
        <div className='max-w-2xl mx-auto p-4 bg-white shadow rounded-lg mt-5'>
            <ListHeader
                listName={listData.name}
                listUsers={listData.users}
                currentFilter={filter}
                setFilter={setFilter}
                onAddItem={onAddItem}
                onAddUser={onAddUser}
                onRemoveUser={onRemoveUser}
                onListNameChange={onListNameChange}
            />

            {filteredItems.map((item) => (
                <ListItem key={item.id} item={item} onRemove={onRemove} handleCheckboxChange={handleCheckboxChange} />
            ))}
        </div>
    )
}
export default ListDetail
