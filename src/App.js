import React, { useState, Suspense } from 'react';
import './App.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Results = React.lazy(() => import('./Results'));

function App() {
  const [showComponent, setShowComponent] = useState(false);
  const [response, setResponse] = useState(null);

  const [reloadKey, setReloadKey] = useState(0);

  const reloadResults = () => {
    setReloadKey(prevKey => prevKey + 1);
    search();
  };

  const search_again = () => {
    document.location.reload();
  }

  const search = async () => {
    const num = document.getElementById("flight_num").value.replace(" ", "");
    let fetchedResponse;

    try {
      const request = await fetch(`https://api.adsbdb.com/v0/callsign/${num}`);
      fetchedResponse = await request.json();

      if (
        fetchedResponse['response'] === "unknown callsign" ||
        Object.keys(fetchedResponse['response'] || {}).length === 0
      )  {
        alert("Flight not found");
        setResponse(null);
        document.location.reload();
      } else {
        setResponse(fetchedResponse);
        setShowComponent(true);
        document.getElementById("search_flight").style.display = 'none';
        document.getElementById("flight_num").style.display = 'none';
        document.getElementById("info").style.display = 'none';
        document.getElementById("search_again_flight").style.display = 'block';
      
      }
    } catch (error) {
      alert("Flight not found");
      setResponse(null);
      document.location.reload();
    }

    console.log(num);
    console.log(JSON.stringify(fetchedResponse, null, 2));
  };

  return (
    <div className="row g-3 align-items-center center-container">
      <div className="col-auto">
        <p id = "info" className="col-form-label">Type the flight number:</p>
        <input id="flight_num" type="text" className="form-control form-control-sm" placeholder="flight number" />
        <button className="btn btn-secondary" id="search_flight" onClick={reloadResults}>Search Flight</button>
        <button style={{ display: 'none' }} className="btn btn-secondary" id="search_again_flight" onClick={search_again}>
  Search Flight Again
</button>

        <div id="results">
          {showComponent && (
            <Suspense fallback={<div>Loading...</div>}>
              <Results key={reloadKey} flightData={response} />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
