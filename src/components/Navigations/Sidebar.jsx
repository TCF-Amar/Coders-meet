import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaCode, FaBlog, FaUsers, FaBookmark, FaStar, FaCog, FaGithub, FaCodeBranch, FaImage, FaStackOverflow, FaLayerGroup } from 'react-icons/fa';

const Sidebar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    const navigationItems = [
        { name: 'Home', icon: FaHome, path: '/' },
        { name: 'Posts', icon: FaImage, path: '/posts' },
        { name: 'Blogs', icon: FaBlog, path: '/blogs' },
        { name: 'Snippets', icon: FaCode, path: '/snippets' },
        { name: 'Projects', icon: FaLayerGroup, path: '/projects' },
        { name: 'Community', icon: FaUsers, path: '/community' },
        { name: 'Saved', icon: FaBookmark, path: '/saved' },
        { name: 'Trending', icon: FaStar, path: '/trending' },
        { name: 'GitHub', icon: FaGithub, path: '/github' },
        { name: 'Settings', icon: FaCog, path: '/settings' },
    ];

    const categories = [
        { name: 'Frontend', icon: FaCode, count: 128 },
        { name: 'Backend', icon: FaCodeBranch, count: 96 },
        { name: 'Mobile', icon: FaCode, count: 64 },
        { name: 'DevOps', icon: FaCodeBranch, count: 48 },
        { name: 'AI/ML', icon: FaCode, count: 32 },
    ];

    return (
        <div className=" bg-white dark:bg-gray-800 rounded-lg  overflow-y-auto">
            <div className="p-4">
                {/* Navigation */}
                <nav className="space-y-1">
                    {navigationItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive(item.path)
                                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-600 dark:text-white'
                                    : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <Icon className="mr-3 h-5 w-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Categories */}
                <div className="mt-8">
                    <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        Categories
                    </h3>
                    <div className="mt-4 space-y-1">
                        {categories.map((category) => {
                            const Icon = category.icon;
                            return (
                                <button
                                    key={category.name}
                                    className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    <div className="flex items-center">
                                        <Icon className="mr-3 h-5 w-5" />
                                        {category.name}
                                    </div>
                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full dark:bg-gray-700 dark:text-gray-300">
                                        {category.count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Tags */}
                <div className="mt-8">
                    <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        Popular Tags
                    </h3>
                    <div className="mt-4 px-4 flex flex-wrap gap-2">
                        {['React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'AWS', 'Docker', 'Kubernetes'].map((tag) => (
                            <button
                                key={tag}
                                className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar; 