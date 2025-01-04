// import React, { useEffect, useRef } from 'react';
// import './App.css';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// function Map({ hotelsData, businessesData, stationsData, Destination, Origin }) {
//   const mapRef = useRef(null); // שמירת הפניה למפה
//   let groupedLocations = {};
//   let markers_Hotels = [];
//   let markers_Stations = [];
//   let markers_Airports = [];
//   let markers_Businesses = [];
//   let markers = [];

//   const BusinessesIcon = L.icon({
//     iconUrl: 'src/Icons/shop.jpg',
//     iconSize: [32, 32],
//     iconAnchor: [16, 32],
//     popupAnchor: [0, -28],
//   });

//   const HotelsIcon = L.icon({
//     iconUrl: 'src/Icons/hotel.jpeg',
//     iconSize: [32, 32],
//     iconAnchor: [16, 32],
//     popupAnchor: [0, -28],
//   });

//   const StationsIcon = L.icon({
//     iconUrl: 'src/Icons/bus_station.png',
//     iconSize: [32, 32],
//     iconAnchor: [16, 32],
//     popupAnchor: [0, -28],
//   });

//   const AirportsIcon = L.icon({
//     iconUrl: 'src/Icons/airplane.png',
//     iconSize: [32, 32],
//     iconAnchor: [16, 32],
//     popupAnchor: [0, -28],
//   });

//   const initializeMap = () => {
//     if (mapRef.current) return; // אם המפה כבר קיימת, לא לאתחל אותה מחדש

//     mapRef.current = L.map('map').setView([20, 0], 2);
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(mapRef.current);

//     hotelsData?.data?.forEach(hotel => markers_Hotels.push(hotel));
//     businessesData?.businesses?.forEach(business => markers_Businesses.push(business));
//     stationsData?.stations?.forEach(station => markers_Stations.push(station));

//     if (Destination) markers_Airports.push(Destination);
//     if (Origin) markers_Airports.push(Origin);

//     groupShowsByLocation(markers_Hotels);
//     groupShowsByLocation(markers_Businesses);
//     groupShowsByLocation(markers_Stations);
//     groupShowsByLocation(markers_Airports);

//     addMarkers();
//   };

//   const groupShowsByLocation = shows => {
//     shows.forEach(show => {
//       const key = `${show.Latitude},${show.Longitude}`;
//       if (!groupedLocations[key]) {
//         groupedLocations[key] = [];
//       }
//       groupedLocations[key].push(show);
//     });
//   };

//   const addMarkers = () => {
//     for (const key in groupedLocations) {
//       const showGroup = groupedLocations[key];
//       const firstShow = showGroup[0];

//       const latitude = parseFloat(firstShow.Latitude);
//       const longitude = parseFloat(firstShow.Longitude);

//       if (isNaN(latitude) || isNaN(longitude)) {
//         console.warn(`Invalid coordinates: ${firstShow.Latitude}, ${firstShow.Longitude}`);
//         continue;
//       }

//       let marker;
//       const popupContent = generatePopupContent(showGroup);

//       if (markers_Businesses.includes(firstShow)) {
//         marker = L.marker([latitude, longitude], { icon: BusinessesIcon });
//       } else if (markers_Hotels.includes(firstShow)) {
//         marker = L.marker([latitude, longitude], { icon: HotelsIcon });
//       } else if (markers_Stations.includes(firstShow)) {
//         marker = L.marker([latitude, longitude], { icon: StationsIcon });
//       } else if (markers_Airports.includes(firstShow)) {
//         marker = L.marker([latitude, longitude], { icon: AirportsIcon });
//       }

//       if (marker) {
//         marker.bindPopup(popupContent, { maxHeight: 400 });
//         marker.addTo(mapRef.current);
//         markers.push(marker);
//       }
//     }
//   };

//   const generatePopupContent = (showGroup) => {
//     let content = '<div class="popup-content" style="max-height: 300px; overflow-y: auto;">';
//     showGroup.forEach(show => {
//       if ('place' in show && show.place.name) {
//         content += `name: ${show.place.name}<br>`;
//       } else {
//         content += `name: ${show.name}<br>`;
//       }
//     });
//     content += '</div>';
//     return content;
//   };

//   useEffect(() => {
//     initializeMap();

//     return () => {
//       // ניקוי משאבי המפה
//       if (mapRef.current) {
//         mapRef.current.off();
//         mapRef.current.remove();
//         mapRef.current = null;
//       }
//     };
//   }, []);

//   return <div id="map" style={{ height: '500px', width: '100%' }}></div>;
// }

// export default Map;





import React, { useEffect, useRef } from 'react'; 
import './App.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// ייבוא תמונות האייקונים
import shopIcon from './Icons/shop.jpg';
import hotelIcon from './Icons/hotel.jpeg';
import busStationIcon from './Icons/bus_station.png';
import airplaneIcon from './Icons/airpline.png';

function Map({ hotelsData, businessesData, stationsData, Destination, Origin }) {
  const mapRef = useRef(null); // שמירת הפניה למפה
  let groupedLocations = {};
  let markers = [];

  const BusinessesIcon = L.icon({
    iconUrl: shopIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -28],
  });

  const HotelsIcon = L.icon({
    iconUrl: hotelIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -28],
  });

  const StationsIcon = L.icon({
    iconUrl: busStationIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -28],
  });

  const AirportsIcon = L.icon({
    iconUrl: airplaneIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -28],
  });

  const initializeMap = () => {
    if (mapRef.current) return; // אם המפה כבר קיימת, לא לאתחל אותה מחדש

    mapRef.current = L.map('map').setView([20, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapRef.current);

    console.log('Hotels Data:', hotelsData);
    console.log('Businesses Data:', businessesData);
    console.log('Stations Data:', stationsData);
    console.log('Destination:', Destination);
    console.log('Origin:', Origin);

    groupAndAddMarkers();
  };

  const groupAndAddMarkers = () => {
    groupedLocations = {};

    const allData = [
      { data: hotelsData?.data || [], icon: HotelsIcon },
      { data: businessesData?.businesses || [], icon: BusinessesIcon },
      { data: stationsData?.stations || [], icon: StationsIcon },
      { data: [Destination, Origin].filter(Boolean), icon: AirportsIcon },
    ];

    allData.forEach(({ data, icon }) => {
      data.forEach(item => {
        // קבלת קואורדינטות על פי הסוגים השונים של הנתונים
        let latitude = item?.latitude || item.geoCode?.latitude || item.place?.location?.lat || item.coordinates?.latitude;
        let longitude = item?.longitude || item.geoCode?.longitude || item.place?.location?.lng || item.coordinates?.longitude;

        // אם אין קואורדינטות, נדלג על המיקום
        if (!latitude || !longitude) {
          console.warn(`Missing coordinates for item:`, item);
          return;
        }

        const key = `${latitude},${longitude}`;
        if (!groupedLocations[key]) {
          groupedLocations[key] = { items: [], icon };
        }
        groupedLocations[key].items.push(item);
      });
    });

    console.log('Grouped Locations:', groupedLocations);

    addMarkersToMap();
  };

  const addMarkersToMap = () => {
    for (const key in groupedLocations) {
      const { items, icon } = groupedLocations[key];
      const firstItem = items[0];

      // קבלת קואורדינטות ראשוניות מהפריט הראשון
      let latitude = firstItem.coordinates?.latitude || firstItem.geoCode?.latitude || firstItem.place?.location?.lat;
      let longitude = firstItem.coordinates?.longitude || firstItem.geoCode?.longitude || firstItem.place?.location?.lng;

      // אם אין קואורדינטות תקינות, נדלג על המיקום
      if (!latitude || !longitude) {
        console.warn(`Missing coordinates for item:`, firstItem);
        continue;
      }

      latitude = parseFloat(latitude);
      longitude = parseFloat(longitude);

      if (isNaN(latitude) || isNaN(longitude)) {
        console.warn(`Invalid coordinates: ${latitude}, ${longitude}`);
        continue;
      }

      const popupContent = generatePopupContent(items);
      const marker = L.marker([latitude, longitude], { icon });

      marker.bindPopup(popupContent, { maxHeight: 400 });
      marker.addTo(mapRef.current);
      markers.push(marker);
    }
  };

  const generatePopupContent = (items) => {
    let content = '<div class="popup-content">';
    items.forEach(item => {
      content += `<div>Name: ${item.name || 'Unnamed'}</div>`;
    });
    content += '</div>';
    return content;
  };

  useEffect(() => {
    initializeMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.off();
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div id="map" style={{ height: '500px', width: '100%' }}></div>;
}

export default Map;
