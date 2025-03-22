import React, { useState } from "react";
import { uploadToCloudinary } from "../../config/cloudinary"; // Cloudinary function
import { FaImage, FaTimes } from "react-icons/fa";
import { toast } from "react-hot-toast";
function CreateBlog() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    // Image Select Handler
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    // Remove Image
    const handleRemoveImage = () => {
        setImage(null);
        setPreview("");
        setImageUrl("");
    };

    // Auto-generate slug
    const generateSlug = (title) => {
        return title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    };

    // Calculate Reading Time
    const calculateReadingTime = (text) => {
        const wordsPerMinute = 200;
        const words = text.trim().split(/\s+/).length;
        return Math.ceil(words / wordsPerMinute) + " min read";
    };

    // Submit Handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content || !category) {
            toast.error("Please fill all required fields!");
            return;
        }

        setUploading(true);

        let uploadedUrl = imageUrl;
        if (image) {
            uploadedUrl = await uploadToCloudinary(image);
            setImageUrl(uploadedUrl);
        }

        const blogPost = {
            title,
            slug: generateSlug(title),
            content,
            category,
            tags: tags.split(",").map(tag => tag.trim()),
            excerpt,
            readingTime: calculateReadingTime(content),
            imageUrl: uploadedUrl,
            publishedAt: new Date().toISOString()
        };

        console.log("Blog Post Data:", blogPost);
        toast.success("Blog post created successfully!");
        setUploading(false);
    };

    return (
        <div className=" bg-gray-800 text-white rounded-md">
            <h1 className="text-2xl font-bold mb-4">Create a New Blog</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Image Upload */}
                <div className="relative border border-gray-600 rounded-md p-4 flex justify-center items-center bg-gray-900">
                    {preview ? (
                        <div className="relative w-full h-[300px] rounded-md overflow-hidden">
                            <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-md" />
                            <button onClick={handleRemoveImage} type="button" className="absolute top-2 right-2 bg-red-600 p-2 rounded-full">
                                <FaTimes className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <label htmlFor="photo" className="cursor-pointer flex items-center gap-2 text-blue-500">
                            <FaImage className="w-5 h-5" /> Upload Photo
                        </label>
                    )}
                    <input type="file" id="photo" className="hidden" accept="image/*" onChange={handleImageChange} />
                </div>

                {/* Title */}
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="p-2 bg-gray-900 text-white  rounded-md" placeholder="Blog Title" />

                {/* Content */}
                <textarea value={content} onChange={(e) => setContent(e.target.value)} className="p-2 bg-gray-900 text-white  rounded-md" rows="6" placeholder="Write your blog..." />

                {/* Category */}
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="p-2 bg-gray-900 text-white  rounded-md" placeholder="Category (e.g., Tech, Travel)" />

                {/* Tags */}
                <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} className="p-2 bg-gray-900 text-white  rounded-md" placeholder="Tags (comma separated)" />

                {/* Excerpt */}
                <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="p-2 bg-gray-900 text-white  rounded-md" rows="2" placeholder="Short description of your blog..." />

                {/* Submit Button */}
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 p-2 rounded-md font-semibold">
                    {uploading ? "Uploading..." : "Publish Blog"}
                </button>
            </form>
        </div>
    );
}

export default CreateBlog;
