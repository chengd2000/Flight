import React from 'react';
import './App.css';

function Hotels({ hotelsData }) {
  console.log("in hotels:");
  console.log(hotelsData.data);
  
  return (
    <ul>
      {hotelsData.data ? hotelsData.data.map((item) => (
        <li key={item.hotelId}>
          <h3 id="hotelName">{item.name}</h3>
        </li>
      )) : "there are no available hotels"}
    </ul>
  );
};

export default Hotels;
