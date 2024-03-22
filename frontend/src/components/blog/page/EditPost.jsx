import React, { useState, useContext, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { UserContext } from './userContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const POST_CATEGORIES = [
    "Agriculture", "Business", "Education", "Entertainment", "Art", "Investment",
    "Uncategorized", "Weather"
];
const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];

const EditPost = () => {
    const [post, setPost] = useState({ title: '', category: '', description: '', thumbnail: null });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { currentUser } = useContext(UserContext);
    const token = currentUser?.token;
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    useEffect(() => {
        const getPost = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
                setPost(response.data);
            } catch (error) {
                console.error(error);
                setError('Failed to fetch post. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        getPost();
    }, [id]);

    const editPost = async (e) => {
        e.preventDefault();

        const postData = new FormData();
        postData.append('title', post.title);
        postData.append('category', post.category);
        postData.append('description', post.description);
        if (post.thumbnail) {
            postData.append('thumbnail', post.thumbnail);
        }

        try {
            const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, postData, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                // Handle success, maybe show a success message
                navigate('/');
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    //if (loading) {
        //return <p>Loading...</p>;
    //}

    return (
        <section className="create-post">
            <div className="container">
                <h2>Edit Post</h2>
                {error && <p className="form__error-message">{error}</p>}
                <form className="form create-post__form" onSubmit={editPost}>
                    <input
                        type="text"
                        placeholder='Title'
                        value={post.title}
                        onChange={(e) => setPost(prevState => ({ ...prevState, title: e.target.value }))}
                    />
                    <select
                        name="category"
                        value={post.category}
                        onChange={(e) => setPost(prevState => ({ ...prevState, category: e.target.value }))}
                    >
                        <option value="">Select Category</option>
                        {POST_CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <ReactQuill
                        modules={modules}
                        formats={formats}
                        value={post.description}
                        onChange={(value) => setPost(prevState => ({ ...prevState, description: value }))}
                    />
                    <input
                        type="file"
                        onChange={(e) => setPost(prevState => ({ ...prevState, thumbnail: e.target.files[0] }))}
                    />
                    <button type="submit" className='btn primary'>Update</button>
                </form>
            </div>
        </section>
    );
};

export default EditPost;
