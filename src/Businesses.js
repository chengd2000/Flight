import React from 'react';
import './App.css';

function Businesses({ businessesData }) {
  console.log("in businesses:");
  console.log(businessesData.businesses);
  return (
    <ul>
      {businessesData.businesses ? businessesData.businesses.map((item) => (
        <li key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.location.address1}, {item.location.city}</p>
          <img src={item.image_url} alt={item.name} width="100" />
        </li>
      )) : "there are no available businesses"}
    </ul>
  );
}

export default Businesses;
