import React, { useEffect, useState } from 'react';
import { fetchEarnings } from '../api';

const EarningsDashboard = ({ userId }) => {
  const [earnings, setEarnings] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    const loadEarnings = async () => {
      try {
        const response = await fetchEarnings(userId);
        setEarnings(response.data.earnings);
        setTotalEarnings(response.data.totalEarnings);
      } catch (err) {
        console.error('Error fetching earnings:', err);
      }
    };
    loadEarnings();
  }, [userId]);

  return (
    <div>
      <h2>Earnings Dashboard</h2>
      <p>Total Earnings: {totalEarnings}</p>
      <ul>
        {earnings.map((earning) => (
          <li key={earning.id}>
            From User {earning.referredUserId}: Rs.{earning.directEarnings + earning.indirectEarnings}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EarningsDashboard;
