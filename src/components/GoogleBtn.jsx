import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signInWithGoogle } from '../services/firebaseServices'
import { setIsLoading } from '../redux/features/authSlice'
import toast from 'react-hot-toast'

function GoogleBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading, setLocalLoading] = useState(false)

    const handleGoogleSignIn = async () => {
        if (isLoading) return;

        try {
            setLocalLoading(true);
            dispatch(setIsLoading(true));
            await signInWithGoogle();
            navigate('/');
            toast.success('Signed in with Google successfully');
        } catch (error) {
            console.error('Google Sign In Error:', error);
            if (error.code === 'auth/popup-closed-by-user') {
                // Don't show error for user cancellation
                return;
            } else if (error.code === 'auth/network-request-failed') {
                toast.error('Network error. Please check your internet connection');
            } else if (error.code === 'auth/popup-blocked') {
                toast.error('Pop-up blocked by browser. Please allow pop-ups for this site');
            } else if (error.code === 'auth/unauthorized-domain') {
                toast.error('This domain is not authorized for Google sign-in. Please contact support.');
            } else {
                toast.error(error.message || 'Failed to sign in with Google. Please try again');
            }
        } finally {
            setLocalLoading(false);
            dispatch(setIsLoading(false));
        }
    }

    return (
        <button
            className="relative w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md text-white bg-gray-800 font-semibold transition-all duration-300 ease-in-out overflow-hidden group hover:bg-gray-700 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
        >
            <img
                src="https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg"
                alt="Google"
                className='w-6 h-6'
            />
            {isLoading ? 'Signing in...' : 'Sign in with Google'}
            <span className="absolute inset-0 scale-0 bg-white/20 rounded-full transition-transform duration-2 group-hover:scale-150"></span>
        </button>
    )
}

export default GoogleBtn
