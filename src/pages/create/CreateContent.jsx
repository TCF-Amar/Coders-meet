import React, { useState, useEffect } from "react";
import { FaImage, FaBlog, FaCode, FaLayerGroup } from "react-icons/fa";
import { useParams } from "react-router-dom";
import CreateSnippet from "../../components/contents/CreateSnippet";
import CreatePost from "../../components/contents/CreatePost";
import CreateBlog from "../../components/contents/CreateBlog";
import CreateProject from "../../components/contents/CreateProject";

export default function CreateContent() {
    const { section } = useParams();
    const [activeTab, setActiveTab] = useState(section || "post");

    // URL change hone par activeTab update ho
    useEffect(() => {
        setActiveTab(section || "post");
    }, [section]);

    return (
        <div className="w-full pt-14 bg-gray-900 flex justify-center items-center ">
            <div className="bg-gray-800 p-4 sm:p-6 rounded-md shadow-lg w-full max-w-3xl">
                <h1 className="text-white text-2xl font-bold mb-4 text-center">Create Content</h1>

                {/* 🔹 Tab Buttons */}
                <div className="flex flex-wrap gap-4 mb-6 justify-center">
                    <button
                        onClick={() => setActiveTab("post")}
                        className={`px-4 py-2 rounded-md flex items-center gap-2 transition ${activeTab === "post" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}`}
                    >
                        <FaImage className="w-5 h-5" />
                        Post
                    </button>

                    <button
                        onClick={() => setActiveTab("blog")}
                        className={`px-4 py-2 rounded-md flex items-center gap-2 transition ${activeTab === "blog" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}`}
                    >
                        <FaBlog className="w-5 h-5" />
                        Blog
                    </button>

                    <button
                        onClick={() => setActiveTab("snippet")}
                        className={`px-4 py-2 rounded-md flex items-center gap-2 transition ${activeTab === "snippet" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}`}
                    >
                        <FaCode className="w-5 h-5" />
                        Snippet
                    </button>

                    <button
                        onClick={() => setActiveTab("project")}
                        className={`px-4 py-2 rounded-md flex items-center gap-2 transition ${activeTab === "project" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}`}
                    >
                        <FaLayerGroup className="w-5 h-5" />
                        Project
                    </button>
                </div>

                {/* 🔹 Conditional Rendering of Sections */}
                <div className="bg-gray-700  rounded-md text-white">
                    {activeTab === "post" && <CreatePost />}
                    {activeTab === "blog" && <CreateBlog />}
                    {activeTab === "snippet" && <CreateSnippet />}
                    {activeTab === "project" && <CreateProject />}
                </div>
            </div>
        </div>
    );
}
