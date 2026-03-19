// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middlewares ───────────────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Conexión a MongoDB ────────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB conectado correctamente'))
  .catch((err) => console.error('❌ Error de conexión MongoDB:', err));

// ─── Modelo básico de Mensaje ──────────────────────────────────────────────────
const messageSchema = new mongoose.Schema({
  sender:    { type: String, required: true, enum: ['user', 'bot'] },
  content:   { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});
const Message = mongoose.model('Message', messageSchema);

// ─── Rutas API ─────────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: '🚀 Servidor MERN operativo',
    database: mongoose.connection.readyState === 1 ? 'Conectado' : 'Desconectado',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: -1 }).limit(50);
    res.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/messages', async (req, res) => {
  try {
    const { sender, content } = req.body;
    const message = new Message({ sender, content });
    const saved = await message.save();
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// ─── Inicio del servidor ───────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🌐 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📡 API disponible en http://localhost:${PORT}/api/health`);
});