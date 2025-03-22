import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { uploadToCloudinary } from "../../config/cloudinary";
import { firestore, } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";

function CreateProject() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [technologies, setTechnologies] = useState("");
    const [githubLink, setGithubLink] = useState("");
    const [liveDemo, setLiveDemo] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);

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
        const uploadedUrl = await uploadToCloudinary(image);
        setLoading(false);
        if (uploadedUrl) {
            setImageUrl(uploadedUrl);
        } else {
            alert("Image upload failed!");
        }
    };

    // 🟢 Submit Project to Firestore
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description || !technologies) {
            alert("Title, description, and technologies are required!");
            return;
        }

        setLoading(true);

        // 🔹 Upload Image before submitting
        if (!imageUrl && image) {
            await handleUploadImage();
        }

        try {
            await addDoc(collection(firestore, "projects"), {
                title,
                description,
                technologies: technologies.split(",").map((tech) => tech.trim()),
                githubLink,
                liveDemo,
                imageUrl,
                createdAt: new Date(),
                author: firebaseAuth.currentUser.uid,
                authorName: firebaseAuth.currentUser.displayName,
                authorEmail: firebaseAuth.currentUser.email,
                authorPhoto: firebaseAuth.currentUser.photoURL,

            });

            alert("Project created successfully!");
            setTitle("");
            setDescription("");
            setTechnologies("");
            setGithubLink("");
            setLiveDemo("");
            setImage(null);
            setPreview("");
            setImageUrl("");
        } catch (error) {
            console.error("Error adding project:", error);
            alert("Failed to create project!");
        }

        setLoading(false);
    };

    return (
        <div className=" bg-gray-800 text-white rounded-md">
            <h1 className="text-xl font-bold mb-4">Create a New Project</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* 🔹 Image Upload */}
                <div className="flex flex-col gap-2 items-center w-full">
                    {preview ? (
                        <div className="relative w-full h-40 rounded-md overflow-hidden">
                            <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-md" />
                            <button onClick={handleRemoveImage} className="absolute top-2 right-2 bg-red-600 p-2 rounded-full">
                                <FaTimes />
                            </button>
                        </div>
                    ) : (
                        <label className="cursor-pointer">
                            Upload Project Thumbnail
                            <input type="file" className="hidden" onChange={handleImageChange} />
                        </label>
                    )}
                </div>

                {/* 🔹 Title */}
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="p-2 bg-gray-900 text-white rounded-md"
                    placeholder="Project Title"
                />

                {/* 🔹 Description */}
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="p-2 bg-gray-900 text-white rounded-md"
                    rows="4"
                    placeholder="Project Description"
                />

                {/* 🔹 Technologies Used */}
                <input
                    type="text"
                    value={technologies}
                    onChange={(e) => setTechnologies(e.target.value)}
                    className="p-2 bg-gray-900 text-white rounded-md"
                    placeholder="Technologies (comma-separated)"
                />

                {/* 🔹 GitHub Link */}
                <input
                    type="url"
                    value={githubLink}
                    onChange={(e) => setGithubLink(e.target.value)}
                    className="p-2 bg-gray-900 text-white rounded-md"
                    placeholder="GitHub Link (optional)"
                />

                {/* 🔹 Live Demo Link */}
                <input
                    type="url"
                    value={liveDemo}
                    onChange={(e) => setLiveDemo(e.target.value)}
                    className="p-2 bg-gray-900 text-white rounded-md"
                    placeholder="Live Demo Link (optional)"
                />

                {/* 🔹 Submit Button */}
                <button type="submit" className="bg-blue-600 text-white py-2 rounded-md">
                    {loading ? "Creating..." : "Create Project"}
                </button>
            </form>
        </div>
    );
}

export default CreateProject;
