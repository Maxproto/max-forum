import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isLoggedIn, logout, hydrated } = useAuth();

  if (!hydrated) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container">
        <Link href="/" className="navbar-brand">WebForum</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link href="/create-post" className="nav-link">Create Post</Link>
                </li>
                <li className="nav-item">
                  <Link href="/chat" className="nav-link">Chat</Link>
                </li>
                <li className="nav-item">
                  <button onClick={logout} className="btn btn-outline-danger ms-2">Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link href="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                  <Link href="/register" className="nav-link">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
