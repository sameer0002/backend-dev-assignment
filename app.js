const express = require('express');
const multer = require('multer');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json());

// GET /api/v3/app/events?id=:event_id
app.get('/api/v3/app/events', (req, res) => {
  const eventId = req.query.id;
  // Fetch event by ID and return the result
  res.json({ message: `Fetching event with ID ${eventId}` });
});

// GET /api/v3/app/events?type=latest&limit=5&page=1
app.get('/api/v3/app/events', (req, res) => {
  const { type, limit, page } = req.query;
  // Fetch latest events based on type, limit, and page parameters and return the result
  res.json({ message: `Fetching latest events. Type: ${type}, Limit: ${limit}, Page: ${page}` });
});

// POST /api/v3/app/events
app.post('/api/v3/app/events', upload.single('files[image]'), (req, res) => {
  const eventData = req.body;
  // Save the event data, including the uploaded image file, to the database
  res.json({ message: 'Event created successfully', eventData });
});

// PUT /api/v3/app/events/:id
app.put('/api/v3/app/events/:id', upload.single('files[image]'), (req, res) => {
  const eventId = req.params.id;
  const eventData = req.body;
  // Update the event with the given ID using the provided payload
  res.json({ message: `Event ${eventId} updated successfully`, eventData });
});

// DELETE /api/v3/app/events/:id
app.delete('/api/v3/app/events/:id', (req, res) => {
  const eventId = req.params.id;
  // Delete the event with the given ID from the database
  res.json({ message: `Event ${eventId} deleted successfully` });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
