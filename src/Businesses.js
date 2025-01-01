import React from 'react';
import './App.css';

function Businesses({ businessesData }) {
  if (!businessesData || !businessesData.businesses) {
    return <p>No available businesses.</p>;
  }

  return (
    <ul className="horizontal-scroll">
      {businessesData.businesses.map((item) => (
        <li className="card" key={item.id}>
          <h3 className="card-title">{item.name}</h3>
          <p className="card-text">{item.location.address1}, {item.location.city}</p>
          <img className="card-img" src={item.image_url} alt={item.name} width="100" />
        </li>
      ))}
    </ul>
  );
}

export default Businesses;
