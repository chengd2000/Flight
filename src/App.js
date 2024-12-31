import React, { useState, Suspense } from 'react';
import './App.css';

const Results = React.lazy(() => import('./Results'));

function App() {
  const [showComponent, setShowComponent] = useState(false);
  const [response, setResponse] = useState(null);

  const search = async () => {
    const num = document.getElementById("flight_num").value.replace(" ", "");
    let fetchedResponse;

    try {
      const request = await fetch(`https://api.adsbdb.com/v0/callsign/${num}`);
      fetchedResponse = await request.json();

      if (fetchedResponse['response'] === "unknown callsign") {
        alert("Flight not found");
        setResponse(null);
        document.location.reload();
      } else {
        setResponse(fetchedResponse);
        setShowComponent(true);
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
    <div className="row g-3 align-items-center">
      <div className="col-auto">
        <p className="col-form-label">Type the flight number:</p>
        <input id="flight_num" type="text" className="form-control form-control-sm" placeholder="flight number" />
        <button className="btn btn-secondary" id="search_flight" onClick={search}>Search Flight</button>
        { <p id="flight_info">{response ? JSON.stringify(response, null, 2) : ""}</p> }
        <div id="results">
          {showComponent && (
            <Suspense fallback={<div>Loading...</div>}>
              <Results flightData={response} />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
