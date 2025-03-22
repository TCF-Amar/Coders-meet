import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import SignUp from './pages/auth/SignUp.jsx'
import SignIn from './pages/auth/SignIn.jsx'
import { useSelector } from 'react-redux'
import Landing from './pages/Landing.jsx'
import Profile from './pages/Profile.jsx'
import GitHub from './pages/GitHub.jsx'
import Projects from './pages/Projects.jsx'
import Posts from './pages/Posts.jsx'
import CreateContent from './pages/create/CreateContent.jsx'
import NotFound from './components/NotFound.jsx'

function Layout() {
    const { user, isLoggedIn } = useSelector((state) => state.auth)
    return (
        <div    >
            <Routes>
                <Route path='/' element={isLoggedIn ? <Home /> : <Landing />} />
                <Route path='/signup' element={isLoggedIn ? <Navigate to='/' /> : <SignUp />} />
                <Route path='/signin' element={isLoggedIn ? <Navigate to='/' /> : <SignIn />} />
                <Route path='/profile/:id' element={isLoggedIn ? <Profile /> : <Navigate to='/' />} />
                <Route path='/github' element={<GitHub />} />
                <Route path='/projects' element={<Projects />} />
                <Route path='/posts' element={<Posts />} />
                <Route path='/notifications' element={isLoggedIn ? <Navigate to='/' /> : <Navigate to='/' />} />

                {/* Content Creation Routes */}
                <Route path='/create/post' element={isLoggedIn ? <CreateContent type="post" /> : <Navigate to='/' />} />
                <Route path='/create/blog' element={isLoggedIn ? <CreateContent type="blog" /> : <Navigate to='/' />} />
                <Route path='/create/snippet' element={isLoggedIn ? <CreateContent type="snippet" /> : <Navigate to='/' />} />
                <Route path='/create/project' element={isLoggedIn ? <CreateContent type="project" /> : <Navigate to='/' />} />
                <Route path='/create/:type' element={isLoggedIn ? <CreateContent /> : <Navigate to='/' />} />

                <Route path='*' element={<NotFound />} />
            </Routes>
        </div>
    )
}

export default Layout
