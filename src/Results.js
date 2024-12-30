import React, { useState, Suspense } from 'react';
import './App.css';
const Businesses = React.lazy(() => import('./Businesses'));
const APIKEY='yuwauDoGX6-Eg6fYkyfYklRFjIlIBn78YW-GWTowoWoRL1CKWnQXPgeUH0ZbodDqtC3YEZeZ0SV3iCR1YNVqHC9WoM_JJKUx5wH-N04ruj0q-Qbra9apXeAW7frgX3Yx';
function Results({ flightData }) {
      const [showComponent, setShowComponent] = useState(false);
      const [response, setResponse] = useState(null);
      const handleClick = () => {
        setShowComponent(true);
      };
      const seeBusinesses =  () => {
        
        setShowComponent(true);
      }
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${APIKEY}`
        }
      };
      
       fetch(`https://api.yelp.com/v3/businesses/search?location=${flightData?.response?.flightroute?.destination?.municipality}&sort_by=distance&limit=20`, options)
      .then(res => res.json())
        .then(data => {
          //fetchedBusinesses=data;
          console.log("in results:");
            console.log(data);
            setResponse(data);

        })
        .catch(err => console.error('Error:', err));
        
  return (
    <div>
      <h2>
        Airline: {flightData?.response?.flightroute?.airline?.name}
      </h2>
      <h2>
        From: 
        {flightData?.response?.flightroute?.origin?.iata_code}, 
        {flightData?.response?.flightroute?.origin?.municipality}, 
        {flightData?.response?.flightroute?.origin?.country_name}
      </h2>

      <h2>
        To: {flightData?.response?.flightroute?.destination?.name}, 
        ({flightData?.response?.flightroute?.destination?.iata_code}), 
        {flightData?.response?.flightroute?.destination?.municipality}, 
        {flightData?.response?.flightroute?.destination?.country_name}
      </h2>
      <button onClick={seeBusinesses} class="btn btn-info">click to view the businesses near {flightData?.response?.flightroute?.destination?.name}</button>
      <div id="businesses">
                {showComponent && (
                  <Suspense fallback={<div>Loading...</div>}>
                    <Businesses businessesData={response} />
                  </Suspense>
                )}
              </div>
    </div>
  );
}

export default Results;
