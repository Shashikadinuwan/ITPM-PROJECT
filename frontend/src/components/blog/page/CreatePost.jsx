import React, { useState } from 'react';
import ReactQuill from 'react-quill'; // Assuming you have ReactQuill installed and imported
import 'react-quill/dist/quill.snow.css'; // Import Quill styles if needed

// Define POST_CATEGORIES array
const POST_CATEGORIES = [
    "Agriculture", "Business", "Education", "Entertainment", "Art", "Investment",
    "Uncategorized", "Weather"
];

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3,4,5,6, false] }],
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

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    return (
        <section className="create-post">
            <div className="container">
                <h2>Create Post</h2>
                <p className="form__ error-message">This is an error message</p>
                <form className="form create-post__form">
                    <input
                        type="text"
                        placeholder='Title'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        autoFocus
                    />
                    <select
                        name="category"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    >
                        {POST_CATEGORIES.map(cat => (
                            <option key={cat}>{cat}</option>
                        ))}
                    </select>
                    <ReactQuill
                        modules={modules}
                        formats={formats}
                        value={description}
                        onChange={setDescription}
                    />
                    <input
                        type="file"
                        onChange={e => setThumbnail(e.target.files[0])}
                        accept='image/png, image/jpeg' // Corrected MIME types
                    />
                    <button type="submit" className='btn primary'>Create</button>
                </form>
            </div>
        </section>
    );
};

export default CreatePost;
