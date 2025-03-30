// client/pages/create-post.js
import { useState, useEffect } from 'react';
import api from '../services/api';
import { useRouter } from 'next/router';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setMessage('Post created successfully');
      setTitle('');
      setBody('');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px', marginTop: '50px' }}>
      <h2>Create New Post</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Body</label>
          <textarea
            className="form-control"
            rows="4"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-success">Create</button>
      </form>
    </div>
  );
}
