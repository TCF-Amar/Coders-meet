import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaSearch, FaBell, FaUser, FaSignOutAlt, FaCog, FaGithub, FaPlus, FaImage, FaBlog, FaCode, FaLayerGroup, FaBars } from 'react-icons/fa'
import { logout } from '../../services/firebaseServices'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/mainlogo.png'
import Notification from '../Notification'


function Header({ toggleSidebar }) {
    const { user, isLoggedIn } = useSelector((state) => state.auth)
    const [searchQuery, setSearchQuery] = useState('')
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const [isNewMenuOpen, setIsNewMenuOpen] = useState(false)
    const [isNotificationOpen, setIsNotificationOpen] = useState(false)
    const navigate = useNavigate()
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };




    return (
        <header className="bg-gray-800   border-gray-700  w-full md:w-[90%] rounded-md shadow-lg  ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className='flex items-center gap-2'>
                        {
                            isLoggedIn &&
                            <button onClick={toggleSidebar} className="md:hidden text-white">
                                <FaBars className="w-5 h-5" />
                            </button>
                        }
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2">
                            <img src={logo} alt="logo" className="w-10 h-10" />
                            <span className="text-2xl font-bold text-white hidden md:block">CodersMeet</span>
                        </Link>
                    </div>


                    {/* Search Bar */}
                    <div className="flex-1 max-w-2xl mx-8 hidden md:block">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search projects, posts, or users..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-white"
                            />
                            <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        </form>
                    </div>

                    {/* Right Navigation */}
                    <div className="flex items-center space-x-4">

                        <button onClick={() => setIsNewMenuOpen(!isNewMenuOpen)} className="py-2 text-gray-400 hover:text-white relative cursor-pointer">
                            <FaPlus className="w-5 h-5" />
                            {isNewMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50">
                                    <ul className='flex flex-col gap-2'>
                                        <Link to="/create/post" onClick={() => setIsNewMenuOpen(false)}>
                                            <li className='hover:bg-gray-700 p-2 rounded-md flex items-center justify-center gap-2'>
                                                <FaImage className="w-5 h-5" />
                                                Create Post
                                            </li>
                                        </Link>
                                        <Link to="/create/blog" onClick={() => setIsNewMenuOpen(false)}>
                                            <li className='hover:bg-gray-700 p-2 rounded-md flex items-center justify-center gap-2'>
                                                <FaBlog className="w-5 h-5" />
                                                Create Blog
                                            </li>
                                        </Link>
                                        <Link to="/create/snippet" onClick={() => setIsNewMenuOpen(false)}>
                                            <li className='hover:bg-gray-700 p-2 rounded-md flex items-center justify-center gap-2'>
                                                <FaCode className="w-5 h-5" />
                                                Create Snippet
                                            </li>
                                        </Link>
                                        <Link to="/create/project" onClick={() => setIsNewMenuOpen(false)}>
                                            <li className='hover:bg-gray-700 p-2 rounded-md flex items-center justify-center gap-2'>
                                                <FaLayerGroup className="w-5 h-5" />
                                                Create Project
                                            </li>
                                        </Link>
                                    </ul>
                                </div>
                            )}
                        </button>

                        {/* Notifications */}
                        <button onClick={() => setIsNotificationOpen(!isNotificationOpen)} className="py-2 text-gray-400 hover:text-white relative">
                            <FaBell className="w-5 h-5" />
                            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                            {isNotificationOpen && <div className='absolute right-0 top-10 w-[300px] h-full bg-gray-800 rounded-md shadow-lg px-2 py-1 '>
                                <Notification />
                            </div>}
                        </button>

                        {/* User Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="flex items-center space-x-2 focus:outline-none"
                            >
                                <img
                                    src={user?.photoURL || "https://ui-avatars.com/api/?name=User"}
                                    alt={user?.displayName}
                                    className="h-8 w-8 rounded-full"
                                />
                                <span className="text-white hidden md:block">{user?.displayName}</span>
                                <svg
                                    className={`w-4 h-4 transition-transform ${isUserMenuOpen ? 'transform rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50">
                                    <Link
                                        to={`/profile/${user?.uid}`}
                                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                                        onClick={() => setIsUserMenuOpen(false)}
                                    >
                                        <FaUser className="inline mr-2" /> Profile
                                    </Link>
                                    <Link
                                        to="/github"
                                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                                        onClick={() => setIsUserMenuOpen(false)}
                                    >
                                        <FaGithub className="inline mr-2" /> GitHub
                                    </Link>
                                    <Link
                                        to="/settings"
                                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                                        onClick={() => setIsUserMenuOpen(false)}
                                    >
                                        <FaCog className="inline mr-2" /> Settings
                                    </Link>
                                    <button
                                        onClick={() => logout()}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                                    >
                                        <FaSignOutAlt className="inline mr-2" /> Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
