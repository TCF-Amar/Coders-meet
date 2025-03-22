import React from 'react';
import { FaCode } from 'react-icons/fa';

// Full page loader for initial app loading
export const FullPageLoader = () => {
    return (
        <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
            <div className="text-center">
                <FaCode className="text-6xl text-blue-500 animate-bounce mb-4" />
                <h2 className="text-xl font-bold text-white mt-4">Loading CodersMeet</h2>
                <p className="text-gray-400 mt-2 flex text-2xl justify-center space-x-1">
                    <span>Connecting developers</span>
                    <span className="inline-block animate-pulse [animation-delay:0.2s] font-bold">.</span>
                    <span className="inline-block animate-pulse [animation-delay:0.3s] font-bold">.</span>
                    <span className="inline-block animate-pulse [animation-delay:0.4s] font-bold">.</span>
                </p>
            </div>
        </div>
    );
};

// Spinner component for buttons
export const ButtonSpinner = ({ size = 'sm' }) => {
    const sizeClasses = {
        xs: 'w-3 h-3 border-2',
        sm: 'w-4 h-4 border-2',
        md: 'w-6 h-6 border-2',
        lg: 'w-8 h-8 border-3',
    };

    return (
        <div className={`${sizeClasses[size]} rounded-full border-blue-400 border-t-transparent animate-spin inline-block`}></div>
    );
};

// Button with loading state
export const LoadingButton = ({
    isLoading,
    loadingText = 'Loading...',
    children,
    className,
    ...props
}) => {
    return (
        <button
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md ${isLoading ? 'opacity-80 cursor-not-allowed' : ''} ${className}`}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <>
                    <ButtonSpinner />
                    <span>{loadingText}</span>
                </>
            ) : (
                children
            )}
        </button>
    );
};

// Project card skeleton
export const ProjectCardSkeleton = () => {
    return (
        <div className="bg-gray-800 rounded-lg p-4 animate-pulse">
            <div className="flex justify-between">
                <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
                <div className="h-6 w-6 bg-gray-700 rounded-full"></div>
            </div>
            <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            </div>
            <div className="flex gap-2 mt-4">
                <div className="h-6 bg-gray-700 rounded w-16"></div>
                <div className="h-6 bg-gray-700 rounded w-16"></div>
            </div>
            <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                    <div className="h-4 bg-gray-700 rounded w-24"></div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-4 bg-gray-700 rounded w-8"></div>
                    <div className="h-4 bg-gray-700 rounded w-8"></div>
                </div>
            </div>
        </div>
    );
};

// Developer card skeleton
export const DeveloperCardSkeleton = () => {
    return (
        <div className="bg-gray-800 rounded-lg p-4 animate-pulse flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-700 rounded-full mb-3"></div>
            <div className="h-5 bg-gray-700 rounded w-1/2 mb-3"></div>
            <div className="flex gap-1 justify-center mb-3">
                <div className="h-6 bg-gray-700 rounded w-16"></div>
                <div className="h-6 bg-gray-700 rounded w-16"></div>
            </div>
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-gray-700 rounded w-full"></div>
        </div>
    );
};

// Dashboard section skeleton loader
export const DashboardSectionLoader = ({ count = 2 }) => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="h-6 bg-gray-800 rounded w-48 animate-pulse"></div>
                <div className="h-4 bg-gray-800 rounded w-16 animate-pulse"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array(count).fill(0).map((_, index) => (
                    <ProjectCardSkeleton key={index} />
                ))}
            </div>
        </div>
    );
};

// Content loader for the entire home page
export const HomePageLoader = () => {
    return (
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar skeleton */}
                <div className="md:w-1/4 lg:w-1/5">
                    <div className="bg-gray-800 rounded-lg p-4 animate-pulse">
                        <div className="space-y-3">
                            {Array(5).fill(0).map((_, index) => (
                                <div key={index} className="h-10 bg-gray-700 rounded"></div>
                            ))}
                            <div className="h-10 bg-gray-700 rounded mt-8"></div>
                        </div>
                    </div>
                </div>

                {/* Main content skeleton */}
                <div className="md:w-3/4 lg:w-4/5 space-y-8">
                    {/* Welcome section */}
                    <div className="h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg animate-pulse"></div>

                    {/* Projects section */}
                    <DashboardSectionLoader count={4} />

                    {/* Developers section */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div className="h-6 bg-gray-800 rounded w-48 animate-pulse"></div>
                            <div className="h-4 bg-gray-800 rounded w-16 animate-pulse"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {Array(3).fill(0).map((_, index) => (
                                <DeveloperCardSkeleton key={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Search loading indicator
export const SearchingIndicator = () => {
    return (
        <div className="flex items-center justify-center h-8">
            <div className="relative w-8 h-8">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-700 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
            </div>
            <span className="ml-3 text-gray-400">Searching...</span>
        </div>
    );
}; 