import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { io } from 'socket.io-client';

let socket;

export default function ChatPage() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    socket = io('http://localhost:5000');

    // 接收历史消息
    socket.on('chat history', (history) => {
      setMessages(history);
    });

    // 接收新消息
    socket.on('chat message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    const token = localStorage.getItem('token');
    if (message.trim()) {
      socket.emit('chat message', { token, text: message });
      setMessage('');
    }
  };

  return (
    <div className="container" style={{ marginTop: '50px' }}>
      <h2>Real-Time Chat</h2>
      <div className="mb-3 border p-3" style={{ height: '400px', overflowY: 'scroll' }}>
        {messages.map((msg, idx) => (
          <div key={idx}>
            <strong>{msg.username}:</strong> {msg.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
      </div>
      <button className="btn btn-primary" onClick={sendMessage}>Send</button>
    </div>
  );
}
