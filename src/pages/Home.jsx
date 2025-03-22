import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaFire, FaUsers, FaCode, FaRocket, FaClipboard, FaFilter } from 'react-icons/fa';
import PostCard from '../components/cards/PostCard';
import ProjectCard from '../components/cards/ProjectCard';

function Home() {
    const { user } = useSelector((state) => state.auth);
    const [activeTab, setActiveTab] = useState('trending');
    const [loading, setLoading] = useState(true);
    const [trendingPosts, setTrendingPosts] = useState([]);
    const [trendingProjects, setTrendingProjects] = useState([]);
    const [trendingDevelopers, setTrendingDevelopers] = useState([]);
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [timeFilter, setTimeFilter] = useState('week');

    // Mock tags for filtering
    const availableTags = [
        'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python',
        'AWS', 'DevOps', 'UI/UX', 'Mobile', 'Web', 'Database',
        'Machine Learning', 'Cloud', 'Frontend', 'Backend'
    ];

    // Fetch data
    useEffect(() => {
        // This would be replaced with actual API calls
        setTimeout(() => {
            // Mock data
            setTrendingPosts([
                {
                    id: '1',
                    title: 'Building Scalable React Applications',
                    excerpt: 'Learn how to structure your React applications for scalability and maintainability.',
                    author: { id: '1', name: 'Sarah Johnson', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
                    tags: ['React', 'JavaScript', 'Frontend'],
                    likes: 247,
                    comments: 53,
                    createdAt: '2023-05-15T10:30:00Z'
                },
                {
                    id: '2',
                    title: 'Advanced TypeScript Patterns for Enterprise Applications',
                    excerpt: 'Discover powerful TypeScript patterns that will make your enterprise codebase more robust.',
                    author: { id: '2', name: 'Michael Chen', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
                    tags: ['TypeScript', 'JavaScript', 'Enterprise'],
                    likes: 189,
                    comments: 41,
                    createdAt: '2023-05-14T14:45:00Z'
                },
                {
                    id: '3',
                    title: 'Mastering Node.js Microservices',
                    excerpt: 'A comprehensive guide to building and deploying microservices with Node.js.',
                    author: { id: '3', name: 'Emma Wilson', avatar: 'https://randomuser.me/api/portraits/women/22.jpg' },
                    tags: ['Node.js', 'Microservices', 'Backend'],
                    likes: 324,
                    comments: 78,
                    createdAt: '2023-05-13T09:15:00Z'
                }
            ]);

            setTrendingProjects([
                {
                    id: '1',
                    title: 'CodeSync',
                    description: 'Real-time collaborative code editor with video chat functionality',
                    tags: ['React', 'WebRTC', 'Socket.io'],
                    stars: 456,
                    forks: 98,
                    views: 2345,
                    githubUrl: 'https://github.com',
                    liveUrl: 'https://example.com'
                },
                {
                    id: '2',
                    title: 'DevFlow',
                    description: 'A developer workflow automation tool that integrates with GitHub, Jira, and Slack',
                    tags: ['Node.js', 'API', 'DevOps'],
                    stars: 312,
                    forks: 67,
                    views: 1876,
                    githubUrl: 'https://github.com',
                    liveUrl: 'https://example.com'
                }
            ]);

            setTrendingDevelopers([
                {
                    id: '1',
                    name: 'Alex Morgan',
                    username: 'alexdev',
                    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
                    title: 'Senior Frontend Developer',
                    skills: ['React', 'TypeScript', 'GraphQL'],
                    followers: 1243,
                    contributions: 567
                },
                {
                    id: '2',
                    name: 'Sophia Lee',
                    username: 'sophiacode',
                    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
                    title: 'Full Stack Engineer',
                    skills: ['Node.js', 'React', 'MongoDB'],
                    followers: 987,
                    contributions: 432
                },
                {
                    id: '3',
                    name: 'Daniel Brown',
                    username: 'dandevops',
                    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
                    title: 'DevOps Specialist',
                    skills: ['Kubernetes', 'Docker', 'AWS'],
                    followers: 876,
                    contributions: 389
                },
                {
                    id: '4',
                    name: 'Olivia Garcia',
                    username: 'oliviacodes',
                    avatar: 'https://randomuser.me/api/portraits/women/66.jpg',
                    title: 'Mobile Developer',
                    skills: ['React Native', 'Flutter', 'Swift'],
                    followers: 763,
                    contributions: 298
                }
            ]);

            setLoading(false);
        }, 1000);
    }, []);

    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    // Filter content based on selected tags
    const getFilteredContent = (content) => {
        if (selectedTags.length === 0) return content;
        return content.filter(item =>
            item.tags.some(tag => selectedTags.includes(tag))
        );
    };

    return (
        <div className=" ">
            {/* Welcome Message */}
            <div className="">
                <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.displayName || 'Coder'}!</h1>
                <p className="text-gray-400">Discover trending content, connect with other developers, and showcase your work.</p>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col md:flex-row gap-6">
                {/* Content Feed (2/3 width on desktop) */}
                <div className="w-full md:w-2/3">
                    {/* Tabs */}
                    <div className="flex border-b border-gray-700 mb-6">
                        <button
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'trending' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                            onClick={() => setActiveTab('trending')}
                        >
                            <FaFire className="inline mr-2" />
                            Trending
                        </button>
                        <button
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'projects' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                            onClick={() => setActiveTab('projects')}
                        >
                            <FaCode className="inline mr-2" />
                            Projects
                        </button>
                        <button
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'developers' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                            onClick={() => setActiveTab('developers')}
                        >
                            <FaUsers className="inline mr-2" />
                            Developers
                        </button>
                        <div className="ml-auto">
                            <button
                                className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-gray-300 flex items-center"
                                onClick={() => setFilterOpen(!filterOpen)}
                            >
                                <FaFilter className="mr-2" />
                                Filter
                            </button>
                        </div>
                    </div>

                    {/* Filter Panel */}
                    {filterOpen && (
                        <div className="bg-gray-800 rounded-lg p-4 mb-6">
                            <div className="mb-4">
                                <h3 className="text-white text-sm font-medium mb-2">Time Period</h3>
                                <div className="flex space-x-2">
                                    {['day', 'week', 'month', 'year'].map(period => (
                                        <button
                                            key={period}
                                            className={`px-3 py-1 text-xs rounded-full ${timeFilter === period ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                                            onClick={() => setTimeFilter(period)}
                                        >
                                            {period.charAt(0).toUpperCase() + period.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-white text-sm font-medium mb-2">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {availableTags.map(tag => (
                                        <button
                                            key={tag}
                                            className={`px-3 py-1 text-xs rounded-full ${selectedTags.includes(tag) ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                                            onClick={() => toggleTag(tag)}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Loading State */}
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <>
                            {/* Trending Content */}
                            {activeTab === 'trending' && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold text-white mb-4">Trending Posts</h2>
                                    {getFilteredContent(trendingPosts).map(post => (
                                        <PostCard key={post.id} post={post} />
                                    ))}

                                    <div className="mt-8">
                                        <h2 className="text-xl font-bold text-white mb-4">Trending Projects</h2>
                                        <div className="grid grid-cols-1 gap-6">
                                            {getFilteredContent(trendingProjects).map(project => (
                                                <ProjectCard key={project.id} project={project} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Projects Tab */}
                            {activeTab === 'projects' && (
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-bold text-white">Featured Projects</h2>
                                        <Link to="/projects" className="text-blue-400 text-sm hover:text-blue-300">View All</Link>
                                    </div>
                                    <div className="grid grid-cols-1 gap-6">
                                        {getFilteredContent(trendingProjects).map(project => (
                                            <ProjectCard key={project.id} project={project} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Developers Tab */}
                            {activeTab === 'developers' && (
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-bold text-white">Top Developers</h2>
                                        <Link to="/developers" className="text-blue-400 text-sm hover:text-blue-300">View All</Link>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {trendingDevelopers.map(developer => (
                                            <div key={developer.id} className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 p-4 hover:shadow-md transition-shadow">
                                                <div className="flex items-center">
                                                    <img
                                                        src={developer.avatar}
                                                        alt={developer.name}
                                                        className="w-12 h-12 rounded-full mr-4"
                                                    />
                                                    <div>
                                                        <h3 className="text-white font-medium">{developer.name}</h3>
                                                        <p className="text-gray-400 text-sm">@{developer.username}</p>
                                                    </div>
                                                </div>
                                                <p className="text-blue-400 mt-2 text-sm">{developer.title}</p>
                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    {developer.skills.map((skill, index) => (
                                                        <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="mt-3 flex justify-between text-sm text-gray-400">
                                                    <span>{developer.followers} followers</span>
                                                    <span>{developer.contributions} contributions</span>
                                                </div>
                                                <Link
                                                    to={`/profile/${developer.id}`}
                                                    className="mt-3 block text-center py-2 bg-gray-800 hover:bg-gray-700 text-white rounded text-sm"
                                                >
                                                    View Profile
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Right Sidebar (1/3 width on desktop) */}
                <div className="w-full md:w-1/3 space-y-6">
                    {/* Create Post/Project Card */}
                    <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
                        <h3 className="text-white font-medium mb-4">Share with the community</h3>
                        <div className="space-y-3">
                            <Link to="/create/post" className="flex items-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white">
                                <FaClipboard className="mr-3" />
                                Create Post
                            </Link>
                            <Link to="/create/project" className="flex items-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white">
                                <FaRocket className="mr-3" />
                                Share Project
                            </Link>
                        </div>
                    </div>

                    {/* Trending Tags */}
                    <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
                        <h3 className="text-white font-medium mb-4">Trending Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {availableTags.slice(0, 10).map(tag => (
                                <Link
                                    key={tag}
                                    to={`/tags/${tag.toLowerCase()}`}
                                    className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full hover:bg-gray-700"
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Suggested Connections */}
                    <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
                        <h3 className="text-white font-medium mb-4">People to Connect With</h3>
                        <div className="space-y-4">
                            {trendingDevelopers.slice(0, 3).map(dev => (
                                <div key={dev.id} className="flex items-center">
                                    <img
                                        src={dev.avatar}
                                        alt={dev.name}
                                        className="w-10 h-10 rounded-full mr-3"
                                    />
                                    <div className="flex-1">
                                        <h4 className="text-white text-sm">{dev.name}</h4>
                                        <p className="text-gray-400 text-xs">{dev.title}</p>
                                    </div>
                                    <button className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                                        Connect
                                    </button>
                                </div>
                            ))}
                        </div>
                        <Link to="/discover" className="block text-center text-blue-400 text-sm mt-4 hover:text-blue-300">
                            View More
                        </Link>
                    </div>

                    {/* Upcoming Events */}
                    <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
                        <h3 className="text-white font-medium mb-4">Upcoming Events</h3>
                        <div className="space-y-4">
                            <div className="border-l-2 border-blue-500 pl-3">
                                <h4 className="text-white text-sm">React Summit 2023</h4>
                                <p className="text-gray-400 text-xs">Virtual • June 15, 2023</p>
                                <Link to="/events/1" className="text-blue-400 text-xs hover:text-blue-300">
                                    Learn More
                                </Link>
                            </div>
                            <div className="border-l-2 border-green-500 pl-3">
                                <h4 className="text-white text-sm">Node.js Conference</h4>
                                <p className="text-gray-400 text-xs">New York • July 8, 2023</p>
                                <Link to="/events/2" className="text-blue-400 text-xs hover:text-blue-300">
                                    Learn More
                                </Link>
                            </div>
                            <div className="border-l-2 border-purple-500 pl-3">
                                <h4 className="text-white text-sm">Web Development Hackathon</h4>
                                <p className="text-gray-400 text-xs">Online • August 20-22, 2023</p>
                                <Link to="/events/3" className="text-blue-400 text-xs hover:text-blue-300">
                                    Learn More
                                </Link>
                            </div>
                        </div>
                        <Link to="/events" className="block text-center text-blue-400 text-sm mt-4 hover:text-blue-300">
                            View All Events
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
