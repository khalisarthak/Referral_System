import React from 'react';

const ReferralHierarchy = ({ hierarchy }) => {
  return (
    <div>
      <h2>Referral Hierarchy</h2>
      {hierarchy.map((level, index) => (
        <div key={index}>
          <h3>Level {index + 1}</h3>
          <ul>
            {level.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ReferralHierarchy;
