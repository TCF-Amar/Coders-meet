import React from 'react';
import { FaStar, FaCodeBranch, FaEye, FaCode } from 'react-icons/fa';

const RepoCard = ({ repo }) => {
    return (
        <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-1">
                            {repo.name}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4">
                            {repo.description || 'No description available'}
                        </p>
                    </div>
                    <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-300"
                    >
                        <FaCode className="w-5 h-5" />
                    </a>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {repo.language && (
                        <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">
                            {repo.language}
                        </span>
                    )}
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center">
                        <FaStar className="w-4 h-4 mr-1" />
                        <span>{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center">
                        <FaCodeBranch className="w-4 h-4 mr-1" />
                        <span>{repo.forks_count}</span>
                    </div>
                    <div className="flex items-center">
                        <FaEye className="w-4 h-4 mr-1" />
                        <span>{repo.watchers_count}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RepoCard; 