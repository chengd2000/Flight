import React, { useState, useEffect, Suspense } from 'react';
import './App.css';

const Businesses = React.lazy(() => import('./Businesses'));
const Stations = React.lazy(() => import('./Stations'));
const Weather = React.lazy(() => import('./Weather'));
const Hotels = React.lazy(() => import('./Hotels'));
const Map = React.lazy(() => import('./Map'));

const YELP_APIKEY = process.env.REACT_APP_YELPAPIKEY;
const HERE_APIKEY = process.env.REACT_APP_HEREAPIKEY;
const WEATHER_APIKEY = process.env.REACT_APP_WEATHERAPIKEY;
const AMADEUS_APIKEY = process.env.REACT_APP_AMADEUSAPIKEY;
const AMADEUS_SECRETAPIKEY = process.env.REACT_APP_AMADEUSSECRETAPIKEY;


function Results({ flightData }) {
  const [showComponent, setShowComponent] = useState(false);
  const [response, setResponse] = useState(null);
  const [showComponent2, setShowComponent2] = useState(false);
  const [response2, setResponse2] = useState(null);
  const [showComponent3, setShowComponent3] = useState(false);
  const [response3, setResponse3] = useState(null);
  const [showComponent4, setShowComponent4] = useState(false);
  const [response4, setResponse4] = useState(null);
  const [airlineImage, setAirlineImage] = useState("");
  const [showComponent5, setShowComponent5] = useState(false);
  const [response5, setResponse5] = useState(null);
  const [showComponent6, setShowComponent6] = useState(false);
  const [response6, setResponse6] = useState(null);
  const [showComponent7, setShowComponent7] = useState(false);
  const [response7, setResponse7] = useState(null);
  const [showComponent8, setShowComponent8] = useState(false);
  
  
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
  const seeStations5 = () => {
    setShowComponent5(true);
  };
  const seeWeather6 = () => {
    setShowComponent6(true);
  };
  const seeHotels = () => {
    setShowComponent7(true);
  };
  const seeMap = () => {
    setShowComponent8(true);
  };  


    const [reloadKey, setReloadKey] = useState(0);

    const reloadResults = () => {
      setReloadKey((prevKey) => prevKey + 1);
      seeMap();
      
    };
  

  useEffect(() => {
    setResponse(null);
    if (flightData?.response?.flightroute?.destination?.name) {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${YELP_APIKEY}`
        }
      };

      // setResponse(null);
      fetch(`https://api.yelp.com/v3/businesses/search?location=${flightData.response.flightroute.destination.name}&sort_by=distance&limit=20`, options)
        .then(res => res.json())
        .then(data => setResponse(data))
        .catch(err => console.error('Error:', err));
    }
  }, [flightData]);

  useEffect(() => {
    setResponse3(null);
    if (flightData?.response?.flightroute?.origin?.name) {
      const options3 = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${YELP_APIKEY}`
        }
      };

      // setResponse3(null);
      fetch(`https://api.yelp.com/v3/businesses/search?location=${flightData.response.flightroute.origin.name}&sort_by=distance&limit=20`, options3)
        .then(res => res.json())
        .then(data => setResponse3(data))
        .catch(err => console.error('Error:', err));
    }
  }, [flightData]);

  useEffect(() => {
    setResponse2(null);
    if (flightData?.response?.flightroute?.destination?.latitude && flightData?.response?.flightroute?.destination?.longitude) {
      const options2 = {
        method: 'GET',
        headers: {
          accept: 'application/json'
        }
      };

      // setResponse2(null);
      fetch(`https://transit.hereapi.com/v8/stations?in=${flightData.response.flightroute.destination.latitude},${flightData.response.flightroute.destination.longitude};r=1000000&apiKey=${HERE_APIKEY}`, options2)
        .then(response => response.json())
        .then(data => setResponse2(data))
        .catch(err => console.error('Error:', err));
    }
  }, [flightData]);

  useEffect(() => {
    setResponse4(null);
    if (flightData?.response?.flightroute?.destination?.latitude && flightData?.response?.flightroute?.destination?.longitude) {
      const options4 = {
        method: 'GET',
        headers: {
          accept: 'application/json'
        }
      };

      // setResponse4(null);
      fetch(`http://api.weatherapi.com/v1/current.json?key=${WEATHER_APIKEY}&q=${flightData.response.flightroute.destination.latitude},${flightData.response.flightroute.destination.longitude}`, options4)
        .then(response => response.json())
        .then(data => setResponse4(data))
        .catch(err => console.error('Error:', err));
    }
  }, [flightData]);

  useEffect(() => {
    setResponse5(null);
    if (flightData?.response?.flightroute?.origin?.latitude && flightData?.response?.flightroute?.origin?.longitude) {
      const options5 = {
        method: 'GET',
        headers: {
          accept: 'application/json'
        }
      };

      // setResponse5(null);
      fetch(`https://transit.hereapi.com/v8/stations?in=${flightData.response.flightroute.origin.latitude},${flightData.response.flightroute.origin.longitude};r=1000000&apiKey=${HERE_APIKEY}`, options5)
        .then(response => response.json())
        .then(data => setResponse5(data))
        .catch(err => console.error('Error:', err));
    }
  }, [flightData]);

  useEffect(() => {
    setResponse6(null);
    if (flightData?.response?.flightroute?.origin?.latitude && flightData?.response?.flightroute?.origin?.longitude) {
      const options6 = {
        method: 'GET',
        headers: {
          accept: 'application/json'
        }
      };

      // setResponse6(null);
      fetch(`http://api.weatherapi.com/v1/current.json?key=${WEATHER_APIKEY}&q=${flightData.response.flightroute.origin.latitude},${flightData.response.flightroute.origin.longitude}`, options6)
        .then(response => response.json())
        .then(data => setResponse6(data))
        .catch(err => console.error('Error:', err));
    }
  }, [flightData]);


  useEffect(() => {
    setAirlineImage("");
    if (flightData?.response?.flightroute?.airline?.iata) {
      // setAirlineImage("");
      fetch(`https://images.daisycon.io/airline/?width=300&height=150&iata=${flightData?.response?.flightroute?.airline?.iata}`)
        .then(response => response.url)
        .then(data => setAirlineImage(data))
        .catch(err => console.error('Error:', err));
    }
  }, [flightData]);



   useEffect(() => {
      setResponse7(null);
      const { latitude, longitude } = flightData?.response?.flightroute?.destination || {};
      if (latitude && longitude) {
        const getToken = async () => {
          try {
            const res = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: `grant_type=client_credentials&client_id=${AMADEUS_APIKEY}&client_secret=${AMADEUS_SECRETAPIKEY}`,
            });
            const data = await res.json();
            return data.access_token;
          } catch (err) {
            console.error("Error fetching Amadeus token:", err);
          }
        };
  
        const fetchAmadeusData = async () => {
          const token = await getToken();
          if (token) {
            // setResponse7(null);
            fetch(`https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-geocode?latitude=${latitude}&longitude=${longitude}&radius=10`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((res) => res.json())
              .then((data) => setResponse7(data))
              .catch((err) => console.error("Error fetching Amadeus data:", err));
          }
        };
  
        fetchAmadeusData();
      }
    }, [flightData]);


  return (
    <div>
       <div class="center-container">
      <h2>Flight Number: {flightData?.response?.flightroute?.callsign_iata}, Airline: {flightData?.response?.flightroute?.airline?.name}</h2>
      <img id="airlineLogo" src={airlineImage} alt="Airline Logo"></img>
      </div>
      <div class="row">
        <div class="col takeoff">
      <h2 class="airportName">
      From: {flightData?.response?.flightroute?.origin?.name} ({flightData?.response?.flightroute?.origin?.iata_code}), {flightData?.response?.flightroute?.origin?.municipality}, {flightData?.response?.flightroute?.origin?.country_name}
      </h2>
      <button onClick={seeWeather6} className="btn btn-info">Click to view the Weather in {flightData?.response?.flightroute?.origin?.name}</button>
      <div id="weather" class="moretext2">
        {showComponent6 && (
          <Suspense fallback={<div>Loading...</div>}>
            <Weather weatherData={response6} />
          </Suspense>
        )}
      </div>
      <button id="toBusinesses3" onClick={seeBusinesses3} className="btn btn-info">Click to view the businesses near {flightData?.response?.flightroute?.origin?.name}</button>
      <div id="businesses3">
        {showComponent3 && (
          <Suspense fallback={<div>Loading...</div>}>
            <Businesses businessesData={response3} />
          </Suspense>
        )}
      </div>
      <button onClick={seeStations5} className="btn btn-info">Click to view the stations near {flightData?.response?.flightroute?.origin?.name}</button>
      <div id="stations" class="moretext">
        {showComponent5 && (
          <Suspense fallback={<div>Loading...</div>}>
            <Stations stationsData={response5} />
          </Suspense>
        )}
      </div>
      </div>
      <div class="col landing">
      <h2 class="airportName">
        To: {flightData?.response?.flightroute?.destination?.name} ({flightData?.response?.flightroute?.destination?.iata_code}), {flightData?.response?.flightroute?.destination?.municipality}, {flightData?.response?.flightroute?.destination?.country_name}
      </h2>
      <button onClick={seeWeather} className="btn btn-info">Click to view the Weather in {flightData?.response?.flightroute?.destination?.name}</button>
      <div id="weather" class="moretext2">
        {showComponent4 && (
          <Suspense fallback={<div>Loading...</div>}>
            <Weather weatherData={response4} />
          </Suspense>
        )}
      </div>
      <button id="toBusinesses" onClick={seeBusinesses} className="btn btn-info">Click to view the businesses near {flightData?.response?.flightroute?.destination?.name}</button>
      <div id="businesses">
        {showComponent && (
          <Suspense fallback={<div>Loading...</div>}>
            <Businesses businessesData={response} />
          </Suspense>
        )}
      </div>
      <button onClick={seeStations} className="btn btn-info">Click to view the stations near {flightData?.response?.flightroute?.destination?.name}</button>
      <div id="stations" class="moretext">
        {showComponent2 && (
          <Suspense fallback={<div>Loading...</div>}>
            <Stations stationsData={response2} />
          </Suspense>
        )}
      </div>
      <button onClick={seeHotels} className="btn btn-info">Click to view the hotels near {flightData?.response?.flightroute?.destination?.name}</button>
      <div id="hotels" class="moretext">
        {showComponent7 && (
          <Suspense fallback={<div>Loading...</div>}>
            <Hotels hotelsData={response7} />
          </Suspense>
        )}
      </div>
      </div>
      </div>
      <div class="center-container">
      <button onClick={reloadResults} className="btn btn-info">Click to view Map</button>
      </div>
      <div id="maps" class="moretext">
        {showComponent8 && (
          <Suspense fallback={<div>Loading...</div>}>
            <Map hotelsData={response7} businessesData_destination={response} stationsData_destination={response2} businessesData_origin={response3} stationsData_origin={response5} Destination={flightData?.response?.flightroute?.destination} Origin={flightData?.response?.flightroute?.origin}  />
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default Results;
