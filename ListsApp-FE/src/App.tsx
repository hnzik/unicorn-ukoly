import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ListDetail from './Routes/ListDetail'
import Layout from './Components/Layout'
import { UserProvider } from './Providers/UserProvider'
import HomePage from './Routes/HomePage'
import Lists from './Routes/Lists'
import { ColorModeProvider } from './Providers/ColorModeProvider'


function App() {
    return (
            <div className="bg-white dark:bg-black min-h-screen">
                <UserProvider>
                        <BrowserRouter>
                        <ColorModeProvider>
                            <Layout />
                            <div>
                                <Routes>
                                    <Route path='/' Component={HomePage} />
                                    <Route path='/listDetail/:id' Component={ListDetail} />
                                    <Route path='/lists' Component={Lists} />
                                </Routes>
                            </div>
                        </ColorModeProvider>
                        </BrowserRouter>
                </UserProvider>
            </div>
        )
}

export default App
