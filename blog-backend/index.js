const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = 'your_secret_key';
const blogs = [
  { id: 1, title: 'First Blog', content: 'Hello World', countryCode: 'us' },
  { id: 2, title: 'Second Blog', content: 'Another Post', countryCode: 'gb' },
];

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Authentication middleware
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err) => {
      if (err) return res.sendStatus(403);
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Protected routes
app.get('/api/blogs', authenticateJWT, (req, res) => {
  res.json(blogs);
});

app.get('/api/blogs/:id', authenticateJWT, (req, res) => {
  const blog = blogs.find(b => b.id === parseInt(req.params.id));
  blog ? res.json(blog) : res.status(404).json({ error: 'Blog not found' });
});

app.listen(5000, () => console.log('Server running on port 5000'));