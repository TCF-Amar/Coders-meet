import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getUserDoc, getUserPosts, getUserBlogs, getUserSnippets, getUserProjects, updateUserProfile, followUser, unfollowUser, checkIfFollowing } from "../services/firebaseServices";
import { FaUserEdit, FaSave, FaGithub, FaLink, FaUserPlus, FaUserMinus } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import PostCard from "../components/cards/PostCard";

// Placeholder components for other tabs
const BlogCard = ({ uid }) => <div className="text-gray-400 text-center py-4">Blogs coming soon</div>;
const SnippetCard = ({ uid }) => <div className="text-gray-400 text-center py-4">Snippets coming soon</div>;
const ProjectCard = ({ uid }) => <div className="text-gray-400 text-center py-4">Projects coming soon</div>;

const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const { id } = useParams();
    const navigate = useNavigate();
    const isOwner = id === user?.uid;

    const [profileUser, setProfileUser] = useState(null);
    const [activeTab, setActiveTab] = useState("posts"); // Default tab
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');
    const [github, setGithub] = useState('');
    const [website, setWebsite] = useState('');
    const [skills, setSkills] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);

    useEffect(() => {
        const fetchProfileUser = async () => {
            setLoading(true);
            setError(null);

            try {
                if (isOwner || !id) {
                    setProfileUser(user);
                    setDisplayName(user.displayName || '');
                    setBio(user.bio || '');
                    setGithub(user.github || '');
                    setWebsite(user.website || '');
                    setSkills(user.skills || []);
                } else {
                    const doc = await getUserDoc(id);
                    if (doc) {
                        setProfileUser(doc);
                        setDisplayName(doc.displayName || '');
                        setBio(doc.bio || '');
                        setGithub(doc.github || '');
                        setWebsite(doc.website || '');
                        setSkills(doc.skills || []);
                    } else {
                        throw new Error("User not found");
                    }
                }
            } catch (err) {
                setError("Failed to fetch user profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfileUser();
    }, [id, user, isOwner]);

    useEffect(() => {
        const checkFollowStatus = async () => {
            if (user && id && !isOwner) {
                const following = await checkIfFollowing(user.uid, id);
                setIsFollowing(following);
            }
        };
        checkFollowStatus();
    }, [user, id, isOwner]);

    const handleSave = async () => {
        try {
            await updateUserProfile(id, { displayName, bio, github, website, skills });

            // Update the profile user data to reflect changes
            setProfileUser(prev => ({
                ...prev,
                displayName,
                bio,
                github,
                website,
                skills
            }));

            setIsEditing(false);
            toast.success('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile');
        }
    };

    const handleFollowToggle = async () => {
        if (!user) {
            toast.error("Please sign in to follow users");
            navigate("/signin");
            return;
        }

        try {
            if (isFollowing) {
                await unfollowUser(user.uid, id);
                setIsFollowing(false);
                setFollowersCount(prev => prev - 1);
                toast.success(`Unfollowed ${profileUser.displayName}`);
            } else {
                await followUser(user.uid, id);
                setIsFollowing(true);
                setFollowersCount(prev => prev + 1);
                toast.success(`Following ${profileUser.displayName}`);
            }
        } catch (error) {
            toast.error("Failed to update follow status");
            console.error(error);
        }
    };

    if (loading) return <p className="text-center text-gray-500">Loading profile...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto bg-gray-900 text-white p-6 rounded-lg mt-16">
            {profileUser && (
                <>
                    {/* Profile Header */}
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <img
                            src={profileUser.photoURL || "https://ui-avatars.com/api/?name=" + encodeURIComponent(profileUser.displayName || "User")}
                            alt="Profile"
                            className="w-24 h-24 rounded-full"
                        />
                        <div className="flex-1">
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    className="bg-gray-700 text-white rounded px-3 py-2 mb-2 w-full"
                                />
                            ) : (
                                <h1 className="text-2xl font-bold">{profileUser.displayName}</h1>
                            )}
                            {isEditing ? (
                                <textarea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder="Tell us about yourself"
                                    className="bg-gray-700 text-white rounded px-3 py-2 mb-2 w-full"
                                    rows={3}
                                />
                            ) : (
                                <p className="text-gray-400">{profileUser.bio || "No bio available"}</p>
                            )}
                            <div className="flex flex-wrap gap-2 mt-2">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={github}
                                        onChange={(e) => setGithub(e.target.value)}
                                        placeholder="GitHub URL"
                                        className="bg-gray-700 text-white rounded px-3 py-2 mb-2 w-full md:w-auto"
                                    />
                                ) : (
                                    profileUser.github && (
                                        <a href={profileUser.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline flex items-center gap-1">
                                            <FaGithub /> GitHub
                                        </a>
                                    )
                                )}
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={website}
                                        onChange={(e) => setWebsite(e.target.value)}
                                        placeholder="Website URL"
                                        className="bg-gray-700 text-white rounded px-3 py-2 mb-2 w-full md:w-auto"
                                    />
                                ) : (
                                    profileUser.website && (
                                        <a href={profileUser.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline flex items-center gap-1">
                                            <FaLink /> Website
                                        </a>
                                    )
                                )}
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={skills.join(', ')}
                                        onChange={(e) => setSkills(e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill))}
                                        placeholder="Skills (comma separated)"
                                        className="bg-gray-700 text-white rounded px-3 py-2 mb-2 w-full"
                                    />
                                ) : (
                                    profileUser.skills?.map((skill, index) => (
                                        <span key={index} className="bg-blue-500 text-sm px-3 py-1 rounded-md">
                                            {skill}
                                        </span>
                                    ))
                                )}
                            </div>
                            <div className="flex items-center gap-4 mt-4">
                                <span className="text-gray-400">{followersCount} Followers</span>
                                <span className="text-gray-400">{followingCount} Following</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            {!isOwner && (
                                <button
                                    onClick={handleFollowToggle}
                                    className={`px-4 py-2 rounded-md flex items-center gap-2 ${isFollowing
                                        ? 'bg-red-600 hover:bg-red-700'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                        }`}
                                >
                                    {isFollowing ? (
                                        <>
                                            <FaUserMinus /> Unfollow
                                        </>
                                    ) : (
                                        <>
                                            <FaUserPlus /> Follow
                                        </>
                                    )}
                                </button>
                            )}
                            {isOwner && (
                                <div className="flex justify-end mt-4 md:mt-0">
                                    {isEditing ? (
                                        <button
                                            onClick={handleSave}
                                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
                                        >
                                            <FaSave /> Save
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 flex items-center gap-2"
                                        >
                                            <FaUserEdit /> Edit
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <hr className="my-6 border-gray-700" />
                    {/* Tabs Navigation */}
                    <div className="flex justify-center gap-6 my-6 flex-wrap">
                        {["posts", "blogs", "snippets", "projects"].map((tab) => (
                            <button
                                key={tab}
                                className={`px-4 py-2 text-sm font-semibold rounded ${activeTab === tab ? "bg-blue-500" : "bg-gray-700 hover:bg-gray-600"}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                    {/* Content Section */}
                    <div>
                        {activeTab === "posts" && <PostCard uid={id} />}
                        {activeTab === "blogs" && <BlogCard uid={id} />}
                        {activeTab === "snippets" && <SnippetCard uid={id} />}
                        {activeTab === "projects" && <ProjectCard uid={id} />}
                    </div>
                </>
            )}
        </div>
    );
};

export default Profile;
