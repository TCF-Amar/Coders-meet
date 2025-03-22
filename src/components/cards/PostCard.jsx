import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaComment, FaBookmark, FaShare } from 'react-icons/fa';
import { getUserPosts } from '../../services/firebaseServices';

const PostCard = ({ uid }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {

        const fetchPosts = async () => {
            setLoading(true);
            try {
                const postData = await getUserPosts(uid);
                console.log(postData);
                if (postData) {
                    setPosts([postData]); // Wrap in an array to ensure posts is an array
                } else {
                    setPosts([]); // Set to empty array if no posts found
                }
            } catch (err) {
                console.error("Error fetching posts:", err);
                setError("Failed to load posts");
            } finally {
                setLoading(false);
            }
        };

        if (uid) {
            fetchPosts();
        }
    }, [uid]);

    if (loading) return <div className="text-gray-400 text-center py-4">Loading posts...</div>;
    if (posts.length === 0) return <div className="text-gray-400 text-center py-4">No posts yet</div>;

    return (
        <div className="space-y-4">
            {posts.map((post, index) => (
                <div key={index} className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-1">
                                    {post.title}
                                </h3>
                                <div className='flex items-center gap-2 rounded-lg overflow-hidden max-h-[300px]'>
                                    <img src={post.imageUrl} alt={post.title} className='w-full h-full object-cover' />
                                </div>
                                <p className="text-gray-400 text-sm my-4 ">
                                    {post.content?.substring(0, 150)}
                                    {post.content?.length > 150 ? '...' : ''}
                                </p>
                            </div>
                            <div className="flex space-x-2 ">
                                <button className="text-gray-500 hover:text-gray-300">
                                    <FaBookmark className="w-5 h-5" />
                                </button>
                                <button className="text-gray-500 hover:text-gray-300">
                                    <FaShare className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags?.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-400">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                    <FaHeart className="w-4 h-4 mr-1" />
                                    <span>{post.likes || 0}</span>
                                </div>
                                <div className="flex items-center">
                                    <FaComment className="w-4 h-4 mr-1" />
                                    <span>{post.comments || 0}</span>
                                </div>
                            </div>
                            <Link
                                to={`/posts/${post.id}`}
                                className="text-blue-400 hover:text-blue-300 font-medium"
                            >
                                Read More
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostCard; 