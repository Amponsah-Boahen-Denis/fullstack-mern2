// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();
// app.use(cors({
//   origin: ["https://fullstack-mern-front.vercel.app"],
//     methods: ["GET", "POST", "PUT"],
//   credentials: true
// }));
// app.use(bodyParser.json());

// mongoose.connect('mongodb+srv://Denis:decimal@cluster0.yzgehjl.mongodb.net/password?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// const accountSchema = new mongoose.Schema({
//   Description: String,
//   Username: String,
//   Password: String,
//   URL: String,
//   Notes: String,
// });

// const Account = mongoose.model('Account', accountSchema);

// // Root route
// app.get('/', (req, res) => {
//   res.send('Welcome to the backend server');
// });

// app.get('/account', async (req, res) => {
//   try {
//     const accounts = await Account.find();
//     res.json(accounts);
//   } catch (err) {
//     res.status(500).json({ error: 'An error occurred while fetching accounts' });
//   }
// });

// app.put('/account/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const update = req.body;
//     const account = await Account.findByIdAndUpdate(id, update, { new: true });
//     res.json(account);
//   } catch (err) {
//     res.status(500).json({ error: 'An error occurred while updating the account' });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// CORS configuration for specific frontend origin
app.use(cors({
  origin: ["https://fullstack-mern-front.vercel.app"], 
  methods: ["GET", "POST", "PUT"],
  credentials: true
}));

app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://Denis:decimal@cluster0.yzgehjl.mongodb.net/password?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Account schema
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

// GET route to fetch all accounts
app.get('/account', async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching accounts' });
  }
});

// PUT route to update an account by ID
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

// POST route to add a new account (password record)
app.post('/account', async (req, res) => {
  try {
    const { Description, Username, Password, URL, Notes } = req.body;

    // Create a new account instance
    const newAccount = new Account({
      Description,
      Username,
      Password,
      URL,
      Notes,
    });

    // Save the new account to the database
    const savedAccount = await newAccount.save();
    res.status(201).json(savedAccount); // Respond with the created account
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while creating the account' });
  }
});

// Server listening on PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
