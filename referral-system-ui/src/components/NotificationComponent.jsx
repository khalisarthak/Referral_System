import React, { useEffect, useState } from 'react';
import { getEarningDetails } from '../api';

const NotificationComponent = ({ userId, setEarningsData }) => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:5000?userId=${userId}`);

    socket.onmessage = async (event) => {
      const data = JSON.parse(event.data);

      if (data.userId === userId) {
        const updatedEarningsData = await getEarningDetails(userId);
        setEarningsData(updatedEarningsData.data);

        // Display the notification
        const message = `New earnings of Rs. ${data.earnings.direct} (Direct) and Rs. ${data.earnings.indirect} (Indirect)`;
        setNotification(message);

        // Hide the notification after 5 seconds
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }
    };

    return () => {
      socket.close();
    };
  }, [userId, setEarningsData]);

  return (
    <div>
      {notification && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
          zIndex: '1000',
        }}>
          {notification}
        </div>
      )}
    </div>
  );
};

export default NotificationComponent;
