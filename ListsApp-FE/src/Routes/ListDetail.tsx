import { useEffect, useState } from 'react'
import ListItem from '../Components/ListItem'
import { List } from '../Types/List'
import ListHeader from '../Components/ListHeader'
import { useParams } from 'react-router'
import { useGetListById } from '../Hooks/useGetListById'
import { useUpdateList } from '../Hooks/useUpdateList'
import { ToastContainer, toast } from 'react-toastify'

const ListDetail: React.FC = () => {
    const { id } = useParams()
    const {data, isError} = useGetListById(id || '');
    const updateListMutation = useUpdateList();

    const [listData, setListData] = useState(data || { id: '', name: '', items: [], users: [] })

    useEffect(() => {
        if(!data) return;
        
        setListData(data)
    }, [data])

    const [filter, setFilter] = useState<'all' | 'completed' | 'uncompleted'>('all')

    const filteredItems = listData.items.filter((item) => {
        if (filter === 'completed') return item.isCompleted
        if (filter === 'uncompleted') return !item.isCompleted
        return true
    })

    const updateList = async (list: List) => {
        const updatedListData = await updateListMutation.mutateAsync(list);
        
        if(!process.env.REACT_APP_IS_MOCK && updatedListData) {
            toast('Error updating list', {type: 'error'});
            return;
        };

        toast('List updated', {type: 'success'});

        process.env.REACT_APP_IS_MOCK ? setListData(list) : setListData(updatedListData);
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

    if(isError) return (
        <div className='max-w-2xl mx-auto p-4 bg-white shadow rounded-lg mt-5'>
            <h1 className='text-2xl font-bold text-gray-800 mb-4 text-center'>List not found</h1>
        </div>
    )

    return (
        <>
            <ToastContainer position='top-center'/>

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
        </>
    )
}
export default ListDetail
