const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors({
  origin: ["https://fullstack-mern-front.vercel.app"],
    methods: ["GET", "POST", "PUT"],
  credentials: true
}));

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://Denis:decimal@cluster0.yzgehjl.mongodb.net/password?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const accountSchema = new mongoose.Schema({
  Description: String,
  Username: String,
  Password: String,
  URL: String,
  Notes: String,
});

const Account = mongoose.model('Account', accountSchema);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the backend server');
});

app.get('/account', async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching accounts' });
  }
});

app.put('/account/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const account = await Account.findByIdAndUpdate(id, update, { new: true });
    res.json(account);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while updating the account' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
