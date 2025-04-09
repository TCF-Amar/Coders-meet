import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaSearch, FaFilter, FaBookmark, FaComment, FaHeart, FaShare, FaPlus } from 'react-icons/fa';
import { collection, query, orderBy, doc, getDoc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { firestore } from '../config/firebase';
import { getUserPosts, createPostLike, deletePostLike } from '../services/firebaseServices';

const Posts = () => {
    const { user, isLoggedIn } = useSelector((state) => state.auth);
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState('newest');
    const navigate = useNavigate();

    // Categories for filtering
    const categories = ['Tech', 'Education', 'Entertainment', 'Design', 'Development', 'Career'];

    // Fetch all public posts from all users
    useEffect(() => {
        setLoading(true);

        const fetchAllPosts = async () => {
            try {
                const allPosts = await getUserPosts();

                // Process posts data to ensure consistent format
                const formattedPosts = allPosts.map(post => ({
                    id: post.id || '',
                    ...post,
                    title: post.title || 'Untitled Post',
                    content: post.content || '',
                    category: post.category || 'Uncategorized',
                    tags: post.tags || [],
                    likes: post.likes || 0,
                    comments: post.comments || 0,
                    likedBy: post.likedBy || [],
                    bookmarkedBy: post.bookmarkedBy || [],
                    createdAt: post.createdAt ?
                        (typeof post.createdAt === 'object' ?
                            post.createdAt.toDate().toISOString() :
                            post.createdAt) :
                        new Date().toISOString(),
                    author: post.author || {
                        id: post.authorId || 'unknown',
                        name: post.authorName || 'Anonymous',
                        photo: post.authorPhoto || 'https://ui-avatars.com/api/?name=User'
                    },
                    visibility: post.visibility || 'public'
                }));

                // Filter only public posts
                const publicPosts = formattedPosts.filter(post => post.visibility === 'public');

                setPosts(publicPosts);
                setFilteredPosts(publicPosts);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setLoading(false);
            }
        };

        fetchAllPosts();

        return () => {
            // Clean up if needed
        };
    }, []);

    // Apply filters and search
    useEffect(() => {
        let result = [...posts];

        // Apply search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                post =>
                    post.title?.toLowerCase().includes(query) ||
                    post.content?.toLowerCase().includes(query) ||
                    post.tags?.some(tag => tag.toLowerCase().includes(query))
            );
        }

        // Apply category filter
        if (selectedCategory !== 'all') {
            result = result.filter(post => post.category === selectedCategory);
        }

        // Apply sorting
        switch (sortBy) {
            case 'newest':
                result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'oldest':
                result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case 'mostLiked':
                result.sort((a, b) => (b.likes || 0) - (a.likes || 0));
                break;
            case 'mostCommented':
                result.sort((a, b) => (b.comments || 0) - (a.comments || 0));
                break;
            default:
                break;
        }

        setFilteredPosts(result);
    }, [posts, searchQuery, selectedCategory, sortBy]);

    // Format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Toggle bookmark
    const toggleBookmark = async (postId) => {
        if (!isLoggedIn) {
            navigate('/signin');
            return;
        }

        try {
            const postRef = doc(firestore, 'posts', postId);
            const postDoc = await getDoc(postRef);

            if (postDoc.exists()) {
                const post = postDoc.data();
                const bookmarkedBy = post.bookmarkedBy || [];
                const isBookmarked = bookmarkedBy.includes(user.uid);

                // Update Firestore
                await updateDoc(postRef, {
                    bookmarkedBy: isBookmarked
                        ? arrayRemove(user.uid)
                        : arrayUnion(user.uid),
                });

                // Update local state
                setPosts(prevPosts =>
                    prevPosts.map(post =>
                        post.id === postId
                            ? {
                                ...post,
                                bookmarkedBy: isBookmarked
                                    ? post.bookmarkedBy.filter(id => id !== user.uid)
                                    : [...(post.bookmarkedBy || []), user.uid],
                            }
                            : post
                    )
                );
            }
        } catch (error) {
            console.error('Error toggling bookmark:', error);
        }
    };

    // Toggle like
    const toggleLike = async (postId, userId) => {
        if (!isLoggedIn) {
            navigate('/signin');
            return;
        }

        try {
            const postRef = doc(firestore, 'posts', postId, 'likes', userId);
            const postDoc = await getDoc(postRef);
            console.log(postDoc.exists());
            if (postDoc.exists()) {
                await deletePostLike(postId, userId);
            } else {
                await createPostLike(postId, userId);
            }
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };


    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
            {/* Page Header */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Posts</h1>
                        <p className="text-gray-400">Discover insights, tutorials, and discussions from the community</p>
                    </div>
                    {isLoggedIn && (
                        <Link
                            to="/create/post"
                            className="mt-4 md:mt-0 px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition"
                        >
                            <FaPlus className="mr-2" />
                            Create Post
                        </Link>
                    )}
                </div>
            </div>

            {/* Search and Filters */}
            <div className="mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="text-gray-500" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search posts by title, content, or tags..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition flex items-center"
                        >
                            <FaFilter className="mr-2" />
                            Filters
                        </button>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                            <option value="mostLiked">Most Liked</option>
                            <option value="mostCommented">Most Commented</option>
                        </select>
                    </div>
                </div>

                {/* Filter Panel */}
                {showFilters && (
                    <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                        <h3 className="text-white text-sm font-medium mb-3">Filter by Category</h3>
                        <div className="flex flex-wrap gap-2">
                            <button
                                className={`px-3 py-1 text-xs rounded-full ${selectedCategory === 'all'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                                onClick={() => setSelectedCategory('all')}
                            >
                                All
                            </button>
                            {categories.map(category => (
                                <button
                                    key={category}
                                    className={`px-3 py-1 text-xs rounded-full ${selectedCategory === category
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                        }`}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Posts List */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : filteredPosts.length === 0 ? (
                <div className="text-center py-12 bg-gray-800 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg font-medium text-white mb-2">No posts found</h3>
                    <p className="text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
                    <button
                        onClick={() => {
                            setSearchQuery('');
                            setSelectedCategory('all');
                            setSortBy('newest');
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Clear Filters
                    </button>
                </div>
            ) : (
                <div className="space-y-8">
                    {filteredPosts.map(post => (
                        <div key={post.id} className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="flex items-center mb-4 p-2">
                                <img
                                    src={post.author.photo}
                                    alt={post.author.name}
                                    className="w-10 h-10 rounded-full mr-3"
                                />
                                <div>
                                    <Link to={`/profile/${post.author.id}`} className="text-white font-medium hover:text-blue-400">
                                        {post.author.name}
                                    </Link>
                                    <p className="text-gray-500 text-sm">{formatDate(post.createdAt)}</p>
                                </div>
                            </div>
                            {post.imageUrl && (
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={post.imageUrl}
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-white mb-2">
                                    <Link to={`/posts/${post.id}`} className="hover:text-blue-400">
                                        {post.title}
                                    </Link>
                                </h2>

                                <p className="text-gray-400 text-sm mb-4">
                                    {post.content.length > 200
                                        ? `${post.content.substring(0, 200)}...`
                                        : post.content
                                    }
                                </p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full">
                                        {post.category}
                                    </span>
                                    {post.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between text-sm text-gray-400">
                                    <div className="flex items-center space-x-4">
                                        <button
                                            onClick={() => toggleLike(post.id)}
                                            className="flex items-center space-x-1 group"
                                        >
                                            <FaHeart className={`w-4 h-4 ${post.likedBy?.includes(user?.uid) ? 'text-red-500' : 'text-gray-500 group-hover:text-red-500'}`} />
                                            <span>{post.likes || 0}</span>
                                        </button>
                                        <Link to={`/posts/${post.id}#comments`} className="flex items-center space-x-1 hover:text-gray-300">
                                            <FaComment className="w-4 h-4 text-gray-500" />
                                            <span>{post.comments || 0}</span>
                                        </Link>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button className="text-gray-500 hover:text-gray-300">
                                            <FaShare className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => toggleBookmark(post.id)}
                                            className="text-gray-500 hover:text-gray-300"
                                        >
                                            <FaBookmark className={post.bookmarkedBy?.includes(user?.uid) ? 'text-yellow-500' : ''} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Posts; 