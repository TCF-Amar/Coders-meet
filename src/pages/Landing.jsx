import React from 'react'
import { Link } from 'react-router-dom'
import { FaCode, FaUsers, FaLaptopCode, FaRocket, FaGithub, FaLinkedin } from 'react-icons/fa'
import { useSelector } from 'react-redux'

function Landing() {
    const { isLoggedIn } = useSelector((state) => state.auth)

    return (
        <div className=" bg-gray-900 text-white fixed w-full top-0 left-0 bottom-0 overflow-hidden overflow-y-auto">
            {/* Navigation */}
            <nav className="px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <FaCode className="text-2xl text-blue-400" />
                    <span className="font-bold text-xl">CodersMeet</span>
                </div>
                <div className="flex gap-4">
                    {isLoggedIn ? (
                        <Link
                            to="/"
                            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition-all duration-300"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                to="/signin"
                                className="px-4 py-2 rounded-md border border-gray-600 hover:border-gray-400 transition-all duration-300"
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/signup"
                                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition-all duration-300"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <div className="py-20 px-6 max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row gap-10 items-center">
                    <div className="md:w-1/2">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                            Connect, Collaborate & Code with Fellow Developers
                        </h1>
                        <p className="text-gray-400 text-lg mb-8">
                            CodersMeet is a platform where programmers can meet, share ideas,
                            collaborate on projects, and grow their skills together.
                        </p>
                        <div className="flex gap-4">
                            {isLoggedIn ? (
                                <Link
                                    to="/"
                                    className="px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-700 font-semibold transition-all duration-300 flex items-center gap-2"
                                >
                                    Go to Dashboard
                                    <FaRocket />
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        to="/signup"
                                        className="px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-700 font-semibold transition-all duration-300 flex items-center gap-2"
                                    >
                                        Join Now
                                        <FaRocket />
                                    </Link>
                                    <Link
                                        to="/signin"
                                        className="px-6 py-3 rounded-md border border-gray-600 hover:border-gray-400 transition-all duration-300"
                                    >
                                        Sign In
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <div className="relative">
                            <div className="w-full h-64 md:h-96 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-xl overflow-hidden">
                                <div className="absolute inset-0 opacity-20">
                                    <div className="absolute top-2 left-4 w-2/3 h-2 bg-white rounded-full">df</div>
                                    <div className="absolute top-2 right-4 w-6 h-2 bg-white rounded-full"></div>
                                    <div className="absolute top-6 left-4 w-1/3 h-2 bg-white rounded-full"></div>
                                    <div className="absolute top-10 left-4 w-1/2 h-2 bg-white rounded-full"></div>
                                    <div className="absolute top-14 left-4 w-2/5 h-2 bg-white rounded-full"></div>
                                    <div className="absolute top-18 left-4 w-1/4 h-2 bg-white rounded-full"></div>
                                    <div className="absolute top-22 left-4 w-2/3 h-2 bg-white rounded-full"></div>
                                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-white rounded-md"></div>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <FaUsers className="text-6xl inline-block text-white mb-4" />
                                        <h3 className="text-xl font-bold">Join the Community</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-60 blur-xl"></div>
                            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full opacity-60 blur-xl"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-16 px-6 bg-gray-800">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Join CodersMeet?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gray-900 p-8 rounded-lg hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300">
                            <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                                <FaUsers className="text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Connect with Developers</h3>
                            <p className="text-gray-400">
                                Network with like-minded developers from around the world with similar interests and skills.
                            </p>
                        </div>
                        <div className="bg-gray-900 p-8 rounded-lg hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300">
                            <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                                <FaLaptopCode className="text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Collaborate on Projects</h3>
                            <p className="text-gray-400">
                                Find team members for your projects or join existing ones to build amazing software together.
                            </p>
                        </div>
                        <div className="bg-gray-900 p-8 rounded-lg hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300">
                            <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                                <FaRocket className="text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Grow Your Skills</h3>
                            <p className="text-gray-400">
                                Learn from peers, share knowledge, and improve your coding abilities through real collaboration.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to join our community?</h2>
                    <p className="text-gray-400 text-lg mb-8">
                        Start connecting with developers and building amazing projects today.
                    </p>
                    <div className="flex justify-center gap-4">
                        {isLoggedIn ? (
                            <Link
                                to="/"
                                className="px-8 py-3 rounded-md bg-blue-600 hover:bg-blue-700 font-semibold transition-all duration-300 flex items-center gap-2"
                            >
                                Go to Dashboard
                                <FaRocket />
                            </Link>
                        ) : (
                            <Link
                                to="/signup"
                                className="px-8 py-3 rounded-md bg-blue-600 hover:bg-blue-700 font-semibold transition-all duration-300 flex items-center gap-2"
                            >
                                Join Now
                                <FaRocket />
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-8 px-6 bg-gray-800">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0 flex items-center gap-2">
                        <FaCode className="text-blue-400" />
                        <span className="font-bold">CodersMeet</span>
                    </div>
                    <div className="text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} CodersMeet. All rights reserved.
                    </div>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                            <FaGithub className="text-xl" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                            <FaLinkedin className="text-xl" />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Landing
