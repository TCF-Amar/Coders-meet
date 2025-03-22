import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaFilter, FaSort, FaSearch, FaPlus, FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch, FaEye, FaComments } from 'react-icons/fa';
import ProjectCard from '../components/cards/ProjectCard';

function Projects() {
    const { user, isLoggedIn } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [sortBy, setSortBy] = useState('newest');
    const [showFilters, setShowFilters] = useState(false);
    const [featuredProject, setFeaturedProject] = useState(null);
    const [viewMode, setViewMode] = useState('grid');

    // Mock tags for filtering
    const availableTags = [
        'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python',
        'AWS', 'DevOps', 'UI/UX', 'Mobile', 'Web', 'Database',
        'Machine Learning', 'Cloud', 'Frontend', 'Backend'
    ];

    // Fetch projects data
    useEffect(() => {
        // This would be replaced with actual API calls
        setTimeout(() => {
            // Mock data
            const mockProjects = [
                {
                    id: '1',
                    title: 'CodeSync',
                    description: 'Real-time collaborative code editor with video chat functionality for remote pair programming and code review sessions.',
                    longDescription: 'CodeSync is a comprehensive platform designed for developers who want to collaborate in real-time. It includes features such as syntax highlighting for over 30 programming languages, real-time cursor tracking, integrated video and audio chat, and the ability to save and share coding sessions. Built with WebRTC, Socket.io, and React.',
                    author: { id: '1', name: 'Sarah Johnson', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
                    tags: ['React', 'WebRTC', 'Socket.io', 'Frontend'],
                    stars: 456,
                    forks: 98,
                    views: 2345,
                    comments: 37,
                    githubUrl: 'https://github.com',
                    liveUrl: 'https://example.com',
                    image: 'https://via.placeholder.com/600x400',
                    createdAt: '2023-01-15T10:30:00Z',
                    updatedAt: '2023-05-10T14:20:00Z',
                    status: 'active',
                    collaborators: 4,
                    featured: true
                },
                {
                    id: '2',
                    title: 'DevFlow',
                    description: 'A developer workflow automation tool that integrates with GitHub, Jira, and Slack for seamless project management.',
                    longDescription: 'DevFlow streamlines the development process by providing a unified interface for GitHub, Jira, and Slack. Developers can manage pull requests, track issues, and communicate with team members without switching between applications. Built with Node.js and React.',
                    author: { id: '2', name: 'Michael Chen', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
                    tags: ['Node.js', 'API', 'DevOps', 'Backend'],
                    stars: 312,
                    forks: 67,
                    views: 1876,
                    comments: 23,
                    githubUrl: 'https://github.com',
                    liveUrl: 'https://example.com',
                    image: 'https://via.placeholder.com/600x400',
                    createdAt: '2023-02-20T08:15:00Z',
                    updatedAt: '2023-05-05T11:30:00Z',
                    status: 'active',
                    collaborators: 2,
                    featured: false
                },
                {
                    id: '3',
                    title: 'DataViz',
                    description: 'A data visualization library for creating interactive charts and graphs for web applications.',
                    longDescription: 'DataViz is a lightweight yet powerful data visualization library for creating beautiful, interactive charts and graphs. It supports various chart types, including bar charts, line charts, pie charts, and scatter plots. Built with D3.js and TypeScript.',
                    author: { id: '3', name: 'Emma Wilson', avatar: 'https://randomuser.me/api/portraits/women/22.jpg' },
                    tags: ['JavaScript', 'TypeScript', 'D3.js', 'Data Visualization', 'Frontend'],
                    stars: 189,
                    forks: 42,
                    views: 1542,
                    comments: 18,
                    githubUrl: 'https://github.com',
                    liveUrl: 'https://example.com',
                    image: 'https://via.placeholder.com/600x400',
                    createdAt: '2023-03-10T15:45:00Z',
                    updatedAt: '2023-04-28T09:10:00Z',
                    status: 'active',
                    collaborators: 1,
                    featured: false
                },
                {
                    id: '4',
                    title: 'APIHub',
                    description: 'A central hub for testing and documenting RESTful APIs with automatic code generation for API clients.',
                    longDescription: 'APIHub helps developers test and document their RESTful APIs. It provides a user-friendly interface for sending requests, viewing responses, and generating documentation. The platform also offers automatic code generation for API clients in multiple programming languages. Built with Express.js and Vue.js.',
                    author: { id: '4', name: 'David Kim', avatar: 'https://randomuser.me/api/portraits/men/56.jpg' },
                    tags: ['API', 'Node.js', 'Express', 'Documentation', 'Backend'],
                    stars: 278,
                    forks: 51,
                    views: 1985,
                    comments: 27,
                    githubUrl: 'https://github.com',
                    liveUrl: 'https://example.com',
                    image: 'https://via.placeholder.com/600x400',
                    createdAt: '2023-01-25T11:20:00Z',
                    updatedAt: '2023-05-12T16:05:00Z',
                    status: 'active',
                    collaborators: 3,
                    featured: true
                }
            ];

            setProjects(mockProjects);
            setFilteredProjects(mockProjects);
            setFeaturedProject(mockProjects.find(p => p.featured) || mockProjects[0]);
            setLoading(false);
        }, 1000);
    }, []);

    // Apply filters and search
    useEffect(() => {
        let result = projects;

        // Apply search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(project =>
                project.title.toLowerCase().includes(query) ||
                project.description.toLowerCase().includes(query) ||
                project.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }

        // Apply tag filters
        if (selectedTags.length > 0) {
            result = result.filter(project =>
                project.tags.some(tag => selectedTags.includes(tag))
            );
        }

        // Apply sorting
        switch (sortBy) {
            case 'newest':
                result = [...result].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'oldest':
                result = [...result].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case 'popular':
                result = [...result].sort((a, b) => b.stars - a.stars);
                break;
            case 'stars':
                result = [...result].sort((a, b) => b.stars - a.stars);
                break;
            case 'forks':
                result = [...result].sort((a, b) => b.forks - a.forks);
                break;
            case 'views':
                result = [...result].sort((a, b) => b.views - a.views);
                break;
            default:
                break;
        }

        setFilteredProjects(result);
    }, [projects, searchQuery, selectedTags, sortBy]);

    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  ">
            {/* Page Header */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
                        <p className="text-gray-400">Discover innovative projects from developers around the world</p>
                    </div>
                    {isLoggedIn && (
                        <Link
                            to="/create/project"
                            className="mt-4 md:mt-0 px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition"
                        >
                            <FaPlus className="mr-2" />
                            Create Project
                        </Link>
                    )}
                </div>
            </div>

            {/* Featured Project */}
            {featuredProject && (
                <div className="mb-10 bg-gray-900 rounded-lg shadow-md overflow-hidden border border-gray-800">
                    <div className="relative h-64 sm:h-80">
                        <img
                            src={featuredProject.image}
                            alt={featuredProject.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6">
                            <div className="inline-block px-3 py-1 bg-blue-600 text-white text-xs rounded-full mb-3">
                                Featured Project
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">{featuredProject.title}</h2>
                            <p className="text-gray-300 mb-4 max-w-2xl">{featuredProject.description}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {featuredProject.tags.slice(0, 3).map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                                {featuredProject.tags.length > 3 && (
                                    <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">
                                        +{featuredProject.tags.length - 3} more
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                                <div className="flex items-center">
                                    <FaStar className="w-4 h-4 mr-1" />
                                    <span>{featuredProject.stars}</span>
                                </div>
                                <div className="flex items-center">
                                    <FaCodeBranch className="w-4 h-4 mr-1" />
                                    <span>{featuredProject.forks}</span>
                                </div>
                                <div className="flex items-center">
                                    <FaEye className="w-4 h-4 mr-1" />
                                    <span>{featuredProject.views}</span>
                                </div>
                                <div className="flex items-center">
                                    <FaComments className="w-4 h-4 mr-1" />
                                    <span>{featuredProject.comments}</span>
                                </div>
                            </div>

                            <div className="mt-4 flex space-x-3">
                                <Link
                                    to={`/projects/${featuredProject.id}`}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                >
                                    View Details
                                </Link>
                                {featuredProject.githubUrl && (
                                    <a
                                        href={featuredProject.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition flex items-center"
                                    >
                                        <FaGithub className="mr-2" />
                                        GitHub
                                    </a>
                                )}
                                {featuredProject.liveUrl && (
                                    <a
                                        href={featuredProject.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition flex items-center"
                                    >
                                        <FaExternalLinkAlt className="mr-2" />
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Search and Filters */}
            <div className="mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="text-gray-500" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search projects by name, description, or tags..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="px-3 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition flex items-center"
                        >
                            <FaFilter className="mr-2" />
                            Filters
                        </button>

                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="appearance-none pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="newest">Newest</option>
                                <option value="oldest">Oldest</option>
                                <option value="popular">Most Popular</option>
                                <option value="stars">Most Stars</option>
                                <option value="forks">Most Forks</option>
                                <option value="views">Most Views</option>
                            </select>
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaSort className="text-gray-500" />
                            </div>
                        </div>

                        <div className="flex border border-gray-700 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-400'}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`px-3 py-2 ${viewMode === 'list' ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-400'}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tags Filter */}
                {showFilters && (
                    <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                        <h3 className="text-white text-sm font-medium mb-3">Filter by Tags</h3>
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
                )}
            </div>

            {/* Projects List */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : filteredProjects.length === 0 ? (
                <div className="text-center py-12 bg-gray-800 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg font-medium text-white mb-2">No projects found</h3>
                    <p className="text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
                    <button
                        onClick={() => {
                            setSearchQuery('');
                            setSelectedTags([]);
                            setSortBy('newest');
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Clear Filters
                    </button>
                </div>
            ) : (
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
                    {filteredProjects.map(project => (
                        <div key={project.id}>
                            {viewMode === 'grid' ? (
                                <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="h-40 overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-white mb-1">
                                            <Link to={`/projects/${project.id}`} className="hover:text-blue-400">
                                                {project.title}
                                            </Link>
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-4">
                                            {project.description.length > 100
                                                ? `${project.description.substring(0, 100)}...`
                                                : project.description
                                            }
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tags.slice(0, 3).map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                            {project.tags.length > 3 && (
                                                <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">
                                                    +{project.tags.length - 3} more
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between text-sm text-gray-400">
                                            <div className="flex items-center space-x-3">
                                                <div className="flex items-center">
                                                    <FaStar className="w-4 h-4 mr-1" />
                                                    <span>{project.stars}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <FaCodeBranch className="w-4 h-4 mr-1" />
                                                    <span>{project.forks}</span>
                                                </div>
                                            </div>
                                            <Link
                                                to={`/projects/${project.id}`}
                                                className="text-blue-400 hover:text-blue-300 font-medium"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col md:flex-row bg-gray-900 rounded-lg shadow-sm border border-gray-800 overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="md:w-1/4 h-40 md:h-auto">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-6 md:w-3/4">
                                        <h3 className="text-lg font-semibold text-white mb-1">
                                            <Link to={`/projects/${project.id}`} className="hover:text-blue-400">
                                                {project.title}
                                            </Link>
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-4">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tags.map((tag, index) => (
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
                                                <div className="flex items-center">
                                                    <FaStar className="w-4 h-4 mr-1" />
                                                    <span>{project.stars}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <FaCodeBranch className="w-4 h-4 mr-1" />
                                                    <span>{project.forks}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <FaEye className="w-4 h-4 mr-1" />
                                                    <span>{project.views}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <FaComments className="w-4 h-4 mr-1" />
                                                    <span>{project.comments}</span>
                                                </div>
                                            </div>
                                            <div className="flex space-x-3">
                                                <Link
                                                    to={`/projects/${project.id}`}
                                                    className="text-blue-400 hover:text-blue-300 font-medium"
                                                >
                                                    View Details
                                                </Link>
                                                {project.githubUrl && (
                                                    <a
                                                        href={project.githubUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-gray-400 hover:text-gray-300"
                                                    >
                                                        <FaGithub className="w-4 h-4" />
                                                    </a>
                                                )}
                                                {project.liveUrl && (
                                                    <a
                                                        href={project.liveUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-gray-400 hover:text-gray-300"
                                                    >
                                                        <FaExternalLinkAlt className="w-4 h-4" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Projects; 