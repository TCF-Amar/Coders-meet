import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signInWithGoogle } from '../services/firebaseServices'
import { setIsLoading } from '../redux/features/authSlice'
import toast from 'react-hot-toast'
function GoogleBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState(null)

    const handleGoogleSignIn = async () => {
        try {
            dispatch(setIsLoading(true))
            await signInWithGoogle()
            navigate('/')
            toast.success('Signed in successfully')
        } catch (error) {
            toast.error(error.message)
        } finally {
            dispatch(setIsLoading(false))

        }
    }
    return (

        <button className="relative w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md text-white bg-gray-800 font-semibold transition-all duration-300 ease-in-out overflow-hidden group hover:bg-gray-700 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            onClick={handleGoogleSignIn}
        >
            <img src={"https://img.icons8.com/?size=100&id=17949&format=png&color=000000"} alt="Google"
                className='w-6 h-6 mr-2' />
            Sign in with Google
            <span className="absolute inset-0 scale-0 bg-white/20 rounded-full transition-transform duration-2 group-hover:scale-150"></span>

        </button>

    )
}

export default GoogleBtn
