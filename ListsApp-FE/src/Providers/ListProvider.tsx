import React, { PropsWithChildren, createContext, useContext, useState } from 'react'
import { List } from '../Types/List'

const ListsMockData = [
    {
        id: '1',
        name: 'My List',
        users: [
            {
                id: '1',
                name: 'User 1',
                isOwner: true,
            },
            {
                id: '2',
                name: 'User 2',
                isOwner: false,
            },
        ],
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
    },
    {
        id: '2',
        name: 'My List 2',
        users: [
            {
                id: '1',
                name: 'User 1',
                isOwner: true,
            },
            {
                id: '2',
                name: 'User 2',
                isOwner: false,
            },
        ],
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
    },
]

interface IListsContext {
    lists: List[]
    setLists: React.Dispatch<React.SetStateAction<List[]>>
    getListsByUserId: (userId: string) => List[]
    getListById: (listId: string) => List | undefined
    updateList: (listId: string, updatedData: Partial<List>) => void
}

const ListsContext = createContext<IListsContext>({
    lists: [],
    setLists: () => {},
    getListsByUserId: () => [],
    getListById: () => undefined,
    updateList: () => {},
})

export const useLists = () => useContext(ListsContext)

export const ListsProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const [lists, setLists] = useState<List[]>(ListsMockData)

    const getListsByUserId = (userId: string) => {
        return lists.filter((list) => list.users.some((user) => user.id === userId))
    }

    const getListById = (listId: string) => {
        return lists.find((list) => list.id === listId)
    }

    const updateList = (listId: string, updatedData: Partial<List>) => {
        setLists((currentLists) => currentLists.map((list) => (list.id === listId ? { ...list, ...updatedData } : list)))
    }

    return (
        <ListsContext.Provider value={{ lists, setLists, getListsByUserId, getListById, updateList }}>
            {children}
        </ListsContext.Provider>
    )
}
