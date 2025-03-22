import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaGithub, FaStar, FaCodeBranch, FaExclamationCircle, FaLink } from 'react-icons/fa';
import { getUserDoc, updateUserDoc } from '../services/firebaseServices';

function GitHub() {
    const { user, isLoggedIn } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);
    const [repositories, setRepositories] = useState([]);
    const [githubUser, setGithubUser] = useState(null);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('updated');
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                try {
                    const userData = await getUserDoc(user.uid);
                    if (userData?.github) {
                        setUsername(userData.github);
                        fetchGitHubData(userData.github);
                        setConnected(true);
                    } else {
                        setLoading(false);
                    }
                } catch (err) {
                    console.error("Error fetching user data:", err);
                    setError("Failed to load user data");
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user]);

    const fetchGitHubData = async (username) => {
        setLoading(true);
        try {
            // Fetch user data
            const userResponse = await fetch(`https://api.github.com/users/${username}`);
            if (!userResponse.ok) {
                throw new Error('GitHub user not found');
            }
            const userData = await userResponse.json();
            setGithubUser(userData);

            // Fetch repositories
            const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=${sortBy}&per_page=100`);
            if (!reposResponse.ok) {
                throw new Error('Failed to fetch repositories');
            }
            const reposData = await reposResponse.json();
            setRepositories(reposData);
            setError(null);
        } catch (err) {
            console.error("Error fetching GitHub data:", err);
            setError(err.message || "Failed to load GitHub data");
            setRepositories([]);
            setGithubUser(null);
        } finally {
            setLoading(false);
        }
    };

    const handleConnect = async (e) => {
        e.preventDefault();
        if (!username.trim()) {
            setError("Please enter a GitHub username");
            return;
        }

        try {
            // Validate username exists on GitHub
            await fetchGitHubData(username);

            // Store GitHub username in user's Firestore document
            if (user && user.uid) {
                await updateUserDoc(user.uid, { githubUsername: username });
                setConnected(true);
            }
        } catch (err) {
            setError(err.message || "Failed to connect GitHub account");
        }
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
        if (connected && username) {
            fetchGitHubData(username);
        }
    };

    const filteredRepositories = repositories.filter(repo =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );



    return (
        <div className="">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                        <FaGithub className="text-3xl text-gray-700 dark:text-gray-300 mr-4" />
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">GitHub</h1>
                    </div>

                    {!connected ? (
                        <div className="mt-6">
                            <p className="mb-4 text-gray-700 dark:text-gray-300">
                                Connect your GitHub account to showcase your repositories and contributions.
                            </p>

                            {error && (
                                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center">
                                    <FaExclamationCircle className="mr-2" />
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleConnect} className="mt-4">
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="GitHub Username"
                                        className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                                    />
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition"
                                        disabled={loading}
                                    >
                                        {loading ? 'Connecting...' : 'Connect'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : githubUser && (
                        <div className="mt-6 flex flex-col md:flex-row items-start">
                            <div className="w-full md:w-1/4 flex flex-col items-center mb-6 md:mb-0">
                                <img
                                    src={githubUser.avatar_url}
                                    alt={githubUser.login}
                                    className="w-32 h-32 rounded-full"
                                />
                                <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">{githubUser.name || githubUser.login}</h2>
                                <p className="text-gray-600 dark:text-gray-400">@{githubUser.login}</p>

                                <div className="mt-4 w-full">
                                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                        <span className="text-gray-700 dark:text-gray-300">Repositories</span>
                                        <span className="font-bold text-gray-900 dark:text-white">{githubUser.public_repos}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                        <span className="text-gray-700 dark:text-gray-300">Followers</span>
                                        <span className="font-bold text-gray-900 dark:text-white">{githubUser.followers}</span>
                                    </div>
                                    <div className="flex justify-between py-2">
                                        <span className="text-gray-700 dark:text-gray-300">Following</span>
                                        <span className="font-bold text-gray-900 dark:text-white">{githubUser.following}</span>
                                    </div>
                                </div>

                                <a
                                    href={githubUser.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 flex items-center text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                                >
                                    <FaLink className="mr-1" /> View Profile
                                </a>
                            </div>

                            <div className="w-full md:w-3/4 md:pl-6">
                                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-6">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                        <div className="mb-4 md:mb-0">
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Repositories</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Showing {filteredRepositories.length} of {repositories.length} repositories
                                            </p>
                                        </div>
                                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                                            <input
                                                type="text"
                                                placeholder="Search repositories..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white text-sm"
                                            />
                                            <select
                                                value={sortBy}
                                                onChange={handleSortChange}
                                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white text-sm"
                                            >
                                                <option value="updated">Last Updated</option>
                                                <option value="created">Created</option>
                                                <option value="pushed">Last Pushed</option>
                                                <option value="full_name">Name</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {loading ? (
                                    <div className="flex justify-center items-center h-40">
                                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
                                    </div>
                                ) : error ? (
                                    <div className="p-4 bg-red-100 text-red-700 rounded-lg flex items-center">
                                        <FaExclamationCircle className="mr-2" />
                                        {error}
                                    </div>
                                ) : filteredRepositories.length === 0 ? (
                                    <div className="text-center py-10">
                                        <p className="text-gray-600 dark:text-gray-400">No repositories found.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-4">
                                        {filteredRepositories.map(repo => (
                                            <div key={repo.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition">
                                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                                                        {repo.name}
                                                    </a>
                                                </h3>

                                                {repo.description && (
                                                    <p className="mt-1 text-gray-600 dark:text-gray-400">{repo.description}</p>
                                                )}

                                                <div className="mt-3 flex flex-wrap items-center text-sm">
                                                    {repo.language && (
                                                        <span className="mr-4 flex items-center text-gray-600 dark:text-gray-400">
                                                            <span className="w-3 h-3 rounded-full bg-indigo-500 mr-1"></span>
                                                            {repo.language}
                                                        </span>
                                                    )}

                                                    <span className="mr-4 flex items-center text-gray-600 dark:text-gray-400">
                                                        <FaStar className="mr-1" />
                                                        {repo.stargazers_count}
                                                    </span>

                                                    <span className="mr-4 flex items-center text-gray-600 dark:text-gray-400">
                                                        <FaCodeBranch className="mr-1" />
                                                        {repo.forks_count}
                                                    </span>

                                                    <span className="text-gray-600 dark:text-gray-400">
                                                        Updated {new Date(repo.updated_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GitHub; 