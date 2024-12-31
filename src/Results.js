import React, { useState, useEffect, Suspense } from 'react';
import './App.css';

const Businesses = React.lazy(() => import('./Businesses'));

const Stations = React.lazy(() => import('./Stations'));
const Weather=React.lazy(() => import('./Weather'));
const YELPAPIKEY = 'Ws_ZimUhQfP5i8rA11Izdf5qWxXnmH1yoSyo6TsFtvjvP1CTl3ppU2TLLa7QTyfVCZrhgCktrs99R5POi7llzKQRRm8FsOpOnSgGFwFSRIRr4-LuSxGS0y7FJuVzZ3Yx';
const HEREAPIKEY = 'iK36yK63sjpS1Dcs0qf0bhSOBGiekuIhH81ERyUEvYY';
const WEATHERAPIKEY='d3583aca99d24d799da140647243112';
function Results({ flightData }) {
  const [showComponent, setShowComponent] = useState(false);
  const [response, setResponse] = useState(null);
  const [showComponent2, setShowComponent2] = useState(false);
  const [response2, setResponse2] = useState(null);
  const [showComponent3, setShowComponent3] = useState(false);
  const [response3, setResponse3] = useState(null);
  const [showComponent4, setShowComponent4] = useState(false);
  const [response4, setResponse4] = useState(null);
  const seeBusinesses = () => {
    setShowComponent(true);
  };
  const seeBusinesses3 = () => {
    setShowComponent3(true);
  };
  const seeStations = () => {
    setShowComponent2(true);
  };
  const seeWeather = () => {
    setShowComponent4(true);
  };
  useEffect(() => {
    if (flightData?.response?.flightroute?.destination?.name) {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${YELPAPIKEY}`
        }
      };

      fetch(`https://api.yelp.com/v3/businesses/search?location=${flightData.response.flightroute.destination.name}&sort_by=distance&limit=20`, options)
        .then(res => res.json())
        .then(data => {
            
            setResponse(data);
        })
        .catch(err =>
          console.error('Error:', err));
    }
  }, [flightData]);

  useEffect(() => {
    if (flightData?.response?.flightroute?.origin?.name) {
      const options3 = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${YELPAPIKEY}`
        }
      };

      fetch(`https://api.yelp.com/v3/businesses/search?location=${flightData.response.flightroute.origin.name}&sort_by=distance&limit=20`, options3)
        .then(res => res.json())
        .then(data => {
            
            setResponse3(data);
        })
        .catch(err =>
          console.error('Error:', err));
    }
  }, [flightData]);

  useEffect(() => {
    if (flightData?.response?.flightroute?.destination?.latitude && flightData?.response?.flightroute?.destination?.longitude) {
      const options2 = {
        method: 'GET',
        headers: {
          accept: 'application/json'
        }
      };

      fetch(`https://transit.hereapi.com/v8/stations?in=${flightData.response.flightroute.destination.latitude},${flightData.response.flightroute.destination.longitude};r=1000000&apiKey=${HEREAPIKEY}`, options2)
        .then(response => response.json())
        .then(data => {
          setResponse2(data);
        })
        .catch(err => console.error('Error:', err));
    }
  }, [flightData]);


  useEffect(() => {
    if (flightData?.response?.flightroute?.destination?.latitude && flightData?.response?.flightroute?.destination?.longitude) {
      const options4 = {
        method: 'GET',
        headers: {
          accept: 'application/json'
        }
      };

      fetch(`http://api.weatherapi.com/v1/current.json?key=${WEATHERAPIKEY}&q=${flightData.response.flightroute.destination.latitude},${flightData.response.flightroute.destination.longitude}`, options4)
        .then(response => response.json())
        .then(data => {
          setResponse4(data);
        })
        .catch(err => console.error('Error:', err));
    }
  }, [flightData]);


  return (
    <div>
      <h2>Airline: {flightData?.response?.flightroute?.airline?.name}</h2>
      <h2>
        From: {flightData?.response?.flightroute?.origin?.iata_code}, {flightData?.response?.flightroute?.origin?.municipality}, {flightData?.response?.flightroute?.origin?.country_name}
      </h2>
      <button  id="toBusinesses3" onClick={seeBusinesses3} className="btn btn-info">Click to view the businesses near {flightData?.response?.flightroute?.origin?.name}</button>
      <div id="businesses3">
        {showComponent3 && (
          <Suspense fallback={<div>Loading...</div>}>
            <Businesses businessesData={response3} />
          </Suspense>
        )}
      </div>
      <h2>
        To: {flightData?.response?.flightroute?.destination?.name}, ({flightData?.response?.flightroute?.destination?.iata_code}), {flightData?.response?.flightroute?.destination?.municipality}, {flightData?.response?.flightroute?.destination?.country_name}
      </h2>
      <button  id="toBusinesses" onClick={seeBusinesses} className="btn btn-info">Click to view the businesses near {flightData?.response?.flightroute?.destination?.name}</button>
      <div id="businesses">
        {showComponent && (
          <Suspense fallback={<div>Loading...</div>}>
            <Businesses businessesData={response} />
          </Suspense>
        )}
      </div>
      <button onClick={seeStations} className="btn btn-info">Click to view the stations near {flightData?.response?.flightroute?.destination?.name}</button>
      <div id="stations">
        {showComponent2 && (
          <Suspense fallback={<div>Loading...</div>}>
            <Stations stationsData={response2} />
          </Suspense>
        )}
      </div>
      <button onClick={seeWeather} className="btn btn-info">Click to view the Weather in {flightData?.response?.flightroute?.destination?.name}</button>
      <div id="weather">
        {showComponent4 && (
          <Suspense fallback={<div>Loading...</div>}>
            <Weather weatherData={response4} />
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default Results;
