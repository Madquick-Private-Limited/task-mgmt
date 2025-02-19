import './App.css'
import { Toaster } from "@/components/ui/toaster"
import { Outlet } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'

function App() {

    return (
        <>
            <Provider store={store}>
                <div className='flex flex-col items-center justify-center h-screen'>
                    <Outlet />
                </div>
                <Toaster />
            </Provider>
        </>
    )
}

export default App
