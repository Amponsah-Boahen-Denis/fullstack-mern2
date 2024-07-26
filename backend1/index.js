// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors({
  origin:["https://fullstack-mern-front.vercel.app"],
  methods: ["GET", "POST"],
  credentials: true
}
));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://Denis:decimal@cluster0.yzgehjl.mongodb.net/password?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const accountSchema = new mongoose.Schema({
  Description: String,
  Username: String,
  Password: String,
  URL: String,
  Notes: String,
});

const Account = mongoose.model('account', accountSchema);

app.get('/account', async (req, res) => {
  try {
    const accounts = await Account.find();
    res.send(11);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/account/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const account = await Account.findByIdAndUpdate(id, update, { new: true });
    res.json(account);
  } catch (err) {
    res.status(500).send(err);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
