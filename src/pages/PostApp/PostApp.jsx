import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostApp = () => {
    const [posts, setPosts] = useState([]);
    const [formData, setFormData] = useState({ title: '', body: '' });
    const [responseMessage, setResponseMessage] = useState('');

    // Fetch posts from JSONPlaceholder API
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((response) => {
            setPosts(response.data);
        })
        .catch((error) => {
            console.error('There was an error fetching the posts:', error);
        });
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    // Handle form submission (POST request)
    const handleSubmit = (e) => {
        e.preventDefault();

        // POST request to add a new post
        axios.post('https://jsonplaceholder.typicode.com/posts', formData)
        .then((response) => {
            setResponseMessage('Post added successfully!');
            setPosts((prevPosts) => [response.data, ...prevPosts]);
            setFormData({ title: '', body: '' }); // Clear the form
        })
        .catch((error) => {
            setResponseMessage('Error adding post.');
            console.error('There was an error adding the post:', error);
        });
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">JSONPlaceholder Posts</h1>

        <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add a New Post</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700">Title</label>
                <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="body" className="block text-sm font-semibold text-gray-700">Body</label>
                <textarea
                id="body"
                name="body"
                value={formData.body}
                onChange={handleInputChange}
                className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                required
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
            >
                Submit Post
            </button>
            </form>

            {responseMessage && (
            <div className="mt-4 text-sm text-center text-purple-500">{responseMessage}</div>
            )}
        </div>

        <div className="w-full max-w-4xl overflow-x-auto">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Posts</h2>
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
                <tr className="border-b bg-gray-100">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Body</th>
                </tr>
            </thead>
            <tbody>
                {posts.length === 0 ? (
                <tr>
                    <td colSpan="2" className="px-6 py-3 text-center text-sm text-gray-500">No posts available</td>
                </tr>
                ) : (
                posts.map((post, index) => (
                    <tr key={index} className="border-b">
                    <td className="px-6 py-3 text-sm text-gray-700">{post.title}</td>
                    <td className="px-6 py-3 text-sm text-gray-700">{post.body}</td>
                    </tr>
                ))
                )}
            </tbody>
            </table>
        </div>
        </div>
    );
};

export default PostApp;