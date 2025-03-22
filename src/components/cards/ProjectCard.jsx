import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch, FaEye } from 'react-icons/fa';

const ProjectCard = ({ project }) => {
    return (
        <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-1">
                            {project.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4">
                            {project.description}
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-gray-300"
                            >
                                <FaGithub className="w-5 h-5" />
                            </a>
                        )}
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-gray-300"
                            >
                                <FaExternalLinkAlt className="w-5 h-5" />
                            </a>
                        )}
                    </div>
                </div>

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
    );
};

export default ProjectCard; 