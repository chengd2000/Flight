import React from 'react';
import './App.css';

function Stations({ stationsData }) {
  console.log("in stations:");
  console.log(stationsData.stations);
  
  return (
    <ul>
      {stationsData.stations ? stationsData.stations.map((item) => (
        <li key={item.place.id}>
          <h3>{item.place.name}</h3>
        </li>
      )) : "there are no available stations"}
    </ul>
  );
};

export default Stations;
