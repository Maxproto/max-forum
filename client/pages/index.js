import { useState, useEffect } from 'react';
import api from '../services/api';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, hydrated } = useAuth(); // 👈 关键

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get('/posts');
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (!hydrated) return null; // ⛑️ SSR 阶段不渲染，避免 mismatch

  return (
    <div className="container">
      <h1 className="my-4">Web Forum</h1>

      {!isLoggedIn && (
        <p>
          <Link href="/login">Login</Link> or <Link href="/register">Register</Link> to create and comment on posts.
        </p>
      )}

      {isLoggedIn && (
        <Link href="/create-post" className="btn btn-success mb-3">Create New Post</Link>
      )}

      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <ul className="list-group">
          {posts.map((post) => (
            <li key={post._id} className="list-group-item">
              <Link href={`/posts/${post._id}`}>
                {post.title} by {post.author?.username || 'Unknown'}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
