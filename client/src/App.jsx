import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [messages, setMessages]   = useState([]);
  const [input, setInput]         = useState('');
  const [loading, setLoading]     = useState(false);
  const [serverStatus, setStatus] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    axios.get('/api/health')
      .then(res => setStatus(res.data))
      .catch(() => setStatus({ status: 'ERROR' }));

    axios.get('/api/messages')
      .then(res => setMessages(res.data.data.reverse()))
      .catch(console.error);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const userMsg = { sender: 'user', content: input };

    try {
      await axios.post('/api/messages', userMsg);

      const botResponse = `Echo: "${input}" — ¡Stack MERN funcionando! 🚀`;
      await axios.post('/api/messages', { sender: 'bot', content: botResponse });

      setMessages(prev => [
        ...prev,
        { ...userMsg,   timestamp: new Date() },
        { sender: 'bot', content: botResponse, timestamp: new Date() },
      ]);
      setInput('');
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🤖 Chatbot MERN</h1>
        {serverStatus && (
          <span className={`status ${serverStatus.status === 'OK' ? 'ok' : 'error'}`}>
            ● {serverStatus.status === 'OK'
              ? `Servidor OK · DB: ${serverStatus.database}`
              : 'Servidor desconectado'}
          </span>
        )}
      </header>

      <div className="chat-window">
        {messages.length === 0 && (
          <p className="empty">Envía un mensaje para comenzar 💬</p>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>
            <span className="bubble">{msg.content}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="input-area">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe un mensaje..."
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading || !input.trim()}>
          {loading ? '...' : 'Enviar'}
        </button>
      </div>
    </div>
  );
}

export default App;
