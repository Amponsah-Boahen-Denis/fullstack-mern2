import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './password.css';

function ViewRecords() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  axios.defaults.withCredentials=true;

  useEffect(() => {
    axios.get('https://fullstack-mern-api.vercel.app/account')
      .then(response => {
        setAccounts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handlePlatformChange = (event) => {
    const account = accounts.find(account => account.Description === event.target.value);
    setSelectedAccount(account);
  };

  return (
    <div>
      <div className="div2">
        <h1 className="h1">PASSWORD MANAGEMENT APP</h1>
        <div className="div">
          <div>
            <button className="button">Password Manager</button>
            <button className="button1">
              <Link to={'/edit'} className='link'>Edit Password</Link>
            </button>
          </div>
          <div>
            <button className="button2">Description</button>
            <select className='select' onChange={handlePlatformChange}>
              <option value="">Select a platform</option>
              {Array.isArray(accounts) && accounts.length > 0 && (
                accounts.map(account => (
                  <option key={account._id} value={account.Description}>{account.Description}</option>
                ))
              )}
            </select>
            <img className='img' src={require("./image.png")} alt="Password Manager" />
          </div>
          <div className="flex1">
            <div className="flex2">
              <div className="flex1">
                <button className="button2">Username</button>
                <b className="b">{selectedAccount ? selectedAccount.Username : ''}</b>
              </div>
              <div className="flex1">
                <button className="button2">Password</button>
                <b className="b">{selectedAccount ? selectedAccount.Password : ''}</b>
              </div>
            </div>
            <div className="flex2">
              <div className="flex1">
                <button className="button2">Url</button>
                <b className="b">{selectedAccount ? selectedAccount.URL : ''}</b>
              </div>
              <div className="flex1">
                <button className="button2">Notes</button>
                <b className="b">{selectedAccount ? selectedAccount.Notes : ''}</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewRecords;
