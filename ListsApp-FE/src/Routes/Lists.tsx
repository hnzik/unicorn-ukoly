import { useEffect, useState } from 'react'
import CreateNewListModal from '../Components/Modals/CreateNewListModal'
import { Link } from 'react-router-dom'
import DeleteListModal from '../Components/Modals/DeleteListModal'
import { useUser } from '../Providers/UserProvider'
import { useGetAllLists } from '../Hooks/useGetAllLists'
import { useDeleteList } from '../Hooks/useDeleteList'
import { useCreateList } from '../Hooks/useCreateList'
import { ToastContainer, toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const Lists: React.FC = () => {
    const user = useUser()
    const {t} = useTranslation()

    const {data} = useGetAllLists();
    const createListMutation = useCreateList();
    const deleteListMutation = useDeleteList();

    const [listData, setListData] = useState(data || [])
    
    useEffect(() => {
        if(!data) return;
        
        setListData(data)
    }, [data])

    const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false)
    const [isDeleteListModalId, setIsDeleteListModalId] = useState('')

    if (!user || !user.user || !user.user.id) return <div>To view lists you must be signed in</div>

    const onCreateList = async (listName: string) => {
        const createdList = await createListMutation.mutateAsync({         
                name: listName,
                items: [],
                users: [
                    {
                        id: user!.user!.id,
                        name: user!.user!.name,
                        isOwner: true,
                    },
                ],         
        });

        
        if(!createdList) {
            toast(t("pages.lists.listCreateError"), {type: 'error'});
            return;
        };

        toast(t("pages.lists.listCreated"), {type: 'success'});

        listData.push(createdList);
        setListData([...listData]);
        setIsCreateListModalOpen(false)
    }

    const onDeleteList = (listId: string) => {
        const result = deleteListMutation.mutateAsync(listId);

        if(!result) {
            toast(t("pages.lists.listDeleteError"), {type: 'error'});
            return;
        };
        toast(t("pages.lists.listDeleted"), {type: 'success'});

        setListData(listData.filter((list) => list.id !== listId));
        setIsDeleteListModalId('')
    }

    return (
        <div>
            <ToastContainer position='top-center'/>
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

            <h1 className='text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center'>{t('pages.lists.header')}</h1>
            <div className='flex flex-col items-center'>
                <div className='flex justify-end mb-4'>
                    <button
                        className='bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800 text-white font-bold py-2 px-4 rounded'
                        onClick={() => setIsCreateListModalOpen(true)}
                    >
                        {t('pages.lists.create')}
                    </button>
                </div>

                {listData.map((list) => (
                    <div key={list.id} className='bg-gray-100 dark:bg-gray-800 p-3 rounded-md mb-2 w-full md:w-1/2 flex'>
                        <Link className='' key={list.id} to={`/listDetail/${list.id}`}>
                            <div key={list.id}>
                                <div className='flex items-center justify-between'>
                                    <span className='text-gray-700 dark:text-gray-200'>{list.name}</span>
                                </div>
                            </div>
                        </Link>

                        {list.users.find((listUser) => listUser.id === user!.user!.id)?.isOwner && (
                            <button
                                className='ml-auto text-red-500 hover:text-red-700 dark:hover:text-red-400 transition duration-300 ease-in-out'
                                onClick={() => setIsDeleteListModalId(list.id)}
                            >
                                {t('pages.lists.remove')}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Lists
