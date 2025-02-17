import './App.css'
import { Toaster } from "@/components/ui/toaster"
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <div className='flex flex-col items-center justify-center h-screen'>
        <Outlet />
      </div>
      <Toaster />
    </>
  )
}

export default App
