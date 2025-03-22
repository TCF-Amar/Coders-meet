import React from 'react';
import { Link } from 'react-router-dom';
import { FaCode, FaHeart, FaComment, FaCopy } from 'react-icons/fa';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SnippetCard = ({ snippet }) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(snippet.code);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {snippet.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                            {snippet.description}
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={copyToClipboard}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <FaCopy className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {snippet.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="mb-4">
                    <SyntaxHighlighter
                        language={snippet.language}
                        style={atomDark}
                        customStyle={{
                            borderRadius: '0.5rem',
                            margin: 0,
                            fontSize: '0.875rem',
                        }}
                        showLineNumbers
                        wrapLines
                        wrapLongLines
                    >
                        {snippet.code}
                    </SyntaxHighlighter>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <FaHeart className="w-4 h-4 mr-1" />
                            <span>{snippet.likes}</span>
                        </div>
                        <div className="flex items-center">
                            <FaComment className="w-4 h-4 mr-1" />
                            <span>{snippet.comments}</span>
                        </div>
                    </div>
                    <Link
                        to={`/snippets/${snippet.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SnippetCard; 