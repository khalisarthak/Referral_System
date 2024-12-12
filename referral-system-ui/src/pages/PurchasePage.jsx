import React, { useState, useEffect } from 'react';
import { makePurchase, getPurchaseDetails, getEarningDetails } from '../api';
import NotificationComponent from '../components/NotificationComponent';

const PurchasePage = ({ userId,userData }) => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [purchaseData, setPurchaseData] = useState([]);
  const [earningsData, setEarningsData] = useState([]);

  useEffect(() => {
    const fetchPurchaseDetails = async () => {
      try {
        const response = await getPurchaseDetails(userId);
        setPurchaseData(response.data);
      } catch (err) {
        console.error('Error fetching purchase details:', err);
      }
    };

    const fetchEarningsDetails = async () => {
      try {
        const response = await getEarningDetails(userId);
        setEarningsData(response.data);
      } catch (err) {
        console.error('Error fetching earnings details:', err);
      }
    };

    fetchPurchaseDetails(); 
    fetchEarningsDetails(); 
  }, [userId]); 



   

  const handlePurchase = async (e) => {
    e.preventDefault();
    try {
      const response = await makePurchase({ userId, purchaseAmount: parseFloat(amount) });
      setMessage(response.data.message);
      const updatedPurchaseData = await getPurchaseDetails(userId);
      setPurchaseData(updatedPurchaseData.data);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error making purchase');
    }
  };

  return (
    <div>
        <h2 style={{textAlign:"center",color:"aqua"}}>Welcome {userData.name} </h2>
      <h2>Make a Purchase</h2>
      <form onSubmit={handlePurchase}>
        <input
          type="number"
          placeholder="Purchase Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Purchase</button>
      </form>
      {message && <p>{message}</p>}

      <h3>Purchase Data</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Purchase Amount</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {purchaseData.length > 0 ? (
            purchaseData.map((purchase) => (
              <tr key={purchase.id}>
                <td>{purchase.purchaseAmount}</td>
                <td>{new Date(purchase.createdAt).toLocaleString()}</td>
                <td>{new Date(purchase.updatedAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No purchases found</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Earnings Data</h3>
      <ul>
        {earningsData.length > 0 ? (
          earningsData.map((earning, index) => (
            <li key={index}>
              Direct Earnings: {earning.directEarnings} | Indirect Earnings: {earning.indirectEarnings}
            </li>
          ))
        ) : (
          <p>No earnings found</p>
        )}
      </ul>

      <NotificationComponent userId={userId} setEarningsData = {setEarningsData} />
    </div>
  );
};

export default PurchasePage;
