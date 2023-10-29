import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ListDetail from './Routes/ListDetail'
import Layout from './Components/Layout'
import { UserProvider } from './Providers/UserProvider'
import HomePage from './Routes/HomePage'

function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <Layout />
                <div>
                    <Routes>
                        <Route path='/' Component={HomePage} />
                        <Route path='/listDetail/:id' Component={ListDetail} />
                    </Routes>
                </div>
            </BrowserRouter>
        </UserProvider>
    )
}

export default App
