import { useState } from 'react'
import ListItem from '../Components/ListItem'
import { List } from '../Types/List'
import { useUser } from '../Providers/UserProvider'
import ListHeader from '../Components/ListHeader'
import useQuery from '../Hooks/useQuery'

const ListDetail: React.FC = () => {
    // We would use this to fetch data from the server
    //const query = useQuery()
    //query.get('id')

    const [listData, setListData] = useState<List>({
        id: '1',
        name: 'Nákupní seznam 25.10',
        items: [
            {
                id: '1',
                name: 'Jablko 3 kusy',
                isCompleted: false,
            },
            {
                id: '2',
                name: 'Hruška 3 kusy',
                isCompleted: false,
            },
        ],
        users: [
            {
                id: '1',
                name: 'Jan Mráz',
                isOwner: true,
            },
            {
                id: '2',
                name: 'Pepa Mráz',
                isOwner: false,
            },
        ],
    })

    const [filter, setFilter] = useState<'all' | 'completed' | 'uncompleted'>('all')

    const filteredItems = listData.items.filter((item) => {
        if (filter === 'completed') return item.isCompleted
        if (filter === 'uncompleted') return !item.isCompleted
        return true
    })

    const userContext = useUser()

    const isUserOwner = listData.users.find((user) => user.id === userContext?.user?.id)?.isOwner || false

    const handleCheckboxChange = (id: string) => {
        const item = listData.items.find((item) => item.id === id)
        if (!item) return

        item.isCompleted = !item.isCompleted
        setListData({ ...listData })
    }

    const onRemove = (id: string) => {
        setListData({
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

        setListData({
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

        setListData({
            ...listData,
            users: [...listData.users, newUser],
        })
    }

    const onRemoveUser = (userId: string) => {
        setListData({
            ...listData,
            users: listData.users.filter((user) => user.id !== userId),
        })
    }

    const onListNameChange = (listName: string) => {
        setListData({
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
                <ListItem
                    key={item.id}
                    item={item}
                    isUserOwner={isUserOwner}
                    onRemove={onRemove}
                    handleCheckboxChange={handleCheckboxChange}
                />
            ))}
        </div>
    )
}
export default ListDetail
