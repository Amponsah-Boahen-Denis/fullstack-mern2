import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './css/edit.css';

function EditRecord() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState(id);
  const [formData, setFormData] = useState({
    Username: '',
    Password: '',
    Notes: '',
    URL: ''
  });
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('https://fullstack-mern-api.vercel.app/account')
      .then(response => {
        setAccounts(response.data);
        const account = response.data.find(acc => acc._id === selectedAccountId);
        if (account) {
          setFormData({
            Username: account.Username,
            Password: account.Password,
            Notes: account.Notes,
            URL: account.URL
          });
        }
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, [selectedAccountId]);

  const handleAccountChange = (event) => {
    setSelectedAccountId(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`https://fullstack-mern-api.vercel.app/account/${selectedAccountId}`, formData)
      .then(response => {
        navigate('/'); // Navigate back to the home page
      })
      .catch(error => {
        console.error('There was an error updating the data!', error);
      });
  };

  return (
    <div className='container'>
      <h1 className='h2'>Edit Social Media Account</h1>
      <div>
        <select className='sel' value={selectedAccountId} onChange={handleAccountChange}>
          <option value="">Select an account</option>
          {accounts.map(account => (
            <option key={account._id} value={account._id}>{account.Description}</option>
          ))}
        </select>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='label'>Username:</label>
          <input className='input'
            type="text"
            name="Username"
            value={formData.Username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className='label'>Password:</label>
          <input className='input'
            type="text"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className='label'>Notes:</label>
          <input className='input'
            type="text"
            name="Notes"
            value={formData.N
otes}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className='label'>URL:</label>
          <input className='input'
            type="text"
            name="URL"
            value={formData.URL}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className='butt'> Update & Exit</button>
      </form>
    </div>
  );
}

export default EditRecord;
