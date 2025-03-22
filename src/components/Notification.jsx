import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCircle, FaCode, FaComment, FaStar, FaUserPlus, FaProjectDiagram, FaBell, FaCheck, FaTimes } from 'react-icons/fa';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        // This would be replaced with actual API calls
        setTimeout(() => {
            // Mock data
            const mockNotifications = [
                {
                    id: '1',
                    type: 'follow',
                    read: false,
                    user: {
                        id: '101',
                        name: 'Sarah Johnson',
                        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
                    },
                    content: 'started following you',
                    time: '10 minutes ago'
                },
                {
                    id: '2',
                    type: 'like',
                    read: false,
                    user: {
                        id: '102',
                        name: 'Michael Chen',
                        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
                    },
                    content: 'liked your project',
                    project: {
                        id: '201',
                        name: 'React Chat App'
                    },
                    time: '1 hour ago'
                },
                {
                    id: '3',
                    type: 'comment',
                    read: true,
                    user: {
                        id: '103',
                        name: 'Emma Wilson',
                        avatar: 'https://randomuser.me/api/portraits/women/22.jpg'
                    },
                    content: 'commented on your post',
                    post: {
                        id: '301',
                        title: 'How to optimize React performance'
                    },
                    comment: 'Great tips! I\'ll definitely try these techniques.',
                    time: '3 hours ago'
                },
                {
                    id: '4',
                    type: 'project',
                    read: true,
                    user: {
                        id: '104',
                        name: 'David Kim',
                        avatar: 'https://randomuser.me/api/portraits/men/56.jpg'
                    },
                    content: 'invited you to collaborate on',
                    project: {
                        id: '202',
                        name: 'GraphQL API Boilerplate'
                    },
                    time: '1 day ago'
                },
                {
                    id: '5',
                    type: 'star',
                    read: false,
                    user: {
                        id: '105',
                        name: 'Olivia Garcia',
                        avatar: 'https://randomuser.me/api/portraits/women/66.jpg'
                    },
                    content: 'starred your repository',
                    repo: {
                        id: '401',
                        name: 'Vue.js Components'
                    },
                    time: '2 days ago'
                }
            ];

            setNotifications(mockNotifications);
            setLoading(false);
        }, 800);
    }, []);

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'follow':
                return <FaUserPlus className="text-blue-500" />;
            case 'like':
                return <FaStar className="text-yellow-500" />;
            case 'comment':
                return <FaComment className="text-green-500" />;
            case 'project':
                return <FaProjectDiagram className="text-purple-500" />;
            case 'star':
                return <FaStar className="text-orange-500" />;
            default:
                return <FaBell className="text-gray-500" />;
        }
    };

    const markAsRead = (id) => {
        setNotifications(notifications.map(notification =>
            notification.id === id ? { ...notification, read: true } : notification
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    };

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(notification => notification.id !== id));
    };

    const filteredNotifications = notifications.filter(notification => {
        if (activeTab === 'all') return true;
        if (activeTab === 'unread') return !notification.read;
        return notification.type === activeTab;
    });

    const unreadCount = notifications.filter(notification => !notification.read).length;

    return (
        <div className="bg-gray-800 rounded-lg w-full overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-700">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-white">Notifications</h3>
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                        {unreadCount} new
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex overflow-x-auto hide-scrollbar space-x-2 pb-1">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`px-3 py-1 text-xs rounded-full whitespace-nowrap ${activeTab === 'all'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setActiveTab('unread')}
                            className={`px-3 py-1 text-xs rounded-full whitespace-nowrap ${activeTab === 'unread'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                        >
                            Unread
                        </button>
                        <button
                            onClick={() => setActiveTab('follow')}
                            className={`px-3 py-1 text-xs rounded-full whitespace-nowrap ${activeTab === 'follow'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                        >
                            Follows
                        </button>
                        <button
                            onClick={() => setActiveTab('comment')}
                            className={`px-3 py-1 text-xs rounded-full whitespace-nowrap ${activeTab === 'comment'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                        >
                            Comments
                        </button>
                    </div>
                    {unreadCount > 0 && (
                        <button
                            onClick={markAllAsRead}
                            className="text-xs text-blue-400 hover:text-blue-300 whitespace-nowrap ml-2"
                        >
                            Mark all as read
                        </button>
                    )}
                </div>
            </div>

            <div className="max-h-[400px] overflow-y-auto">
                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : filteredNotifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <p className="text-gray-400 text-sm">No notifications to display</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-700">
                        {filteredNotifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`p-4 notification-item hover:bg-gray-700 transition duration-150 ease-in-out ${!notification.read ? 'bg-gray-750' : ''}`}
                            >
                                <div className="flex">
                                    <div className="flex-shrink-0 mr-3 mt-1">
                                        {!notification.read && (
                                            <FaCircle className="text-blue-500 text-xs absolute -ml-1" />
                                        )}
                                        <img
                                            className="h-10 w-10 rounded-full"
                                            src={notification.user.avatar}
                                            alt={notification.user.name}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between">
                                            <div>
                                                <p className="text-sm text-white">
                                                    <Link to={`/profile/${notification.user.id}`} className="font-medium hover:underline">
                                                        {notification.user.name}
                                                    </Link>{' '}
                                                    <span className="text-gray-400">
                                                        {notification.content}
                                                    </span>{' '}
                                                    {notification.project && (
                                                        <Link to={`/projects/${notification.project.id}`} className="font-medium text-blue-400 hover:underline">
                                                            {notification.project.name}
                                                        </Link>
                                                    )}
                                                    {notification.post && (
                                                        <Link to={`/posts/${notification.post.id}`} className="font-medium text-blue-400 hover:underline">
                                                            {notification.post.title}
                                                        </Link>
                                                    )}
                                                    {notification.repo && (
                                                        <Link to={`/repositories/${notification.repo.id}`} className="font-medium text-blue-400 hover:underline">
                                                            {notification.repo.name}
                                                        </Link>
                                                    )}
                                                </p>
                                                {notification.comment && (
                                                    <p className="mt-1 text-sm text-gray-400 bg-gray-750 p-2 rounded-md border-l-2 border-green-500">
                                                        {notification.comment}
                                                    </p>
                                                )}
                                                <p className="mt-1 text-xs text-gray-500">
                                                    {notification.time}
                                                </p>
                                            </div>
                                            <div className="flex space-x-1 ml-2">
                                                {!notification.read && (
                                                    <button
                                                        onClick={() => markAsRead(notification.id)}
                                                        className="text-gray-400 hover:text-gray-300"
                                                        title="Mark as read"
                                                    >
                                                        <FaCheck className="w-4 h-4" />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => deleteNotification(notification.id)}
                                                    className="text-gray-400 hover:text-gray-300"
                                                    title="Remove"
                                                >
                                                    <FaTimes className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="px-4 py-3 bg-gray-750 border-t border-gray-700">
                <Link
                    to="/notifications"
                    className="block w-full text-center text-sm text-blue-400 hover:text-blue-300"
                >
                    View all notifications
                </Link>
            </div>
        </div>
    );
};

export default Notification;
