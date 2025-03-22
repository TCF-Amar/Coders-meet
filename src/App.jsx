import React, { useState } from 'react'
import Layout from './Layout.jsx'
import useAuthListener from './hook/useAuthListener'
import { useSelector } from 'react-redux'
import Header from './components/Navigations/Header.jsx'
import { FullPageLoader } from './components/LoadingFils/LoadingComponents.jsx'
import { Toaster } from 'react-hot-toast'
import Sidebar from './components/Navigations/Sidebar.jsx'

function App() {
  useAuthListener()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  const closeSidebar = () => {
    if (isSidebarOpen) setIsSidebarOpen(false)
  }

  const { isLoggedIn, isLoading } = useSelector((state) => state.auth)

  if (isLoading) {
    return <FullPageLoader />
  }

  return (
    <div className='mx-auto bg-gray-900 text-white min-h-screen px-3 '>
      <Toaster position='top-right' />
      <div className='fixed top-0 left-0 z-50 w-full flex justify-center items-center py-2 px-2'>
        {isLoggedIn && <Header toggleSidebar={toggleSidebar} />}
      </div>

      <div className='md:flex justify-center max-w-7xl mx-auto relative md:pt-20   '>
        {/* Sidebar */}
        <div
          className={`fixed inset-0 z-40 md:relative top-20 md:top-0 bottom-4 left-2  overflow-y-auto pb-5 rounded-lg md:w-1/5 ${isSidebarOpen ? 'w-64' : 'w-0'
            } transition-all duration-300 bg-gray-800 md:bg-transparent overflow-hidden`}
        >
          {isLoggedIn && <Sidebar />}
        </div>

        {/* Overlay for closing sidebar */}
        {isSidebarOpen && (
          <div
            className='fixed inset-0 bg-black opacity-50 md:hidden'
            onClick={closeSidebar}
          />
        )}

        {/* Main Content */}
        <div className='md:w-3/4 pt-20  md:p-6 w-full' onClick={closeSidebar}>
          <Layout />
        </div>
      </div>
    </div>
  )
}

export default App
