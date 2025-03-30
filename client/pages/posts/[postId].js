// client/pages/posts/[postId].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../../services/api';

export default function PostDetails() {
  const router = useRouter();
  const { postId } = router.query;
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  
  useEffect(() => {
    if (!postId) return;
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPost();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await api.post(
        `/posts/${postId}/comments`,
        { text: comment },
        {
          headers: { Authorization: token }
        }
      );
      setPost(res.data);
      setComment('');
    } catch (error) {
      console.error(error);
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="container my-4">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>
        <strong>Author:</strong> {post.author?.username}
      </p>
      <hr />
      <h4>Comments</h4>
      {post.comments?.map((c) => (
        <div key={c._id} className="mb-2">
          <strong>{c.author?.username}:</strong> {c.text}
        </div>
      ))}
      <form onSubmit={handleCommentSubmit} className="mt-3">
        <div className="mb-3">
          <label htmlFor="comment" className="form-label">Add a Comment</label>
          <textarea
            id="comment"
            className="form-control"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary">Submit Comment</button>
      </form>
    </div>
  );
}
