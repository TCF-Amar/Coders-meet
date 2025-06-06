import React from 'react'
import { useState } from 'react'
import { signIn } from '../../services/firebaseServices'
import { Link, useNavigate } from 'react-router-dom'
import { FaHome, FaEye, FaEyeSlash } from 'react-icons/fa'
import GoogleBtn from '../../components/GoogleBtn.jsx'
import { toast } from 'react-hot-toast'
function SignIn() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await signIn(email, password)
            navigate('/')
            toast.success("Signed in successfully")
        } catch (error) {
            toast.error("Invalid email or password")
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 fixed top-0 left-0 right-0 bottom-0 overflow-hidden overflow-y-auto">
            <div className='absolute top-0 left-0'>
                <Link to="/" className="text-white font-bold py-2 px-4 rounded flex items-center gap-2 hover:text-gray-300">
                    <FaHome />
                    <span className='text-sm hidden sm:block'>Back to Home</span>
                </Link>
            </div>
            <div className="max-w-md w-full space-y-8">
                <div className='hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-500 ease-in-out'>
                    <h1 className="text-center text-3xl font-extrabold text-white">Welcome Back</h1>
                    <h3 className="text-center text-2xl font-extrabold text-white">CodersMeet</h3>
                    <p className="mt-2 text-center text-sm text-gray-400">
                        Sign in to your account
                    </p>
                </div>

             

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input
                                type="text"
                                id="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent sm:text-sm"
                            />
                        </div>

                        <div className="relative">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent sm:text-sm"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="relative w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md text-white bg-gray-800 font-semibold transition-all duration-300 ease-in-out overflow-hidden group hover:bg-gray-700 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                        <span className="absolute inset-0 scale-0 bg-white/20 rounded-full transition-transform duration-2 group-hover:scale-150"></span>
                    </button>
                </form>

                <div className="flex items-center justify-center">
                    <p className="text-gray-400">Don't have an account? <Link to="/signup" className='underline hover:text-white'>Sign up</Link></p>
                </div>

                <hr className="border-gray-600" />

                <div className="flex items-center justify-center">
                    <div className="w-full" >
                        <GoogleBtn />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn
