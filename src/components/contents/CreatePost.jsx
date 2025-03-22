import React, { useState, useRef } from "react";
import { FaImage, FaTimes } from "react-icons/fa";
import { uploadToCloudinary } from "../../config/cloudinary"; // Cloudinary Function
import { setDoc, doc } from "firebase/firestore"; // Firestore
import { firebaseAuth, firestore } from "../../config/firebase"; // Firestore
import { useSelector } from "react-redux";
function CreatePost() {
    const [title, setTitle] = useState("");
    const user = useSelector(state => state.auth.user);
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("Tech");
    const [tags, setTags] = useState([]);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [visibility, setVisibility] = useState("public");
    const fileInputRef = useRef(null);

    // 🟢 Image Select Handler
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    // 🟢 Remove Image
    const handleRemoveImage = () => {
        setImage(null);
        setPreview("");
        setImageUrl("");
    };

    // 🟢 Upload Image to Cloudinary
    const handleUploadImage = async () => {
        if (!image) return;
        setLoading(true);
        try {
            const uploadedUrl = await uploadToCloudinary(image);
            if (uploadedUrl) {
                setImageUrl(uploadedUrl);
            } else {
                alert("Image upload failed!");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Image upload failed!");
        } finally {
            setLoading(false);
        }
    };

    // 🟢 Submit Post (Firestore)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // 🔹 Image upload before submitting post
        if (!imageUrl && image) {
            await handleUploadImage();
        }

        try {
            await setDoc(doc(firestore, 'posts', `${Date.now()}`), {
                title,
                content,
                category,
                tags,
                imageUrl,
                createdAt: new Date(),
                author: user.uid,
                authorName: user.displayName,
                authorEmail: user.email,
                authorPhoto: user.photoURL,
            });

            alert("Post created successfully!");
            setTitle("");
            setContent("");
            setCategory("Tech");
            setTags([]);
            setImage(null);
            setPreview("");
            setImageUrl("");
        } catch (error) {
            console.error("Error adding post:", error);
            alert("Failed to create post!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-800 text-white rounded-md">
            <h1 className="text-xl font-bold mb-4">Create a New Blog Post</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* 🔹 Image Upload */}
                <div className="flex flex-col gap-2 items-center justify-center w-full relative border border-gray-600 rounded-md p-4 bg-gray-900">
                    {preview ? (
                        <div className="relative w-full h-[300px] rounded-md overflow-hidden">
                            <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-md" />
                            <button
                                onClick={handleRemoveImage}
                                type="button"
                                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full"
                            >
                                <FaTimes className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <label htmlFor="photo" className="font-semibold text-blue-500 cursor-pointer flex items-center gap-2">
                            <FaImage className="w-5 h-5" />
                            Upload Photo
                        </label>
                    )}
                    <input
                        type="file"
                        id="photo"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                        ref={fileInputRef}
                    />
                </div>

                {/* 🔹 Title */}
                <input
                    type="text"
                    value={title}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    className="p-2 bg-gray-900 text-white rounded-md"
                    placeholder="Post Title"
                />

                {/* 🔹 Content */}
                <textarea
                    value={content}
                    required
                    onChange={(e) => setContent(e.target.value)}
                    className="p-2 bg-gray-900 text-white rounded-md"
                    rows="4"
                    placeholder="Write your post..."
                />

                {/* 🔹 Category */}
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-2 bg-gray-900 text-white rounded-md"
                >
                    <option value="Tech">Tech</option>
                    <option value="Education">Education</option>
                    <option value="Entertainment">Entertainment</option>
                </select>

                {/* 🔹 Tags */}
                <input
                    type="text"
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && e.target.value.trim()) {
                            setTags((prevTags) => [...prevTags, e.target.value.trim()]);
                            e.target.value = ""; // Clear input after adding tag
                        }
                    }}
                    className="p-2 bg-gray-900 text-white rounded-md"
                    placeholder="Add tags (press Enter)"
                />
                {/* visibility */}
                <select
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value)}
                    className="p-2 bg-gray-900 text-white rounded-md"
                >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                </select>

                {/* 🔹 Submit Button */}
                <button type="submit" className="bg-blue-600 text-white py-2 rounded-md">
                    {loading ? "Posting..." : "Create Post"}
                </button>
            </form>
        </div>
    );
}

export default CreatePost;
