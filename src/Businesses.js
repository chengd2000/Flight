import React from 'react';
import './App.css';
function Businesses({ businessesData }) {
    console.log("in businesses:");
    console.log(businessesData);
  return (
<ul>
  {businessesData.businesses.map((item) => (
    <li key={item.id}>
      <h3>{item.name}</h3>
      <p>{item.location.address1}, {item.location.city}</p>
      <img src={item.image_url} alt={item.name} width="100" />
    </li>
  ))}
</ul>

  );
};

export default Businesses;

